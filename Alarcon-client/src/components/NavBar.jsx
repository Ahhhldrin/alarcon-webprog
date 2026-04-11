import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import { SmokeBackground } from "./ui/spooky-smoke-animation";
import logo from "../assets/images/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] transition drop-shadow-lg",
    isActive
      ? "border-white bg-white/90 text-zinc-900"
      : "border-white/50 text-white/90 hover:border-white hover:bg-white/20 hover:text-white",
  ].join(" ");

const dropdownLinkClass = ({ isActive }) =>
  [
    "block w-full px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] transition",
    isActive
      ? "bg-white/15 text-white"
      : "text-white/90 hover:bg-white/10 hover:text-white",
  ].join(" ");

const NavBar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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

            <div ref={accountRef} className="relative ml-1 sm:ml-2">
              <button
                type="button"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                onClick={() => setAccountOpen((o) => !o)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/50 text-white/90 transition hover:border-white hover:bg-white/20 hover:text-white"
              >
                <User className="h-4 w-4" strokeWidth={2} aria-hidden />
              </button>

              {accountOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[100] mt-2 min-w-[11rem] rounded-xl border-2 border-white/20 bg-zinc-950/95 py-1 shadow-xl backdrop-blur-md"
                >
                  <NavLink
                    to="/auth/signin"
                    role="menuitem"
                    className={dropdownLinkClass}
                    onClick={() => setAccountOpen(false)}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/auth/signup"
                    role="menuitem"
                    className={dropdownLinkClass}
                    onClick={() => setAccountOpen(false)}
                  >
                    Sign up
                  </NavLink>
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
