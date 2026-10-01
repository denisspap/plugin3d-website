import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** A small header logo; rendering stops as soon as its turn settles. */
export function createCubeViewer(host: HTMLSpanElement, url: string, onReady: () => void, onError: () => void) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(3.8, 2.8, 5);
  camera.lookAt(0, 0, 0);
  const pivot = new THREE.Group();
  scene.add(pivot);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.3;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.5);
  rim.position.set(4, 2, -3);
  scene.add(rim);
  let disposed = false;
  let loaded = false;
  let tick = 0;
  let lastTime = 0;
  let targetX = 0;
  let targetY = 0;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const render = () => { if (!disposed && loaded) renderer.render(scene, camera); };
  const animate = (time: number) => {
    tick = 0;
    if (disposed) return;
    const amount = 1 - Math.exp(-Math.min(time - lastTime, 50) / 85);
    lastTime = time;
    pivot.rotation.x = THREE.MathUtils.lerp(pivot.rotation.x, targetX, amount);
    pivot.rotation.y = THREE.MathUtils.lerp(pivot.rotation.y, targetY, amount);
    render();
    if (Math.abs(pivot.rotation.x - targetX) + Math.abs(pivot.rotation.y - targetY) > 0.001) tick = requestAnimationFrame(animate);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  canvas.addEventListener('webglcontextlost', onError);
  const abort = new AbortController();
  function disposeModel(object: THREE.Object3D) {
    object.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach(material => material.dispose());
    });
  }
  void (async () => {
    try {
      const response = await fetch(url, { signal: abort.signal });
      if (!response.ok) throw new Error('Model unavailable');
      const gltf = await new GLTFLoader().parseAsync(await response.arrayBuffer(), '');
      if (disposed) { disposeModel(gltf.scene); return; }
      gltf.scene.position.sub(new THREE.Box3().setFromObject(gltf.scene).getCenter(new THREE.Vector3()));
      pivot.add(gltf.scene);
      loaded = true;
      resize();
      onReady();
    } catch { if (!disposed) onError(); }
  })();
  return {
    turn(x: number, y: number) {
      if (disposed || motion.matches) return;
      targetX = x;
      targetY = y;
      if (!tick) { lastTime = performance.now(); tick = requestAnimationFrame(animate); }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(tick);
      abort.abort();
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onError);
      disposeModel(scene);
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
