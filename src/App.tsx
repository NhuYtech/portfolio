import { useCallback } from 'react';
import { useViewSwitcher, type View } from './hooks/useViewSwitcher';
import { useScrollPrevention } from './hooks/useScrollPrevention';
import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import HomeView from './components/views/HomeView';
import PortfolioView from './components/views/PortfolioView';
import AboutView from './components/views/AboutView';

type ViewState = 'active' | 'leaving' | 'hidden';

function App() {
  const { currentView, leavingView, switchView } = useViewSwitcher();
  useScrollPrevention();

  const getViewState = useCallback(
    (view: View): ViewState => {
      if (currentView === view) return 'active';
      if (leavingView === view) return 'leaving';
      return 'hidden';
    },
    [currentView, leavingView]
  );

  return (
    <>
      <BackgroundLayer />

      <Navbar currentView={currentView} switchView={switchView} />

      <main className="content-container">
        <HomeView
          viewState={getViewState('home')}
          switchView={switchView}
        />
        <PortfolioView viewState={getViewState('portfolio')} />
        <AboutView viewState={getViewState('about')} />
      </main>

      {/* Live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="view-announcer"
      />
    </>
  );
}

export default App;
