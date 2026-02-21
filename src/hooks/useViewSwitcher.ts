import { useState, useCallback, useEffect, useRef } from 'react';

export type View = 'home' | 'portfolio' | 'about';

const VALID_VIEWS: View[] = ['home', 'portfolio', 'about'];
const TRANSITION_DURATION = 350; // must match CSS transition duration

function isValidView(value: string): value is View {
    return VALID_VIEWS.includes(value as View);
}

interface UseViewSwitcherReturn {
    currentView: View;
    leavingView: View | null;
    isTransitioning: boolean;
    switchView: (view: View) => void;
}

export function useViewSwitcher(): UseViewSwitcherReturn {
    const [currentView, setCurrentView] = useState<View>(() => {
        // Initialise from URL hash so the first render is already correct
        const hash = window.location.hash.substring(1);
        return isValidView(hash) ? hash : 'home';
    });
    const [leavingView, setLeavingView] = useState<View | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Refs keep the latest values accessible inside timeouts and event
    // listeners without needing to re-register them on every state change.
    const currentViewRef = useRef<View>(currentView);
    const isTransitioningRef = useRef(false);
    const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

    // Keep refs in sync with state
    useEffect(() => {
        currentViewRef.current = currentView;
    }, [currentView]);

    const switchView = useCallback((viewName: View) => {
        // Read from refs so this function never needs to be recreated
        if (currentViewRef.current === viewName) return;
        if (isTransitioningRef.current) return;

        isTransitioningRef.current = true;
        setIsTransitioning(true);

        // Capture the view that is leaving before any state update
        const leavingViewName = currentViewRef.current;

        // Phase 1: start exit animation on the current view
        setLeavingView(leavingViewName);

        const t1 = setTimeout(() => {
            // Phase 1 complete: clear leaving state and activate the new view
            setLeavingView(null);
            setCurrentView(viewName);
            currentViewRef.current = viewName;

            // Sync URL hash without triggering a page reload
            if (history.pushState) {
                history.pushState(null, '', `#${viewName}`);
            } else {
                window.location.hash = viewName;
            }

            // Phase 2: unlock after the enter animation completes
            const t2 = setTimeout(() => {
                isTransitioningRef.current = false;
                setIsTransitioning(false);
            }, TRANSITION_DURATION);

            timerRefs.current.push(t2);
        }, TRANSITION_DURATION);

        timerRefs.current.push(t1);
    }, []); // stable — reads state via refs, no deps needed

    // Handle browser back / forward buttons
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (isValidView(hash)) {
                switchView(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [switchView]); // switchView is now stable (empty deps), so this runs once

    // Clear any pending timers on unmount to prevent setState on unmounted component
    useEffect(() => {
        // Capture the ref value at effect registration time (required by the
        // react-hooks/exhaustive-deps rule — the ref could change before cleanup runs)
        const timers = timerRefs.current;
        return () => {
            timers.forEach(clearTimeout);
        };
    }, []);

    return { currentView, leavingView, isTransitioning, switchView };
}
