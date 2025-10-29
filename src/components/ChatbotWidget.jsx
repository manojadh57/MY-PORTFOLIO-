import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import useChat from "../hooks/useChat";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(true);
  const { messages, input, setInput, sendMessage, thinking } = useChat();
  const endRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 900);
    const t2 = setTimeout(() => setHint(false), 6000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const bounce = reduceMotion
    ? {}
    : {
        animate: { y: [0, -4, 0] },
        transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <>
      {/* Launcher + teaser */}
      <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
        <AnimatePresence>
          {hint && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative select-none max-w-[220px] rounded-2xl border-2 border-black bg-white px-3 py-2 shadow-[6px_6px_0_#000]"
            >
              <div className="text-[13px] leading-tight">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Chat with me here
                </span>
                <div className="text-[12px] opacity-80">
                  Ask about skills, projects, resume, availability.
                </div>
              </div>
              <button
                aria-label="Hide hint"
                onClick={() => setHint(false)}
                className="absolute -top-2 -right-2 grid place-items-center w-6 h-6 rounded-full border-2 border-black bg-white"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          aria-label="Open chat"
          onClick={() => {
            setOpen(true);
            setHint(false);
          }}
          className="relative rounded-full border-2 border-black bg-white p-3 shadow-[6px_6px_0_#000] hover:translate-y-[-2px] active:translate-y-0 transition"
          {...bounce}
        >
          <MessageCircle className="w-6 h-6" />
          {messages.length > 1 && !open && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-black bg-[#d1f7c4]" />
          )}
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Manas"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="fixed bottom-5 right-5 z-[60] w-[min(92vw,390px)] h-[560px] rounded-3xl border-2 border-black bg-white shadow-[10px_10px_0_#000] grid grid-rows-[auto,1fr,auto] overflow-hidden"
          >
            {/* Header */}
            <div className="relative border-b-2 border-black px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border-2 border-black bg-[#fff59d] grid place-items-center">
                  🙂
                </div>
                <div className="leading-tight">
                  <div className="font-semibold">
                    Manas — Portfolio Assistant
                  </div>
                  <div className="text-[12px] opacity-80">
                    Ask about About · Skills · Projects · Experience · Education
                    · Contact
                  </div>
                </div>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="absolute right-2 top-2 grid place-items-center w-8 h-8 rounded-full border-2 border-black bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="relative overflow-y-auto px-3 py-3 space-y-2">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-5 [background-image:radial-gradient(currentColor_0.5px,transparent_0.5px)] [background-size:10px_10px]"
              />
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={`inline-block max-w-[85%] px-3 py-2 rounded-2xl border-2 border-black ${
                      m.role === "user"
                        ? "bg-[#d1f7c4] shadow-[4px_4px_0_#000]"
                        : "bg-[#f5f5f5] shadow-[4px_4px_0_#000]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-[13px] leading-snug">
                      {m.content}
                    </p>
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="inline-block px-3 py-2 rounded-2xl border-2 border-black bg-[#f5f5f5] shadow-[4px_4px_0_#000]">
                  <p className="text-[13px] opacity-70">Manas is thinking…</p>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form
              className="border-t-2 border-black p-2 flex gap-2 bg-white"
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.trim()) return;
                sendMessage(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything… try: skills, REBB, resume, contact"
                className="flex-1 px-3 py-2 rounded-xl border-2 border-black outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-3 py-2 rounded-xl border-2 border-black bg-white disabled:opacity-50 grid place-items-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
