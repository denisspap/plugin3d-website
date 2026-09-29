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
  const frame = current === null ? null : frames[current];
  const show = useCallback(async (target: number) => {
    if (loading.current || target === index.current) return;
    loading.current = true;
    const image = new Image();
    image.src = projectImage(frames[target].film, frames[target].frame);
    try { await image.decode(); } catch { loading.current = false; return; }
    if (!mounted.current) return;
    setPrevious(index.current);
    index.current = target;
    setCurrent(target);
    loading.current = false;
  }, []);
  const next = useCallback(() => {
    if (loading.current) return;
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
    <section className="hero" aria-label="Projects">
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
