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
        id: 'thien-an-funi',
        number: '01',
        title: 'Thien An Funi – Furniture E-commerce System',
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
        number: '02',
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
        id: 'motorbike-paint-warehouse',
        number: '03',
        title: 'Motorbike Paint Warehouse Management App',
        description:
            'Mobile application for managing inventory and order workflows at a motorbike paint workshop in Can Tho. The system tracks order status, internal notes, and delivery progress while providing real-time notifications to partner stores.',
        tech: [
            'Flutter',
            'Dart',
            'Firebase',
            'Firebase Auth',
            'Firestore',
            'Material Design',
        ],
        links: [
            {
                label: 'Code',
                href: 'https://github.com/NhuYtech/MotorbikePaintManager',
                icon: 'fab fa-github',
            },
        ],
    },

    {
        id: 'iot-fire-detection-mobile',
        number: '04',
        title: 'IoT Fire Detection – Mobile App',
        description:
            'Flutter mobile application for monitoring fire risks in motorbike paint workshops. The app receives real-time sensor data from ESP32 devices through Firebase and notifies staff instantly when abnormal conditions are detected.',
        tech: [
            'Flutter',
            'Dart',
            'Firebase',
            'Firebase Auth',
            'Realtime Database',
            'Material Design',
        ],
        links: [
            {
                label: 'Code',
                href: 'https://github.com/NhuYtech/sonxemayCanTho_app',
                icon: 'fab fa-github',
            },
        ],
    },

    {
        id: 'iot-fire-detection-dashboard',
        number: '04',
        title: 'IoT Fire Detection – Web Dashboard',
        description:
            'Web dashboard for monitoring IoT fire detection devices in real time. Built with Next.js and TypeScript, the platform visualizes environmental data from ESP32 sensors and provides alerts, analytics, and remote monitoring capabilities.',
        tech: [
            'Next.js',
            'TypeScript',
            'React',
            'Firebase',
            'Chart.js',
            'Tailwind CSS',
        ],
        links: [
            {
                label: 'Code',
                href: 'https://github.com/NhuYtech/sonxemaycantho_web',
                icon: 'fab fa-github',
            },
            {
                label: 'Demo',
                href: 'https://sonxemaycantho-web.vercel.app/',
                icon: 'fas fa-external-link-alt',
            },
        ],
    }
];
