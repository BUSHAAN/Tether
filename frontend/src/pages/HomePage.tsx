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
    <div className="h-screen bg-base-200 over overflow-hidden">
      <div className="flex items-center justify-center py-20 px-4">
        <div
          className="bg-base-100 rounded-lg shadow-cl w-full 
        max-w-6xl h-[calc(100vh-8rem)]"
        >
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
