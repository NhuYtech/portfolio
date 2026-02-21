interface ContactCardProps {
    href: string;
    icon: string;
    title: string;
    subtitle: string;
    external?: boolean;
}

export default function ContactCard({
    href,
    icon,
    title,
    subtitle,
    external = false,
}: ContactCardProps) {
    return (
        <a
            href={href}
            className="contact-card"
            {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
        >
            <div className="contact-icon">
                <i className={icon} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
        </a>
    );
}
