// HelloRotator.jsx
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Rotates “Hello, my name is …” across languages with a flag + 🙂.
 * Props:
 *  - name?: string        (default "Manoj Adhikari")
 *  - interval?: number    (ms per phrase, default 2200)
 *  - className?: string
 */
export default function HelloRotator({
  name = "Manoj Adhikari",
  interval = 2200,
  className = "",
}) {
  const items = useMemo(
    () => [
      // Use 🇦🇺 for English since you're based in Sydney.
      {
        flag: "🇦🇺",
        dir: "ltr",
        style: {
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
        },
        text: `G'day mate, my name is ${name}. 🙂`,
      },
      {
        flag: "🇳🇵",
        dir: "ltr",
        style: { fontFamily: '"Noto Sans Devanagari", Mangal, serif' },
        text: "नमस्ते, मेरो नाम मनोज हो। 🙂",
      },
      {
        flag: "🇮🇳",
        dir: "ltr",
        style: { fontFamily: '"Noto Sans Devanagari", Mangal, serif' },
        text: "नमस्ते, मेरा नाम मनोज है। 🙂",
      },
      {
        flag: "🇯🇵",
        dir: "ltr",
        style: {
          fontFamily:
            '"Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
        },
        text: "こんにちは、私の名前はマノジです。🙂",
      },
      {
        flag: "🇰🇷",
        dir: "ltr",
        style: {
          fontFamily:
            '"Noto Sans KR", Apple SD Gothic Neo, Malgun Gothic, sans-serif',
        },
        text: "안녕하세요, 제 이름은 마노지입니다. 🙂",
      },
      {
        flag: "🇨🇳",
        dir: "ltr",
        style: {
          fontFamily:
            '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
        },
        text: `你好，我的名字是 ${name}。🙂`,
      },
      {
        flag: "🇸🇦",
        dir: "rtl",
        style: {
          fontFamily: 'Amiri, "Noto Naskh Arabic", "Scheherazade New", serif',
        },
        text: "مرحبًا، اسمي مانوج. 🙂",
      },
      {
        flag: "🇷🇺",
        dir: "ltr",
        style: { fontFamily: '"PT Sans", "Noto Sans", Arial, sans-serif' },
        text: "Привет, меня зовут Манодж. 🙂",
      },
      {
        flag: "🇪🇸",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Hola, me llamo ${name}. 🙂`,
      },
      {
        flag: "🇫🇷",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Bonjour, je m’appelle ${name}. 🙂`,
      },
      {
        flag: "🇩🇪",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Hallo, ich heiße ${name}. 🙂`,
      },
      {
        flag: "🇵🇹",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Olá, o meu nome é ${name}. 🙂`,
      },
      {
        flag: "🇮🇩",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Halo, nama saya ${name}. 🙂`,
      },
      {
        flag: "🇹🇭",
        dir: "ltr",
        style: { fontFamily: '"Noto Sans Thai", Th Sarabun New, sans-serif' },
        text: `สวัสดี ฉันชื่อ ${name} 🙂`,
      },
      {
        flag: "🇻🇳",
        dir: "ltr",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        text: `Xin chào, tôi là ${name}. 🙂`,
      },
    ],
    [name]
  );

  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  const current = items[i];

  return (
    <div className={`mb-4 ${className}`}>
      <div className="inline-flex max-w-full items-center gap-3 border-2 border-black bg-white px-3 py-2 rounded-xl shadow-[6px_6px_0_#000]">
        {/* Flag badge replaces language code */}
        <span
          className="inline-flex h-6 min-w-8 items-center justify-center rounded-sm border-2 border-black bg-yellow-300 px-1 text-base leading-none"
          role="img"
          aria-label="language flag"
        >
          {current.flag}
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
      {/* language chips removed as requested */}
    </div>
  );
}
