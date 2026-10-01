import { ProjectsGrid } from '@/components/projects-grid';
import { SiteFooter } from '@/components/site-footer';
export const metadata = { title: 'Projects' };
export default function Projects() {
  return <><main id="main-content" className="page-shell"><div className="page-heading"><h1>Projects</h1></div><ProjectsGrid/></main><SiteFooter/></>;
}
