import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

interface PortfolioViewProps {
    viewState: 'active' | 'leaving' | 'hidden';
}

export default function PortfolioView({ viewState }: PortfolioViewProps) {
    const className = `view${viewState === 'active' ? ' active' : viewState === 'leaving' ? ' leaving' : ''}`;

    return (
        <article
            id="portfolio-view"
            className={className}
            role="tabpanel"
            aria-labelledby="portfolio-tab"
        >
            <div className="view-content">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    <p className="section-subtitle">Recent work showcasing technical expertise</p>
                </div>

                <div className="projects-container">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </article>
    );
}
