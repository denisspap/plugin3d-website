'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { frames, projectImage } from '@/lib/content';

export default function Home() {
  const [current, setCurrent] = useState<number | null>(null);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const bag = useRef<number[]>([]);
  const index = useRef(-1);
  const loading = useRef(false);
  const mounted = useRef(true);
  const hero = useRef<HTMLElement>(null);
  const history = useRef<number[]>([]);
  const historyPosition = useRef(0);
  const suppressClickUntil = useRef(0);
  const frame = current === null ? null : frames[current];
  const show = useCallback(async (target: number, position?: number) => {
    if (loading.current || target === index.current) return;
    loading.current = true;
    const image = new Image();
    image.src = projectImage(frames[target].film, frames[target].frame);
    try { await image.decode(); } catch { loading.current = false; return; }
    if (!mounted.current) return;
    setPrevious(index.current);
    index.current = target;
    if (position !== undefined) historyPosition.current = position;
    else {
      history.current = [...history.current.slice(0, historyPosition.current + 1), target];
      historyPosition.current = history.current.length - 1;
    }
    setCurrent(target);
    loading.current = false;
  }, []);
  const next = useCallback(() => {
    if (loading.current) return;
    if (historyPosition.current < history.current.length - 1) {
      void show(history.current[historyPosition.current + 1], historyPosition.current + 1);
      return;
    }
    bag.current = bag.current.filter(target => target !== index.current);
    if (!bag.current.length) {
      bag.current = frames.map((_, i) => i).filter(i => i !== index.current);
      for (let i = bag.current.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag.current[i], bag.current[j]] = [bag.current[j], bag.current[i]];
      }
    }
    void show(bag.current.pop()!);
  }, [show]);
  const back = useCallback(() => {
    if (historyPosition.current > 0) void show(history.current[historyPosition.current - 1], historyPosition.current - 1);
    else next();
  }, [next, show]);
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
    let lastChange = -Infinity;
    let wheelTotal = 0;
    let lastWheel = 0;
    let touchStart: { x: number; y: number } | null = null;
    const navigate = (direction: number) => {
      const now = performance.now();
      if (loading.current || now - lastChange < 1200) return;
      lastChange = now;
      direction > 0 ? next() : back();
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180 || Math.sign(wheelTotal) !== Math.sign(event.deltaY)) wheelTotal = 0;
      lastWheel = now;
      wheelTotal += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.abs(wheelTotal) >= 45) { navigate(wheelTotal); wheelTotal = 0; }
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
        navigate(deltaY);
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
  }, [ready, next, back]);
  useEffect(() => {
    if (paused || hidden || !ready) return;
    const timer = setTimeout(next, 4000);
    return () => clearTimeout(timer);
  }, [current, paused, hidden, ready, next]);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => { frames.forEach(item => { const img = new Image(); img.src = projectImage(item.film, item.frame); }); }, 500);
    return () => clearTimeout(timer);
  }, [ready]);
  return <main id="main-content" className="home">
    <section ref={hero} className="hero" aria-label="Projects" onClickCapture={event => { if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); } }}>
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
