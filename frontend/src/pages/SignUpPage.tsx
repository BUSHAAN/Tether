import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "../assets/logo.png";
import { Mail, User, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ThreeDMarquee } from "../components/ThreeDMarquee";
import image1 from "../assets/marqueeImages/1.jpg";
import image2 from "../assets/marqueeImages/2.jpg";
import image3 from "../assets/marqueeImages/3.jpg";
import image4 from "../assets/marqueeImages/4.jpg";
import image5 from "../assets/marqueeImages/5.jpg";
import image6 from "../assets/marqueeImages/6.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image1,
  image2,
  image3,
  image4,
  image6,
];

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left side: Image or illustration */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8">
          {/*logo*/}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-32 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <img src={Logo} alt="Logo" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Create an account to get started
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label" htmlFor="fullName">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
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
                  required
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
                  required
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
                isSigningUp ? "loading" : ""
              }`}
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                  <span className="ml-2">Signing Up...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign In{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side: Background image or illustration */}

      <ThreeDMarquee images={images} />
    </div>
  );
};

export default SignUpPage;
