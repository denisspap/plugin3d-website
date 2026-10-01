'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/content';

export function InteractiveLogo() {
  const [ready, setReady] = useState(false);
  const host = useRef<HTMLSpanElement>(null);
  const viewer = useRef<{ turn: (x: number, y: number) => void; dispose: () => void } | null>(null);
  useEffect(() => {
    let cancelled = false;
    const fail = () => { if (!cancelled) { setReady(false); viewer.current?.dispose(); viewer.current = null; } };
    // Keep the image logo visible while the optional 3D enhancement loads.
    const timer = window.setTimeout(() => {
      void import('@/lib/cube-viewer').then(({ createCubeViewer }) => {
        if (cancelled || !host.current) return;
        viewer.current = createCubeViewer(host.current, asset('/interactive/plugin3d.glb'), () => { if (!cancelled) setReady(true); }, fail);
      }).catch(fail);
    }, 500);
    return () => { cancelled = true; window.clearTimeout(timer); viewer.current?.dispose(); viewer.current = null; };
  }, []);
  return <Link className={`wordmark interactive-logo ${ready ? 'is-ready' : ''}`} href="/" aria-label="PlugIn3D home"
    onPointerEnter={() => viewer.current?.turn(0.12, 0.55)}
    onPointerMove={event => {
      if (event.pointerType === 'touch') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      viewer.current?.turn((event.clientY - bounds.top) / bounds.height * 0.5 - 0.25, (event.clientX - bounds.left) / bounds.width * 1.5 - 0.75);
    }}
    onPointerLeave={() => viewer.current?.turn(0, 0)}
    onFocus={() => viewer.current?.turn(0.12, 0.55)}
    onBlur={() => viewer.current?.turn(0, 0)}>
    <img className="brand-logo" src={asset('/plugin3d-logo.png')} alt="" width={64} height={64}/>
    <span ref={host} className="logo-canvas" aria-hidden="true"/>
  </Link>;
}
