import type { Project } from '../../data/projects';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="project-card">
            <div className="project-number">{project.number}</div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
                {project.tech.map((tag) => (
                    <span key={tag} className="tech-tag">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="project-links">
                {project.links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        <i className={link.icon} aria-hidden="true" />
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
