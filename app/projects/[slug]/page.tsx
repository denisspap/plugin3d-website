import { notFound } from 'next/navigation';
import Link from 'next/link';
import { films, projectImage, projectVideos } from '@/lib/content';
import { SiteFooter } from '@/components/site-footer';
import { YouTubePlayer } from '@/components/youtube-player';
export const dynamicParams = false;
export function generateStaticParams() { return films.map(film => ({ slug: film.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const film = films.find(p => p.slug === slug); return { title: film?.title || 'Project', description: film?.category }; }
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const film = films.find(p => p.slug === slug);
  if (!film) notFound();
  const next = films[(films.indexOf(film) + 1) % films.length];
  const video = projectVideos[slug];
  const videoUrl = video?.provider === 'youtube' ? `https://www.youtube.com/watch?v=${video.id}` : video ? `https://www.instagram.com/p/${video.id}/` : null;
  return <><main id="main-content" className="project-page"><div className="project-heading page-shell"><Link className="back-link" href="/projects/">Projects</Link><h1>{film.title}</h1></div><div className="project-cover"><img src={projectImage(film)} alt={`${film.title} — opening frame`} fetchPriority="high"/></div><section className="project-story page-shell"><p>{film.description}</p>{video?.provider === 'instagram' && <a className="text-link" href={videoUrl!} target="_blank" rel="noreferrer">Watch on Instagram</a>}{film.link && film.link !== videoUrl && <a className="text-link" href={film.link} target="_blank" rel="noreferrer">{film.linkLabel}</a>}</section>{video?.provider === 'youtube' && <section className="project-video page-shell" aria-label={`${film.title} video`}><YouTubePlayer id={video.id} title={film.title} poster={projectImage(film)}/><a className="text-link" href={videoUrl!} target="_blank" rel="noreferrer">Watch on YouTube</a></section>}<section className="project-stills page-shell" aria-label={`${film.title} gallery`}>{Array.from({ length: film.count - 1 }, (_, i) => <figure key={i}><img src={projectImage(film, i + 2)} alt={`${film.title} — frame ${i + 2}`} loading="lazy"/></figure>)}</section><Link href={`/projects/${next.slug}/`} className="next-project page-shell"><p className="eyebrow">Next project</p><h2>{next.title}</h2></Link></main><SiteFooter/></>;
}
