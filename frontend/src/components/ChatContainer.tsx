import { useEffect, useRef } from "react";
import { useMessageStore } from "../store/useMessageStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import DefaultAvatar from "../assets/avatar.png";
import { formatDate } from "../lib/utils";
import BouncingIcon from "./BouncingIcon";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    viewMessages,
    isMessagesLoading,
    selectedUser,
  } = useMessageStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToChild = (child: HTMLDivElement) => {
    child.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    try {
      if (selectedUser?._id) {
        viewMessages(selectedUser._id);
      }
    } catch (error) {
      console.error("Error in ChatContainer useEffect:", error);
      toast.error("Failed to load messages. Please try again.");
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToChild(messagesEndRef.current);
    }
  }, [messages]);

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
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <BouncingIcon />
              <div className="text-center text-base-content/60 text-2xl relative bottom-4">
                No chats to display!
              </div>
            </div>
          </>
        ) : (
          messages.map((message, index) => (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? messagesEndRef : null}
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
                    alignSelf: `${
                      message.senderId == authUser?._id ? "end" : "start"
                    }`,
                  }}
                  className="text-xs opacity-50"
                >
                  {formatDate(message.createdAt)}
                </time>
                <div
                  style={{
                    alignSelf: `${
                      message.senderId == authUser?._id ? "end" : "start"
                    }`,
                  }}
                  className="chat-bubble flex flex-col"
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message"
                      className="mt-2 rounded-lg max-w-xs"
                    />
                  )}
                  {message.message}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
