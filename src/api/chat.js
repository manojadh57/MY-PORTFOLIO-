import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import useChat from "../hooks/useChat";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const { messages, input, setInput, sendMessage, thinking } = useChat();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full border-2 border-black shadow-[4px_4px_0_#000] bg-white p-3 hover:translate-y-[-2px] transition will-change-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Manas"
          className="fixed bottom-4 right-4 z-50 w-[min(92vw,380px)] h-[520px] rounded-2xl border-2 border-black shadow-[8px_8px_0_#000] bg-white flex flex-col"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b-2 border-black">
            <div className="font-semibold">Chat with Manas</div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 border-2 border-black bg-white hover:rotate-90 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${m.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block max-w-[85%] px-3 py-2 rounded-2xl border-2 border-black ${
                    m.role === "user" ? "bg-[#d1f7c4]" : "bg-[#f5f5f5]"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="inline-block max-w-[85%] px-3 py-2 rounded-2xl border-2 border-black bg-[#f5f5f5]">
                <p className="text-sm opacity-70">Manas is thinking…</p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            className="p-2 border-t-2 border-black flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!input.trim()) return;
              sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Manoj, projects, or anything…"
              className="flex-1 px-3 py-2 rounded-xl border-2 border-black outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-3 py-2 rounded-xl border-2 border-black bg-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
