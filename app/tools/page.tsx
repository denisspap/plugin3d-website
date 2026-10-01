import { CatalogGrid } from '@/components/catalog-grid';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: '3D models and tools' };
export default function Tools() {
  return <>
    <main id="main-content" className="page-shell">
      <div className="page-heading"><h1>3D models and tools</h1><a className="publisher-note" href="https://superhivemarket.com/creators/dinisaddons" target="_blank" rel="noreferrer">Trusted publisher on Superhive · formerly Blender Market</a></div>
      <CatalogGrid/>
    </main><SiteFooter/>
  </>;
}
