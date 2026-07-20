import { useEffect } from "react";
import { motion } from "motion/react";
import { BouncyButton } from "./ui/BouncyButton";
import confetti from "canvas-confetti";
import { Star, RotateCcw, Map as MapIcon, Key } from "lucide-react";

type Props = { onReplay: () => void; onMap: () => void };

export function CompleteScreen({ onReplay, onMap }: Props) {
  useEffect(() => {
    // Bắn pháo hoa khi component mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <motion.section 
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
        className="relative bg-white w-full max-w-md rounded-[2.5rem] border-[6px] border-amber-300 shadow-2xl p-8 flex flex-col items-center text-center gap-4"
      >
        <div className="flex justify-center gap-2 -mt-14 mb-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}><Star size={56} className="fill-amber-400 text-amber-500 drop-shadow-md -rotate-12" /></motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, type: 'spring' }}><Star size={72} className="fill-amber-400 text-amber-500 drop-shadow-md -translate-y-4" /></motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, type: 'spring' }}><Star size={56} className="fill-amber-400 text-amber-500 drop-shadow-md rotate-12" /></motion.div>
        </div>

        <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs shadow-sm">Chặng 1 · Ngôi nhà kỳ diệu</span>
        
        <h1 className="text-4xl font-extrabold text-amber-500 uppercase drop-shadow-sm my-2">Xuất Sắc!</h1>
        
        <p className="text-slate-600 font-medium text-lg leading-snug">Bé đã lấy đủ đũa, chọn đúng đũa dài và chia đều cho cả gia đình.</p>
        
        <div className="bg-slate-50 w-full p-4 rounded-2xl border-2 border-slate-100 flex items-center justify-center gap-3 text-2xl font-bold my-2">
          <div className="flex flex-col items-center"><span className="text-primary text-3xl">5</span><span className="text-[10px] text-slate-500 uppercase">người</span></div>
          <span className="text-slate-300">×</span>
          <div className="flex flex-col items-center"><span className="text-accent text-3xl">2</span><span className="text-[10px] text-slate-500 uppercase">chiếc</span></div>
          <span className="text-slate-300">=</span>
          <div className="flex flex-col items-center"><span className="text-success text-3xl">10</span><span className="text-[10px] text-slate-500 uppercase">đũa</span></div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["One", "Two", "Long", "Short", "Grandpa", "Family"].map((word) => (
            <span key={word} className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-xl text-sm border-2 border-blue-100">{word}</span>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-3 rounded-2xl w-full justify-center border-2 border-amber-200/50 mt-2 font-bold shadow-inner">
          <Key className="text-amber-500" />
          Mảnh chìa khoá Tri thức đầu tiên
        </div>

        <div className="flex w-full gap-3 mt-4">
          <BouncyButton color="secondary" size="md" onClick={onReplay} className="flex-1 flex items-center justify-center gap-2 text-sm">
            <RotateCcw size={20} /> Chơi lại
          </BouncyButton>
          <BouncyButton color="primary" size="md" onClick={onMap} className="flex-1 flex items-center justify-center gap-2 text-sm">
            <MapIcon size={20} /> Bản đồ
          </BouncyButton>
        </div>
      </motion.section>
    </div>
  );
}
