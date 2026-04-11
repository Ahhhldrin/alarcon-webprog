import { Outlet, useLocation } from "react-router-dom";
import { SmokeBackground } from "../components/ui/spooky-smoke-animation";
import logo from "../assets/images/logo.png";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignIn = pathname.includes("/signin");

  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div
        className="auth-glide-root relative flex min-h-screen w-full flex-col lg:block lg:overflow-hidden"
        data-auth={isSignIn ? "signin" : "signup"}
      >
        {/* Form — slides between left (sign in) and right (sign up); transform via CSS (see index.css) */}
        <div
          className={[
            "auth-glide-form flex min-h-0 flex-1 flex-col justify-center bg-zinc-50 px-6 py-10 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:z-20 lg:min-h-screen lg:w-1/2 lg:px-16",
            isSignIn ? "order-1" : "order-2",
          ].join(" ")}
        >
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </div>

        {/* Logo + spooky smoke — slides opposite the form */}
        <div
          className={[
            "auth-glide-logo relative flex flex-1 items-center justify-center overflow-hidden border-t-2 border-zinc-800 bg-zinc-950 p-8 sm:p-10 lg:absolute,lg:inset-y-0 lg:left-0 lg:z-10 lg:min-h-screen lg:w-1/2 lg:border-t-0 lg:p-16",
            isSignIn ? "order-2 border-zinc-800 lg:border-l-2" : "order-1 border-zinc-800 lg:border-r-2",
          ].join(" ")}
        >
          <SmokeBackground smokeColor="#1a0b2e" />
          <div className="relative z-10 flex w-full max-w-md items-center justify-center rounded-[2rem] border border-white/10 bg-black/25 p-8 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:p-12">
            <img
              src={logo}
              alt="Logo"
              className="h-auto w-full max-w-[min(16rem,100%)] object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
