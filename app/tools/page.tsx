import { products, asset } from '@/lib/content';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: 'Tools for Blender' };
export default function Tools() {
  return <><main id="main-content" className="page-shell"><div className="page-heading"><h1>Tools</h1><a className="publisher-note" href="https://superhivemarket.com/creators/dinisaddons" target="_blank" rel="noreferrer">Trusted publisher on Superhive · formerly Blender Market</a></div><div className="tools-list">{products.map((product, i) => <article className="tool-card" key={product.id}><a className="tool-image" href={product.url} target="_blank" rel="noreferrer" aria-label={`View ${product.name} on Superhive`}><img src={asset(`/tools/${product.id}.webp`)} alt={`${product.name} — official Superhive product image`} loading={i === 0 ? 'eager' : 'lazy'}/></a><div className="tool-content"><h2>{product.name}</h2><p>{product.description}</p><ul>{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="button-link" href={product.url} target="_blank" rel="noreferrer">Get it on Superhive</a></div></article>)}</div></main><SiteFooter/></>;
}
