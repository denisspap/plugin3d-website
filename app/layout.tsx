import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { asset } from '@/lib/content';
import './globals.css';
const roboto = localFont({ src: './fonts/Roboto.ttf', variable: '--font-roboto', weight: '100 900', display: 'swap' });
export const metadata: Metadata = { title: { default: 'Dinis Pereira — PlugIn3D', template: '%s — PlugIn3D' }, description: 'The portfolio of Dinis Pereira. Cinematic 3D art, films, Blender tools, and the process behind the work.', icons: { icon: { url: asset('/plugin3dprofile.png?v=profile'), type: 'image/png' }, apple: asset('/plugin3dprofile.png?v=profile') } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={roboto.variable}><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/>{children}</body></html>;
}
