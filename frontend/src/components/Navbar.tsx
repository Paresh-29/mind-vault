import { useEffect, useState } from 'react';
import LogoutIcon from '../icons/LogoutIcon';
import PlusIcon from '../icons/Plusicon';
import Shareicon from '../icons/Shareicon';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';
import { BiMenu, BiX } from 'react-icons/bi';

interface NavbarProps {
  activeFilter: string;
  onAddContent: () => void;
  onShare: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  isSidebarCollapsed: boolean;
}

export const Navbar = ({
  activeFilter,
  onAddContent,
  onShare,
  onLogout,
  isAuthenticated,
  isSidebarCollapsed,
}: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);

    return () => window.removeEventListener('scroll', controlNavbar);
  }, []);

  return (
    <header
      className={`bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4 fixed top-0 left-0 right-0 z-20 h-18 shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div
        className={`max-w-[1920px] mx-auto flex items-center gap-4 ${
          isSidebarCollapsed ? 'pl-16' : 'pl-48'
        } transition-all duration-300`}
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 min-w-0 truncate">
          {activeFilter === 'all'
            ? 'All Notes'
            : activeFilter === 'twitter'
              ? 'Tweets'
              : activeFilter === 'youtube'
                ? 'Videos'
                : activeFilter === 'article'
                  ? 'Articles'
                  : activeFilter === 'link'
                    ? 'Links'
                    : 'Unknown'}
        </h1>
        {/* Desktop Menu */}
        <div className="ml-auto items-center gap-3 hidden md:flex">
          <ThemeToggle />
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg"
            onClick={onShare}
          >
            <Shareicon className="w-4 h-4" />
            Share Brain
          </Button>
          <Button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg"
            onClick={onAddContent}
          >
            <PlusIcon className="w-4 h-4" />
            Add Content
          </Button>
          {isAuthenticated && (
            <button
              className="p-2 text-gray-900 dark:text-gray-200 hover:dark:text-red-600 transition-colors"
              onClick={onLogout}
              aria-label="Logout"
            >
              <LogoutIcon className="w-6 h-6  dark:text-gray-200 text-gray-900" />
            </button>
          )}
        </div>
        {/* Mobile hamburger */}
        <div className="ml-auto md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900
                        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            {isMobileMenuOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 px-4 py-2 flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            {/* <span className="text-gray-700 dark:text-gray-200">Theme</span> */}
            <ThemeToggle />
          </div>
          <Button
            variant="secondary"
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md"
            onClick={onShare}
          >
            <Shareicon className="w-4 h-4" />
            Share Brain
          </Button>
          <Button
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
            onClick={onAddContent}
          >
            <PlusIcon className="w-4 h-4" />
            Add Content
          </Button>
          {isAuthenticated && (
            <button
              className="p-2 text-gray-900 dark:text-gray-200 hover:dark:text-red-600 transition-colors"
              onClick={onLogout}
              aria-label="Logout"
            >
              <LogoutIcon className="w-6 h-6  dark:text-gray-200 text-gray-900" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
