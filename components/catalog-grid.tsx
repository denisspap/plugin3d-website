'use client';
import { products, asset } from '@/lib/content';
import { models } from '@/lib/catalog';
import { useShuffled } from '@/hooks/use-shuffled';
export function CatalogGrid() {
  const shuffledModels = useShuffled(models, 'plugin3d-model-order');
  const shuffledProducts = useShuffled(products, 'plugin3d-tool-order');
  return <>      <section id="models" className="model-grid" aria-label="3D models">
        {shuffledModels.map((model, i) => <article className="model-card" key={model.id}>
          <a href={model.url} target="_blank" rel="noreferrer" aria-label={`View ${model.title} on Superhive`}><img src={asset(`/models/${model.id}.webp`)} alt={model.title} loading={i === 0 ? 'eager' : 'lazy'}/></a>
          <h2>{model.title}</h2><p>{model.description}</p><a className="text-link" href={model.url} target="_blank" rel="noreferrer">View on Superhive</a>
        </article>)}
      </section>
      <section className="tools-list combined-tools" aria-label="Blender tools">
        {shuffledProducts.map(product => <article className="tool-card" key={product.id}>
          <a className="tool-image" href={product.url} target="_blank" rel="noreferrer" aria-label={`View ${product.name} on Superhive`}><img src={asset(`/tools/${product.id}.webp`)} alt={`${product.name} — official Superhive product image`} loading="lazy"/></a>
          <div className="tool-content"><h2>{product.name}</h2><p>{product.description}</p><ul>{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="button-link" href={product.url} target="_blank" rel="noreferrer">Get it on Superhive</a></div>
        </article>)}
      </section>
</>;
}