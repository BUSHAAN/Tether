import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import DefaultAvatar from "../assets/avatar.png";
import { formatDate } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useMessageStore();
  const { authUser } = useAuthStore();

  
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser?._id) {
        await getMessages(selectedUser._id);
      }
    };
    fetchMessages();
  }, [selectedUser, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat
              ${
                message.senderId === authUser?._id &&
                message.receiverId === selectedUser?._id
                  ? "chat-end"
                  : message.senderId === selectedUser?._id &&
                    message.receiverId === authUser?._id
                  ? "chat-start"
                  : "hidden"
              }
            `}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <img
                  src={
                    message.senderId == authUser?._id
                      ? authUser?.profilePic || DefaultAvatar
                      : selectedUser?.profilePic || DefaultAvatar
                  }
                  alt="User"
                />
              </div>
            </div>
            <div className="chat-header mb-1 flex flex-col">
              <time
                style={{
                  alignSelf:`${message.senderId == authUser?._id ? "end" : "start"}`,
                }}
                className="text-xs opacity-50"
              >
                {formatDate(message.createdAt)}
              </time>
              <div
              style={{
                  alignSelf:`${message.senderId == authUser?._id ? "end" : "start"}`,
                }}
              className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Message"
                    className="mt-2 rounded-lg max-w-xs"
                  />
                )}
                {message.message || " error! no message"}
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
