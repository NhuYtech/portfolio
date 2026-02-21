import { useRef, useEffect, useCallback } from 'react';
import type { View } from '../hooks/useViewSwitcher';

interface NavbarProps {
    currentView: View;
    switchView: (view: View) => void;
}

const NAV_ITEMS: { label: string; view: View }[] = [
    { label: 'About', view: 'about' },
    { label: 'Experience', view: 'experience' },
    { label: 'Projects', view: 'projects' },
    { label: 'Education', view: 'education' },
    { label: 'Skills', view: 'skills' },
    { label: 'Contact', view: 'contact' },
];

export default function Navbar({ currentView, switchView }: NavbarProps) {
    const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Keyboard arrow-key navigation between tabs (mirrors original script.js)
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const focused = document.activeElement;
            const currentIndex = linkRefs.current.findIndex((el) => el === focused);
            if (currentIndex === -1) return;

            const len = NAV_ITEMS.length;
            let nextIndex: number | null = null;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextIndex = (currentIndex + 1) % len;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                nextIndex = (currentIndex - 1 + len) % len;
            } else if (e.key === 'Home') {
                e.preventDefault();
                nextIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                nextIndex = len - 1;
            }

            if (nextIndex !== null) {
                linkRefs.current[nextIndex]?.focus();
                switchView(NAV_ITEMS[nextIndex].view);
            }
        },
        [switchView]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="nav-container">
                <a href="#home" className="nav-logo" aria-label="Home">
                    Portfolio
                </a>
                <ul className="nav-menu" role="tablist">
                    {NAV_ITEMS.map(({ label, view }, index) => (
                        <li key={view} role="presentation">
                            <button
                                ref={(el) => { linkRefs.current[index] = el; }}
                                className={`nav-link${currentView === view ? ' active' : ''}`}
                                data-view={view}
                                role="tab"
                                aria-selected={currentView === view}
                                aria-controls={`${view}-view`}
                                onClick={() => switchView(view)}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
