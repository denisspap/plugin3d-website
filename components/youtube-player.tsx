'use client';
import { useEffect, useRef, useState } from 'react';

type Player = { destroy: () => void };
type YouTubeAPI = { Player: new (element: HTMLElement, options: { events: { onReady: () => void; onError: () => void } }) => Player };
declare global { interface Window { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void } }
let apiPromise: Promise<YouTubeAPI> | undefined;
function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previous?.(); if (window.YT) resolve(window.YT); };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => { apiPromise = undefined; reject(new Error('YouTube unavailable')); };
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function YouTubePlayer({ id, title, poster }: { id: string; title: string; poster: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  useEffect(() => {
    let disposed = false;
    let player: Player | undefined;
    const root = host.current!;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube.com/embed/${id}?rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
    frame.title = `${title} on YouTube`;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    root.appendChild(frame);
    setStatus('loading');
    const timeout = window.setTimeout(() => { if (!disposed) setStatus('unavailable'); }, 12000);
    loadApi().then(api => {
      if (disposed) return;
      player = new api.Player(frame, { events: {
        onReady: () => { if (!disposed) { clearTimeout(timeout); setStatus('ready'); } },
        onError: () => { if (!disposed) { clearTimeout(timeout); setStatus('unavailable'); } },
      } });
    }).catch(() => { if (!disposed) setStatus('unavailable'); });
    return () => { disposed = true; clearTimeout(timeout); player?.destroy(); frame.remove(); };
  }, [id, title]);
  return <div className={`youtube-player ${status}`}>
    <div className="video-frame" ref={host}/>
    {status !== 'ready' && <div className="video-fallback"><img src={poster} alt=""/><div><p role="status">{status === 'loading' ? 'Loading video…' : 'YouTube playback is unavailable here.'}</p><a className="button-link" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">Open on YouTube</a></div></div>}
  </div>;
}
