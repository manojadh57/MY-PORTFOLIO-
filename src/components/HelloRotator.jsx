// HelloRotator.jsx
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * HelloRotator — cycles “Hello, my name is …” across languages/scripts.
 *
 * Props:
 *  - name?: string                → defaults to "Manoj Adhikari"
 *  - interval?: number (ms)       → time per phrase (default 2200)
 *  - messages?: array             → override language list (optional)
 *  - showChips?: boolean          → show small language codes (default true)
 *  - className?: string           → extra classes on the wrapper
 *
 * Note: Fonts use reasonable system fallbacks.
 * If you want exact native faces (Noto families), add Google Fonts in index.html later.
 */
export default function HelloRotator({
  name = "Manoj Adhikari",
  interval = 2200,
  messages,
  showChips = true,
  className = "",
}) {
  const items = useMemo(
    () =>
      messages?.length
        ? messages
        : [
            {
              code: "en",
              dir: "ltr",
              style: {
                fontFamily:
                  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              },
              text: `Hello, my name is ${name}.`,
            },
            {
              code: "ne",
              dir: "ltr",
              style: { fontFamily: '"Noto Sans Devanagari", Mangal, serif' },
              text: "नमस्ते, मेरो नाम मनोज हो।",
            },
            {
              code: "hi",
              dir: "ltr",
              style: { fontFamily: '"Noto Sans Devanagari", Mangal, serif' },
              text: "नमस्ते, मेरा नाम मनोज है।",
            },
            {
              code: "ja",
              dir: "ltr",
              style: {
                fontFamily:
                  '"Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
              },
              text: "こんにちは、私の名前はマノジです。",
            },
            {
              code: "ko",
              dir: "ltr",
              style: {
                fontFamily:
                  '"Noto Sans KR", Apple SD Gothic Neo, Malgun Gothic, sans-serif',
              },
              text: "안녕하세요, 제 이름은 마노지입니다.",
            },
            {
              code: "zh",
              dir: "ltr",
              style: {
                fontFamily:
                  '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
              },
              text: `你好，我的名字是 ${name}。`,
            },
            {
              code: "ar",
              dir: "rtl",
              style: {
                fontFamily:
                  'Amiri, "Noto Naskh Arabic", "Scheherazade New", serif',
              },
              text: "مرحبًا، اسمي مانوج.",
            },
            {
              code: "ru",
              dir: "ltr",
              style: {
                fontFamily: '"PT Sans", "Noto Sans", Arial, sans-serif',
              },
              text: "Привет, меня зовут Манодж.",
            },
            {
              code: "es",
              dir: "ltr",
              style: { fontFamily: "Inter, system-ui, sans-serif" },
              text: `Hola, me llamo ${name}.`,
            },
            {
              code: "fr",
              dir: "ltr",
              style: { fontFamily: "Inter, system-ui, sans-serif" },
              text: `Bonjour, je m’appelle ${name}.`,
            },
            {
              code: "de",
              dir: "ltr",
              style: { fontFamily: "Inter, system-ui, sans-serif" },
              text: `Hallo, ich heiße ${name}.`,
            },
            {
              code: "pt",
              dir: "ltr",
              style: { fontFamily: "Inter, system-ui, sans-serif" },
              text: `Olá, meu nome é ${name}.`,
            },
            {
              code: "id",
              dir: "ltr",
              style: { fontFamily: "Inter, system-ui, sans-serif" },
              text: `Halo, nama saya ${name}.`,
            },
            {
              code: "th",
              dir: "ltr",
              style: {
                fontFamily: '"Noto Sans Thai", Th Sarabun New, sans-serif',
              },
              text: "สวัสดี ฉันชื่อ มาโนจ",
            },
            {
              code: "vi",
              dir: "ltr",
              style: { fontFamily: "Inter, system-ui, sans-serif" },
              text: `Xin chào, tôi là ${name}.`,
            },
          ],
    [messages, name]
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  const current = items[i];

  return (
    <div className={`mb-4 ${className}`}>
      {/* Banner */}
      <div className="inline-flex max-w-full items-center gap-3 border-2 border-black bg-white px-3 py-2 rounded-xl shadow-[6px_6px_0_#000]">
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-sm border-2 border-black bg-yellow-300 px-1 text-xs font-bold leading-none">
          {current.code.toUpperCase()}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            dir={current.dir || "ltr"}
            style={current.style}
            className="text-base sm:text-lg"
          >
            {current.text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Optional tiny language chips */}
      {showChips && (
        <div className="mt-2 hidden sm:flex flex-wrap gap-1.5">
          {items.map((m, idx) => (
            <span
              key={idx}
              className="font-mono text-[10px] border-2 border-black bg-white px-1.5 py-0.5 shadow-[3px_3px_0_#000]"
            >
              {m.code}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
