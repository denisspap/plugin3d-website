'use client';
import { useShuffled } from '@/hooks/use-shuffled';
import { makingOf } from '@/lib/catalog';
import { asset } from '@/lib/content';

export function MakingOfGrid() {
  const posts = useShuffled(makingOf, 'plugin3d-making-order');
  return <div className="project-grid making-grid">{posts.map(post => <a className="project-card" href={post.url} key={post.url} target="_blank" rel="noreferrer">
    {post.image ? <><div className="project-thumb"><img src={asset(post.image)} alt="" loading="lazy"/></div><div className="project-caption"><h2>{post.title}</h2><span>{post.type}</span></div></> : <><div className="project-thumb post-title-card"><h2>{post.title}</h2></div><div className="project-caption"><span>{post.type}</span></div></>}
    <span className="post-destination">View on Patreon</span>
  </a>)}</div>;
}
