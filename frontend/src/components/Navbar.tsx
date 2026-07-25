import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "../assets/logo-transparent-cropped.png";
import { LogOut, User } from "lucide-react";
import { Button } from "./ui";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <header className="fixed top-0 z-40 w-full border-b border-[var(--t-border)] bg-[var(--t-surface)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/chat"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img src={Logo} alt="Tether" className="h-9 w-auto" />
          <span className="font-display text-lg font-bold tracking-tight text-[var(--t-text)]">
            Tether
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/profile"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-[var(--t-radius)] border border-transparent px-3 text-sm font-semibold text-[var(--t-muted)] transition-colors hover:bg-white/[0.05] hover:text-[var(--t-text)] focus-visible:outline-2 focus-visible:outline-[var(--t-accent)] focus-visible:outline-offset-2"
          >
            <User className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={logout}
            leftIcon={<LogOut className="size-4" />}
          >
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
