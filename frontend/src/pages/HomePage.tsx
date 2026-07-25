import Sidebar from "../components/Sidebar";
import { useMessageStore } from "../store/useMessageStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useEffect } from "react";

const HomePage = () => {
  const {
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();

  useEffect(() => {
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, []);

  return (
    <div className="relative h-dvh overflow-hidden">
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="relative z-10 flex h-full items-center justify-center px-3 py-20 sm:px-4">
        <div className="flex h-[calc(100dvh-8rem)] w-full max-w-6xl overflow-hidden rounded-[var(--t-radius-lg)] border border-[var(--t-border)] bg-[var(--t-surface)] shadow-2xl shadow-black/40">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
