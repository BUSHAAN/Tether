import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "../assets/logo-transparent-cropped.png";
import { Mail, User, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDMarquee } from "../components/ThreeDMarquee";
import marqueeImages from "../constants/images";
import toast from "react-hot-toast";
import { Button, Input } from "../components/ui";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      return toast.error("Email is invalid");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup(formData);
  };

  return (
    <div className="relative grid min-h-dvh overflow-hidden lg:grid-cols-2">
      <div className="app-atmosphere lg:hidden" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center justify-center overflow-y-auto p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 py-8">
          <div className="mb-2 text-center">
            <div className="flex flex-col items-center gap-2">
              <Link to="/">
                <img src={Logo} alt="Tether" className="h-auto w-[150px]" />
              </Link>
              <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                Create account
              </h1>
              <p className="text-[var(--t-muted)]">
                Create an account to get started
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              id="fullName"
              value={formData.fullName}
              placeholder="John Doe"
              leftIcon={<User className="size-5" />}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

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
              loading={isSigningUp}
            >
              {isSigningUp ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <p className="text-center text-[var(--t-muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--t-accent)] hover:text-[var(--t-accent-hover)]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden border-l border-[var(--t-border)] lg:block">
        <ThreeDMarquee images={marqueeImages} />
      </div>
    </div>
  );
};

export default SignUpPage;
