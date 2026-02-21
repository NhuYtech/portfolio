interface SkillBadgeProps {
    label: string;
}

export default function SkillBadge({ label }: SkillBadgeProps) {
    return <span className="skill-badge">{label}</span>;
}
