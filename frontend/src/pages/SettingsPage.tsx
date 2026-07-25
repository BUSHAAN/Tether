import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="relative min-h-dvh pt-20">
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-[var(--t-muted)]">
          Settings are coming soon. For now, manage your account from Profile.
        </p>
        <Link
          to="/profile"
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--t-radius)] bg-[var(--t-accent)] px-4 text-sm font-semibold text-[var(--t-accent-ink)] transition-colors hover:bg-[var(--t-accent-hover)]"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
