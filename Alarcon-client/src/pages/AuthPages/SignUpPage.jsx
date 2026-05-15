import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { createUser, loginUser } from "../../services/UserService.js";
import { setAuthSession } from "../../utils/auth.js";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-zinc-50";

const actionButtonClassName = "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    // At least 8 characters, mix of uppercase, lowercase, numbers, and symbols
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSymbols = /[!@#$%^&*]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumbers && hasSymbols && isLongEnough;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, numbers, and symbols (!@#$%^&*)"
      );
      return;
    }

    setLoading(true);

    try {
      // Create user account
      const signupResponse = await createUser({
        firstName,
        lastName,
        email,
        password,
      });

      // Auto-login after successful signup
      const loginResponse = await loginUser({ email, password });

      if (loginResponse.data.token) {
        setAuthSession({
          token: loginResponse.data.token,
          user: loginResponse.data.data || loginResponse.data,
        });
      }

      // Navigate to dashboard
      navigate("/dashboard", { state: { message: "Account created successfully!" } });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Sign up failed. Please try again.";
      setError(errorMessage);
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account with the same monochrome layout pattern and shared button treatment.
      </p>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClasses}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClasses}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            disabled={loading}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use 8+ characters with uppercase, lowercase, numbers, and symbols (!@#$%^&*).
          </p>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName} disabled={loading}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName} disabled={loading}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
