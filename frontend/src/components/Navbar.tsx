import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "../assets/logo-transparent.png";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? "dark" : "nord";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header
      className=" bg-base-100 border-b border-base-300 
    fixed w-full top-0 z-40 backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80
               transition-all"
            >
              <div
                className="size-9 rounded-full
                 bg-base-200 flex items-center justify-center"
              >
                <img src={Logo} alt="Logo" />
              </div>
              <h1 className="text-lg font-bold">Tether</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <label className="toggle text-base-content w-11 px-0 h-5.5 rounded-full">
              <input onChange={
                onThemeChange
              } checked={theme === "dark" ? true : false
              } type="checkbox" className="rounded-full"/>
              <Sun className="size-5" />
              <Moon className="size-5" />
            </label>
            <Link to="/profile" className="btn btn-sm gap-2 transition-colors">
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button
              className="flex items-center btn btn-sm gap-2 transition-colors"
              onClick={logout}
            >
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
