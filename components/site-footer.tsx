import { socialLinks } from '@/lib/content';
export function SiteFooter() {
  return <footer className="site-footer"><span>© {new Date().getFullYear()} Dinis Pereira · PlugIn3D</span><div>{socialLinks.map(link => <a href={link.url} key={link.name} target="_blank" rel="noreferrer">{link.name}</a>)}</div></footer>;
}
