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
import { Avatar } from "./ui";
import { cn } from "../lib/utils";

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
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col bg-[var(--t-surface)]">
      <ChatHeader />
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <BouncingIcon />
            <p className="relative bottom-4 text-center text-lg text-[var(--t-muted)]">
              No chats to display!
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMine =
              message.senderId === authUser?._id &&
              message.receiverId === selectedUser?._id;
            const isTheirs =
              message.senderId === selectedUser?._id &&
              message.receiverId === authUser?._id;

            if (!isMine && !isTheirs) return null;

            return (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                className={cn(
                  "flex gap-2.5",
                  isMine ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar
                  src={
                    isMine
                      ? authUser?.profilePic || DefaultAvatar
                      : selectedUser?.profilePic || DefaultAvatar
                  }
                  name={isMine ? authUser?.fullName : selectedUser?.fullName}
                  size="sm"
                />
                <div
                  className={cn(
                    "flex max-w-[75%] flex-col gap-1",
                    isMine ? "items-end" : "items-start"
                  )}
                >
                  <time className="px-1 text-[11px] text-[var(--t-faint)]">
                    {formatDate(message.createdAt)}
                  </time>
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      isMine
                        ? "rounded-br-md bg-[var(--t-accent)] text-[var(--t-accent-ink)]"
                        : "rounded-bl-md bg-[var(--t-surface-2)] text-[var(--t-text)]"
                    )}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Message"
                        className="mb-2 max-w-xs rounded-[var(--t-radius)]"
                      />
                    )}
                    {message.message}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
