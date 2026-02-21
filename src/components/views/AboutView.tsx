import type { View } from '../../hooks/useViewSwitcher';
import SkillBadge from '../ui/SkillBadge';

const SKILLS = ['.NET', 'PHP', 'Flutter', 'React', 'Node.js'];

interface AboutViewProps {
    viewState: 'active' | 'leaving' | 'hidden';
    switchView: (view: View) => void;
}

export default function AboutView({ viewState, switchView }: AboutViewProps) {
    const className = `view${viewState === 'active' ? ' active' : viewState === 'leaving' ? ' leaving' : ''}`;

    return (
        <article
            id="about-view"
            className={className}
            role="tabpanel"
            aria-labelledby="about-tab"
        >
            <div className="view-content">
                <div className="hero-content">
                    <h1 className="hero-name">
                        <span className="gradient-text">Nhu Y Huynh</span>
                    </h1>

                    <p className="hero-title">Full Stack Developer</p>

                    <p className="hero-summary">
                        I build and maintain web applications with a strong focus on debugging and code
                        quality.
                        <br />
                        Experienced in identifying issues, optimizing performance, and improving system
                        reliability.
                    </p>

                    <div className="skills-grid">
                        {SKILLS.map((skill) => (
                            <SkillBadge key={skill} label={skill} />
                        ))}
                    </div>

                    <div className="hero-cta">
                        <button className="btn-primary" onClick={() => switchView('projects')}>
                            <span>View Projects</span>
                            <i className="fas fa-arrow-right" aria-hidden="true" />
                        </button>
                        <button className="btn-secondary" onClick={() => switchView('contact')}>
                            <span>Get in Touch</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
