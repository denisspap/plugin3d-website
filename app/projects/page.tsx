import Link from 'next/link';
import { films, projectImage } from '@/lib/content';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: 'Projects' };
export default function Projects() {
  return <><main id="main-content" className="page-shell"><div className="page-heading"><h1>Projects</h1></div><div className="project-grid">{films.map((film, i) => <Link href={`/projects/${film.slug}/`} key={film.slug} className={`project-card ${i === 0 ? 'featured' : ''}`}><div className="project-thumb"><img src={projectImage(film, 1, i !== 0)} alt={film.title} loading={i < 2 ? 'eager' : 'lazy'} style={{ objectPosition: film.focus }}/></div><div className="project-caption"><h2>{film.title}</h2><span>{film.category}</span></div></Link>)}</div></main><SiteFooter/></>;
}
