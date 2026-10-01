'use client';
import Link from 'next/link';
import { films, projectImage } from '@/lib/content';
import { useShuffled } from '@/hooks/use-shuffled';

export function ProjectsGrid() {
  const projects = useShuffled(films, 'plugin3d-project-order');
  return <div className="project-grid">{projects.map((film, i) => <Link href={`/projects/${film.slug}/`} key={film.slug} className="project-card"><div className="project-thumb"><img src={projectImage(film, ['tree-man', 'ring'].includes(film.slug) ? 2 : 1, true)} alt={film.title} loading={i < 2 ? 'eager' : 'lazy'} style={{ objectPosition: film.focus }}/></div><div className="project-caption"><h2>{film.title}</h2><span>{film.category}</span></div></Link>)}</div>;
}
