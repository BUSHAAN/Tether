import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="relative z-10 space-y-4">
        <p className="font-display text-6xl font-bold text-[var(--t-accent)]">
          404
        </p>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-[var(--t-muted)]">
          This page doesn’t exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex min-h-11 items-center justify-center rounded-[var(--t-radius)] bg-[var(--t-accent)] px-4 text-sm font-semibold text-[var(--t-accent-ink)] transition-colors hover:bg-[var(--t-accent-hover)]"
        >
          Back home
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;
