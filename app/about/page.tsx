import Link from 'next/link';
import { asset, socialLinks } from '@/lib/content';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: 'About Dinis Pereira' };
export default function About() {
  return <><main id="main-content" className="page-shell about-page"><h1>About me</h1><div className="about-layout"><div className="about-art"><img className="brand-logo" src={asset('/plugin3d-logo.png')} alt="PlugIn3D logo" width={1280} height={1280}/></div><div className="about-copy"><h2>Dinis Pereira</h2><p>I’m a filmmaker and 3D artist working as PlugIn3D. I create animations, cinematic recreations, and procedural effects in Blender.</p><p>My work includes character animation, environments, product visuals, and Geometry Nodes. I also develop Blender add-ons and share tutorials and project files on Patreon.</p><Link className="text-link" href="/contact/">Contact me</Link><div className="social-list">{socialLinks.map(link => <a href={link.url} key={link.name} target="_blank" rel="noreferrer">{link.name}</a>)}</div></div></div></main><SiteFooter/></>;
}
