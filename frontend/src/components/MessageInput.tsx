import { useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "./ui";
import { cn } from "../lib/utils";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useMessageStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(typeof reader.result === "string" ? reader.result : null);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        message: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const canSend = Boolean(text.trim() || imagePreview);

  return (
    <div className="w-full border-t border-[var(--t-border)] p-3 sm:p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 rounded-[var(--t-radius)] border border-[var(--t-border)] object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[var(--t-surface-3)] text-[var(--t-text)] ring-2 ring-[var(--t-surface)]"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          <input
            type="text"
            className={cn(
              "w-full rounded-[var(--t-radius)] border border-[var(--t-border-strong)] bg-[var(--t-bg)]",
              "px-3.5 py-2.5 text-sm text-[var(--t-text)] placeholder:text-[var(--t-faint)]",
              "outline-none transition-colors focus:border-[var(--t-accent)]/50 focus:ring-2 focus:ring-[var(--t-accent)]/20"
            )}
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "hidden size-10 sm:inline-flex",
              imagePreview ? "text-[var(--t-accent)]" : "text-[var(--t-muted)]"
            )}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image size={20} />
          </Button>
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          aria-label="Send message"
          className="size-10 shrink-0"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
