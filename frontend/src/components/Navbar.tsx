import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "../assets/logo-transparent.png";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout } = useAuthStore();
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
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link to="/profile" className="btn btn-sm gap-2 transition-colors">
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button className="flex items-center btn btn-sm gap-2 transition-colors" onClick={logout}>
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
