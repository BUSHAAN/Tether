import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/logo-transparent-cropped.png";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Input } from "../components/ui";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) return toast.error("Email is required"), false;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      return toast.error("Email is invalid"), false;

    if (!password.trim()) return toast.error("Password is required"), false;
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long"), false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();
    if (success) login(formData);
  };

  return (
    <div className="relative flex h-dvh items-center justify-center overflow-hidden px-5">
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex flex-col items-center gap-1.5">
            <Link to="/">
              <img src={Logo} alt="Tether" className="h-auto w-[130px]" />
            </Link>
            <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--t-muted)]">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            id="Email"
            value={formData.email}
            placeholder="you@example.com"
            leftIcon={<Mail className="size-5" />}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            id="Password"
            value={formData.password}
            placeholder="••••••••"
            leftIcon={<Lock className="size-5" />}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            rightSlot={
              <button
                type="button"
                className="rounded-md p-1.5 text-[var(--t-faint)] hover:text-[var(--t-text)]"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            }
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={isLoggingIn}
          >
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--t-muted)]">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[var(--t-accent)] hover:text-[var(--t-accent-hover)]"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
