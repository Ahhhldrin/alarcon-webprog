import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { SmokeBackground } from "./ui/spooky-smoke-animation";

const Footer = () => {
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleEmailDropdown = () => {
    setShowEmailDropdown(!showEmailDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowEmailDropdown(false);
      }
    };

    if (showEmailDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmailDropdown]);

  return (
    <footer className="sticky top-full mt-auto border-t-2 border-zinc-900">
      <div className="relative h-16">
        <SmokeBackground smokeColor="#1a0b2e" />
        <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="text-white/90 text-sm">
              © 2026 Alarcon WebProg. All rights reserved.
            </div>
            <nav className="flex items-center gap-1 sm:gap-2">
              <NavLink
                to="/about"
                className="px-2 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200"
              >
                About
              </NavLink>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleEmailDropdown}
                  className="px-2 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200"
                >
                  Articles
                </button>
                {showEmailDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-md shadow-lg animate-in slide-in-from-bottom-2 duration-200 min-w-[200px] z-50">
                    <p className="text-white/90 text-xs font-medium mb-2">
                      Contact me:
                    </p>
                    <p className="text-white text-sm font-mono select-all">
                      alarconaa@students.national-u.edu.ph
                    </p>
                    <div className="mt-2 pt-2 border-t border-zinc-700">
                      <NavLink
                        to="/articles"
                        className="text-white/70 hover:text-white text-xs transition-colors duration-200"
                        onClick={() => setShowEmailDropdown(false)}
                      >
                        → View Articles
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
              <a
                href="https://github.com/Ahhhldrin"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;