import { asset } from '@/lib/content';
import { models } from '@/lib/catalog';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: '3D Models' };
export default function Models() {
  return <><main id="main-content" className="page-shell"><div className="page-heading"><h1>3D Models</h1></div><div className="model-grid">{models.map(model => <article className="model-card" key={model.id}><a href={model.url} target="_blank" rel="noreferrer" aria-label={`View ${model.title} on Superhive`}><img src={asset(`/models/${model.id}.webp`)} alt={model.title} loading="lazy"/></a><h2>{model.title}</h2><p>{model.description}</p><a className="text-link" href={model.url} target="_blank" rel="noreferrer">View on Superhive</a></article>)}</div></main><SiteFooter/></>;
}
