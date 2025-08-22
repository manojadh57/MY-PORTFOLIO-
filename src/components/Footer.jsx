import { useEffect, useState } from "react";
import BatCatMark from "./BatCatMark";

export default function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ts = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  return (
    <footer className="sticky bottom-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-14 mb-2 h-1 bg-black/80" />
      </div>
      <div className="mx-auto max-w-6xl my-3 px-4 py-2 border-2 border-black bg-yellow-400 shadow-[6px_6px_0_#00000040] flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-sm font-bold">
          <BatCatMark size={22} />
          <span>© {new Date().getFullYear()} Manoj Adhikari</span>
        </div>
        <div className="font-mono text-sm">{ts}</div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-6">
        <p className="text-[12px] font-mono opacity-60">
          BatCat mark inspired by Mark Horn.
        </p>
      </div>
    </footer>
  );
}
