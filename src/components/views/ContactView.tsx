import ContactCard from '../ui/ContactCard';

interface ContactViewProps {
    viewState: 'active' | 'leaving' | 'hidden';
}

export default function ContactView({ viewState }: ContactViewProps) {
    const className = `view${viewState === 'active' ? ' active' : viewState === 'leaving' ? ' leaving' : ''}`;

    return (
        <article
            id="contact-view"
            className={className}
            role="tabpanel"
            aria-labelledby="contact-tab"
        >
            <div className="view-content">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Let&apos;s Connect</span>
                    </h2>
                    <p className="section-subtitle">Open to opportunities and collaborations</p>
                </div>

                <div className="contact-grid">
                    <ContactCard
                        href="mailto:huynhnhuy.tech@gmail.com"
                        icon="fas fa-envelope"
                        title="Email"
                        subtitle="huynhnhuy.tech@gmail.com"
                    />
                    <ContactCard
                        href="https://github.com/NhuYtech"
                        icon="fab fa-github"
                        title="GitHub"
                        subtitle="NhuYtech"
                        external
                    />
                    <ContactCard
                        href="https://www.linkedin.com/in/huỳnh-như-ý-94154a331/"
                        icon="fab fa-linkedin"
                        title="LinkedIn"
                        subtitle="Huỳnh Như Ý"
                        external
                    />
                </div>
            </div>
        </article>
    );
}
