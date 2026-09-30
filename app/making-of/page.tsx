import { patreon } from '@/lib/content';
import { MakingOfGrid } from '@/components/making-of-grid';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: 'Making of' };
export default function MakingOf() {
  return <><main id="main-content" className="page-shell"><div className="page-heading"><h1>Making of</h1><p className="making-intro">Explore how I create my Blender projects, with tutorials, breakdowns, and project files on <a href={patreon} target="_blank" rel="noreferrer">Patreon</a>.</p></div><MakingOfGrid/><a className="text-link catalog-more" href={patreon} target="_blank" rel="noreferrer">All Patreon posts</a></main><SiteFooter/></>;
}
