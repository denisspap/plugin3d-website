import { patreon } from '@/lib/content';
import { MakingOfGrid } from '@/components/making-of-grid';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: 'Making of' };
export default function MakingOf() {
  return <><main id="main-content" className="page-shell"><div className="page-heading"><h1>Making of</h1></div><MakingOfGrid/><a className="text-link catalog-more" href={patreon} target="_blank" rel="noreferrer">All Patreon posts</a></main><SiteFooter/></>;
}
