import { NavLink } from "react-router-dom";
import { SmokeBackground } from "./ui/spooky-smoke-animation";
import logo from "../assets/images/logo.png";

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] transition drop-shadow-lg',
    isActive
      ? 'bg-white/90 text-zinc-900 border-white'
      : 'border-white/50 text-white/90 hover:border-white hover:bg-white/20 hover:text-white',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b-2 border-zinc-900">
      <SmokeBackground smokeColor="#1a0b2e" />
      <div className="relative z-10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-auto drop-shadow-lg" />
          </NavLink>

          <nav className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;