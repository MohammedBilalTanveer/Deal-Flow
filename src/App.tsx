import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { FundThesisOnboarding } from './components/FundThesisOnboarding';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    const fundThesis = localStorage.getItem('fundThesis');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      // If authenticated but no thesis, show onboarding
      if (!onboardingComplete || !fundThesis) {
        setShowOnboarding(true);
      }
    } else {
      setShowLogin(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: { name: string; email: string; fundName: string }) => {
    setIsAuthenticated(true);
    setShowLogin(false);
    
    // Check if onboarding is needed
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    } else {
      setShowDashboard(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowDashboard(true);
  };

  const handleEnterDashboard = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }
    
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    } else {
      setShowDashboard(true);
    }
  };

  const handleReconfigure = () => {
    setShowDashboard(false);
    setShowOnboarding(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setShowDashboard(false);
    setShowOnboarding(false);
    setShowLogin(true);
  };

  if (isLoading) {
    return null;
  }

  if (showLogin) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <FundThesisOnboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen">
      {showDashboard ? (
        <Dashboard 
          onBack={() => setShowDashboard(false)} 
          onReconfigure={handleReconfigure}
          onLogout={handleLogout}
        />
      ) : (
        <LandingPage onEnterDashboard={handleEnterDashboard} />
      )}
    </div>
  );
}