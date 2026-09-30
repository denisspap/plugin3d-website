'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { frames, projectImage } from '@/lib/content';

export default function Home() {
  const [current, setCurrent] = useState<number | null>(null);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [transitionMs, setTransitionMs] = useState(1150);
  const bag = useRef<number[]>([]);
  const index = useRef(-1);
  const loading = useRef(false);
  const mounted = useRef(true);
  const hero = useRef<HTMLElement>(null);
  const history = useRef<number[]>([]);
  const historyPosition = useRef(0);
  const suppressClickUntil = useRef(0);
  const imageRequest = useRef(0);
  const imageCache = useRef(new Map<number, HTMLImageElement>());
  const frame = current === null ? null : frames[current];
  const show = useCallback(async (target: number, duration: number) => {
    const request = ++imageRequest.current;
    if (target === index.current) { loading.current = false; return; }
    loading.current = true;
    let image = imageCache.current.get(target);
    if (!image) {
      image = new Image();
      image.src = projectImage(frames[target].film, frames[target].frame);
      imageCache.current.set(target, image);
    }
    try { await image.decode(); } catch { if (request === imageRequest.current) loading.current = false; return; }
    if (!mounted.current || request !== imageRequest.current) return;
    setPrevious(index.current);
    index.current = target;
    setTransitionMs(duration);
    setCurrent(target);
    loading.current = false;
  }, []);
  const move = useCallback((steps: number, duration = 1150) => {
    const randomFrame = (avoid: number) => {
      bag.current = bag.current.filter(target => target !== avoid);
      if (!bag.current.length) {
        bag.current = frames.map((_, i) => i).filter(i => i !== avoid);
        for (let i = bag.current.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [bag.current[i], bag.current[j]] = [bag.current[j], bag.current[i]];
        }
      }
      return bag.current.pop()!;
    };
    for (let step = 0; step < Math.abs(steps); step++) {
      if (steps > 0) {
        if (historyPosition.current === history.current.length - 1) history.current.push(randomFrame(history.current[historyPosition.current]));
        historyPosition.current++;
      } else if (historyPosition.current > 0) historyPosition.current--;
      else history.current.unshift(randomFrame(history.current[0]));
    }
    void show(history.current[historyPosition.current], duration);
  }, [show]);
  useEffect(() => {
    mounted.current = true;
    let lastOpening = -1;
    try {
      const saved = sessionStorage.getItem('plugin3d-opening-frame');
      if (saved !== null) lastOpening = Number(saved);
    } catch { /* The slideshow also works when browser storage is unavailable. */ }
    const choices = frames.map((_, i) => i).filter(i => i !== lastOpening);
    const opening = choices[Math.floor(Math.random() * choices.length)] ?? 0;
    index.current = opening;
    history.current = [opening];
    historyPosition.current = 0;
    setCurrent(opening);
    try { sessionStorage.setItem('plugin3d-opening-frame', String(opening)); } catch {}
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(motion.matches);
    const onMotion = () => setPaused(motion.matches);
    const visibility = () => setHidden(document.hidden);
    motion.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', visibility);
    return () => { mounted.current = false; motion.removeEventListener('change', onMotion); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    const element = hero.current;
    if (!element || !ready) return;
    let wheelTotal = 0;
    let lastWheel = 0;
    let touchStart: { x: number; y: number } | null = null;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(1, now - lastWheel);
      if (now - lastWheel > 180 || Math.sign(wheelTotal) !== Math.sign(event.deltaY)) wheelTotal = 0;
      lastWheel = now;
      const distance = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      wheelTotal += distance;
      const steps = Math.trunc(wheelTotal / 80);
      if (steps) {
        wheelTotal -= steps * 80;
        const speed = Math.abs(distance) / elapsed;
        move(steps, Math.max(40, Math.min(150, 100 / Math.max(speed, 0.1))));
      }
    };
    const startTouch = (event: TouchEvent) => {
      touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    };
    const endTouch = (event: TouchEvent) => {
      if (!touchStart || !event.changedTouches.length) return;
      const deltaY = touchStart.y - event.changedTouches[0].clientY;
      const deltaX = touchStart.x - event.changedTouches[0].clientX;
      touchStart = null;
      if (Math.abs(deltaY) >= 45 && Math.abs(deltaY) > Math.abs(deltaX)) {
        suppressClickUntil.current = performance.now() + 400;
        move(Math.sign(deltaY) * Math.max(1, Math.trunc(Math.abs(deltaY) / 80)), 100);
      }
    };
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('touchstart', startTouch, { passive: true });
    element.addEventListener('touchend', endTouch, { passive: true });
    return () => {
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('touchstart', startTouch);
      element.removeEventListener('touchend', endTouch);
    };
  }, [ready, move]);
  useEffect(() => {
    if (paused || hidden || !ready) return;
    const timer = setTimeout(() => { if (!loading.current) move(1); }, 4000);
    return () => clearTimeout(timer);
  }, [current, paused, hidden, ready, move]);
  useEffect(() => {
    if (!ready) return;
    frames.forEach((item, target) => {
      if (imageCache.current.has(target)) return;
      const image = new Image();
      image.src = projectImage(item.film, item.frame);
      imageCache.current.set(target, image);
    });
  }, [ready]);
  return <main id="main-content" className="home">
    <section ref={hero} className="hero" aria-label="Projects" style={{ '--slide-duration': `${transitionMs}ms`, '--caption-duration': `${Math.min(650, transitionMs)}ms` } as CSSProperties} onClickCapture={event => { if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); } }}>
      {frame && <Link className="hero-image-link" href={`/projects/${frame.film.slug}/`} aria-label={`View ${frame.film.title}`}>
        {previous !== null && <img className="hero-image previous-image" src={projectImage(frames[previous].film, frames[previous].frame)} alt="" style={{ objectPosition: frames[previous].film.focus }} />}
        <img key={current} className={`hero-image ${previous !== null ? 'entering' : ''}`} src={projectImage(frame.film, frame.frame)} alt={`${frame.film.title} — a frame by Dinis Pereira`} style={{ objectPosition: frame.film.focus }} fetchPriority="high" onLoad={() => setReady(true)} />
        <div className="hero-shade" />
      </Link>}
      <div className="hero-identity"><h1>Dinis Pereira</h1><p className="identity-subtitle">PlugIn3D</p></div>
      <div className="hero-bottom">
        {frame && <Link href={`/projects/${frame.film.slug}/`} className="hero-project" key={frame.film.slug}><h2>{frame.film.title}</h2><p>{frame.film.category}</p></Link>}
      </div>
    </section>
  </main>;
}
