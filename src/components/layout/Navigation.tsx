import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoCooky from '../../assets/cooky.svg';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  // Actualizar tab activo basado en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/home')) setActiveTab('home');
    else if (path.includes('/recipe')) setActiveTab('recipe');
    else if (path.includes('/list')) setActiveTab('list');
    else if (path.includes('/profile')) setActiveTab('profile');
  }, [location.pathname]);

  const handleNavigation = (tab: string, route: string) => {
    setActiveTab(tab);
    navigate(route);
  };

  const isActive = (tab: string) => {
    return activeTab === tab;
  };

  const navigationItems = [
    {
      key: 'home',
      label: 'Home',
      route: '/app/home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      )
    },
    {
      key: 'recipe',
      label: 'Cocina',
      route: '/app/recipe',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
          <line x1="6" y1="17" x2="18" y2="17"/>
          <line x1="6" y1="13" x2="18" y2="13"/>
        </svg>
      )
    },
    {
      key: 'list',
      label: 'Listas',
      route: '/app/list',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      )
    },
    {
      key: 'profile',
      label: 'Perfil',
      route: '/app/profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Desktop Header Navigation */}
      <header className="desktop-navigation hidden sm:flex justify-between items-center text-white p-4 bg-gradient-to-r from-[#FE6700] to-orange-500">
        <div className="flex items-center">
          <img src={logoCooky} alt="Cooky Logo" className="w-10 h-10 mr-2 bg-bg-secondary" />
          <h1 className="text-3xl font-bold p-0 m-0">Cooky</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            {navigationItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNavigation(item.key, item.route)}
                  className={`nav-button ${isActive(item.key) ? 'activeButton' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-navigation sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="mobile-nav-container">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              className={`nav-button ${isActive(item.key) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.key, item.route)}
            >
              <div className="nav-icon">
                {item.icon}
              </div>
              <span className="nav-text">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
