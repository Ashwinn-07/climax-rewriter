import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");
const displayNameSchema = z
  .string()
  .min(2, "Display name must be at least 2 characters")
  .max(50, "Display name must be less than 50 characters");

export default function Auth() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  const validate = () => {
    try {
      emailSchema.parse(email);
    } catch (e: any) {
      setError(e.errors[0].message);
      return false;
    }

    try {
      passwordSchema.parse(password);
    } catch (e: any) {
      setError(e.errors[0].message);
      return false;
    }

    if (mode === "signup") {
      try {
        displayNameSchema.parse(displayName);
      } catch (e: any) {
        setError(e.errors[0].message);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password");
          } else {
            setError(error.message);
          }
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes("User already registered")) {
            setError(
              "An account with this email already exists. Try signing in instead."
            );
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>{mode === "signin" ? "Sign In" : "Sign Up"} - Lumiere</title>
      <meta
        name="description"
        content="Sign in or create an account to write and vote on alternate movie endings."
      />

      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gradient">
              {mode === "signin"
                ? "Sign in to Lumiere"
                : "Create your Lumiere account"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Lumiere is a community platform where film lovers reimagine and
              discuss movie stories.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your public name"
                  className="input-dark"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-dark"
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading
                ? "Loading..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            This is the official Lumiere sign-in page. We never ask for your
            password outside this website. Authentication is securely handled
            using Supabase.
          </p>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <span>
              By continuing, you agree to Lumiere’s{" "}
              <a href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </span>
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {mode === "signin"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
