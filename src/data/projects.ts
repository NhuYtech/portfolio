export interface ProjectLink {
    label: string;
    href: string;
    icon: string;
}

export interface Project {
    id: string;
    // number: string;
    title: string;
    description: string;
    tech: string[];
    links: ProjectLink[];
}

export const projects: Project[] = [
    {
        id: 'thien-an-funi',
        // number: '01',
        title: 'Thiên Ân Funi – Furniture E-commerce System',
        description:
            'E-commerce system developed for Thiên Ân furniture store in Can Tho. Features include product management, order processing, role-based authentication (Admin, SaleStaff, Customer), inventory tracking, and a real-time admin dashboard.',
        tech: [
            'ASP.NET Core MVC',
            'C#',
            'Entity Framework Core',
            'SQL Server',
            'Bootstrap',
            'JavaScript',
        ],
        links: [
            {
                label: 'Code',
                href: 'https://github.com/NhuYtech/ThienAnFuni',
                icon: 'fab fa-github',
            },
        ],
    },
    {
        id: 'ctut-youth-management',
        // number: '02',
        title: 'CTUT Youth Union Management System',
        description:
            'A web-based management system for tracking Youth Union members, activities, attendance, and union fees at CTUT. The platform improves administrative efficiency through role-based access, reporting, and centralized data management.',
        tech: [
            'PHP',
            'Symfony',
            'Twig',
            'Bootstrap',
            'MySQL',
            'Doctrine ORM',
        ],
        links: [
            {
                label: 'Code',
                href: 'https://github.com/NhuYtech/Quanlydoanvien_CTUT',
                icon: 'fab fa-github',
            },
        ],
    },
    {
        id: 'devops-suite',
        // number: '04',
        title: 'DevOps Automation Suite',
        description:
            'Infrastructure automation reducing deployment time by 70% with comprehensive monitoring.',
        tech: ['Python', 'Terraform', 'Jenkins', 'Prometheus'],
        links: [
            { label: 'Code', href: 'https://github.com', icon: 'fab fa-github' },
        ],
    },
];
