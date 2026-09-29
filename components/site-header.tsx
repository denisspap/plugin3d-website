'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { asset } from '@/lib/content';
export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const listener = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [open]);
  return <header className={`site-header ${path === '/' ? 'over-hero' : ''} ${open ? 'menu-open' : ''}`}>
    <Link className="wordmark" href="/" aria-label="PlugIn3D home"><img className="brand-logo" src={asset('/plugin3d-logo.png')} alt="PlugIn3D" width={64} height={64}/></Link>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    <nav id="main-navigation" className={open ? 'is-open' : ''} aria-label="Main navigation">
      <Link href="/" aria-current={path === '/' ? 'page' : undefined}>Main page</Link>
      <Link href="/projects/" aria-current={path.startsWith('/projects') ? 'page' : undefined}>Projects</Link>
      <Link href="/making-of/" aria-current={path.startsWith('/making-of') ? 'page' : undefined}>Making of</Link>
      <Link href="/tools/" aria-current={path.startsWith('/tools') || path.startsWith('/models') ? 'page' : undefined}>3D models and tools</Link>
      <Link href="/about/" aria-current={path.startsWith('/about') ? 'page' : undefined}>About me</Link>
      <Link className="contact-nav" href="/contact/" aria-current={path.startsWith('/contact') ? 'page' : undefined}>Contact me</Link>
    </nav>
  </header>;
}
