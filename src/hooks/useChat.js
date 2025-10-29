import { useEffect, useState } from "react";
import { FAQ } from "../data/faq";

// Flexible scoring: question text, tags, answer text + word overlap
function score(item, text) {
  const t = text.toLowerCase();
  const q = item.q.toLowerCase();
  const a = item.a.toLowerCase();
  const tags = (item.tags || []).map((x) => x.toLowerCase());
  const words = t.split(/\W+/).filter(Boolean);

  let s = 0;
  if (q.includes(t)) s += 4;
  if (a.includes(t)) s += 2;
  for (const tag of tags) if (t.includes(tag)) s += 2;
  for (const w of words) if (w.length > 2 && q.includes(w)) s += 1;
  for (const w of words) if (w.length > 3 && a.includes(w)) s += 0.5;
  return s;
}

function mockBrain(history, userMsg) {
  const text = userMsg.toLowerCase().trim();
  if (!text) return "";

  if (/^(hi|hello|hey|namaste|yo|g'?day)/i.test(text)) {
    return "Namaste! Ask me about my skills, projects, experience, education, resume, or availability.";
  }
  if (/(resume|cv|pdf)/.test(text)) return "Résumé: /Manoj_Adhikari_Resume.pdf";
  if (/(email|contact|hire|reach)/.test(text))
    return "Email me at manojadhikari57@gmail.com — I usually reply same day.";
  if (/(linkedin|github)/.test(text))
    return "LinkedIn: linkedin.com/in/manojadh57 · GitHub: github.com/manojadh57";

  const ranked = FAQ.map((item) => ({ item, s: score(item, text) })).sort(
    (a, b) => b.s - a.s
  );
  const top = ranked[0];
  if (top && top.s > 0) return top.item.a;

  return "I couldn’t find that yet. Try keywords like “skills”, “projects”, “REBB”, “resume”, or “contact”.";
}

export default function useChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey, I’m Manas — Manoj’s portfolio assistant. Ask me about About, Skills, Projects, Experience, Education, Contact, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  async function sendMessage(content) {
    const user = { role: "user", content };
    setMessages((m) => [...m, user]);
    setInput("");
    setThinking(true);

    try {
      const reply = mockBrain(messages, content);
      await new Promise((r) => setTimeout(r, 220));
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } finally {
      setThinking(false);
    }
  }

  useEffect(() => {
    // optional persistence:
    // localStorage.setItem("chat-history", JSON.stringify(messages));
  }, [messages]);

  return { messages, input, setInput, sendMessage, thinking };
}
