import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/logo-transparent-cropped.png";
import { Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import { ThreeDMarquee } from "../components/ThreeDMarquee";
import marqueeImages from "../constants/images";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left side: Image or illustration */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8">
          {/*logo*/}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <img src={Logo} alt="Logo" style={{ width: 150 }} />

              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account to continue
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label" htmlFor="Email">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  id="Email"
                  value={formData.email}
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="Password">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  value={formData.password}
                  className="input input-bordered w-full pl-10"
                  placeholder="*******"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${
                isLoggingIn ? "loading" : ""
              }`}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  <span className="ml-2">Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side: Background image or illustration */}
      <ThreeDMarquee images={marqueeImages} />
    </div>
  );
};

export default LoginPage;
