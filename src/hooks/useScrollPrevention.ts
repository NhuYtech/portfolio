import { useEffect } from 'react';

/**
 * Prevents page-level scrolling while allowing scroll inside .view-content.
 * Mirrors the scroll prevention logic from the original script.js.
 */
export function useScrollPrevention(): void {
    useEffect(() => {
        // Snap scroll position back to top if anything manages to scroll
        const handleScroll = () => {
            window.scrollTo(0, 0);
        };

        // Block wheel events on elements outside .view-content
        const handleWheel = (e: WheelEvent) => {
            const target = e.target as Element;
            if (target.closest('.view-content')) return;
            e.preventDefault();
        };

        // Block touch scroll on elements outside .view-content
        const handleTouchMove = (e: TouchEvent) => {
            const target = e.target as Element;
            if (target.closest('.view-content')) return;
            e.preventDefault();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel, { passive: false });
        document.body.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            document.body.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
}
