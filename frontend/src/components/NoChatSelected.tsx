import BouncingIcon from "./BouncingIcon";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-[var(--t-surface)]/50 p-10 sm:p-16">
      <div className="max-w-md space-y-6 text-center">
        <BouncingIcon />
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--t-text)]">
          Welcome to Tether
        </h2>
        <p className="text-[var(--t-muted)]">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
