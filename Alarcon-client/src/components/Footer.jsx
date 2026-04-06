import { NavLink } from "react-router-dom";
import { SmokeBackground } from "./ui/spooky-smoke-animation";

const Footer = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 h-16 border-t-2 border-zinc-900">
      <SmokeBackground smokeColor="#1a0b2e" />
      <div className="relative z-10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-white/90 text-sm">
            © 2024 Alarcon WebProg. All rights reserved.
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/about"
              className="rounded-full border-2 px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] transition drop-shadow-lg border-white/50 text-white/90 hover:border-white hover:bg-white/20 hover:text-white"
            >
              About
            </NavLink>
            <NavLink
              to="/articles"
              className="rounded-full border-2 px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] transition drop-shadow-lg border-white/50 text-white/90 hover:border-white hover:bg-white/20 hover:text-white"
            >
              Articles
            </NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;