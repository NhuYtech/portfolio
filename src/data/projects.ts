export interface ProjectLink {
    label: string;
    href: string;
    icon: string;
}

export interface Project {
    id: string;
    number: string;
    title: string;
    description: string;
    tech: string[];
    links: ProjectLink[];
}

export const projects: Project[] = [
    {
        id: 'ai-analytics',
        number: '01',
        title: 'AI Analytics Platform',
        description:
            'Real-time data visualization dashboard with ML insights processing 10M+ events daily.',
        tech: ['React', 'Python', 'TensorFlow', 'AWS'],
        links: [
            { label: 'Code', href: 'https://github.com', icon: 'fab fa-github' },
            { label: 'Demo', href: '#', icon: 'fas fa-external-link-alt' },
        ],
    },
    {
        id: 'collab-editor',
        number: '02',
        title: 'Collaborative Code Editor',
        description:
            'Real-time collaborative coding platform with WebSocket integration and syntax highlighting.',
        tech: ['Next.js', 'WebSocket', 'Monaco', 'Redis'],
        links: [
            { label: 'Code', href: 'https://github.com', icon: 'fab fa-github' },
            { label: 'Demo', href: '#', icon: 'fas fa-external-link-alt' },
        ],
    },
    {
        id: 'ecommerce-microservices',
        number: '03',
        title: 'E-Commerce Microservices',
        description:
            'Scalable microservices architecture handling 50K+ daily transactions with event-driven design.',
        tech: ['Node.js', 'Kubernetes', 'PostgreSQL', 'RabbitMQ'],
        links: [
            { label: 'Code', href: 'https://github.com', icon: 'fab fa-github' },
        ],
    },
    {
        id: 'devops-suite',
        number: '04',
        title: 'DevOps Automation Suite',
        description:
            'Infrastructure automation reducing deployment time by 70% with comprehensive monitoring.',
        tech: ['Python', 'Terraform', 'Jenkins', 'Prometheus'],
        links: [
            { label: 'Code', href: 'https://github.com', icon: 'fab fa-github' },
        ],
    },
];
