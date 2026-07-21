import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { BouncyButton } from "./ui/BouncyButton";
import { cn } from "../utils/cn";

export type Avatar = 'boy' | 'girl';

type Props = { value: Avatar; onChange: (avatar: Avatar) => void; onContinue: () => void; onBack: () => void };

export function AvatarScreen({ value, onChange, onContinue, onBack }: Props) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-6 font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-xl border-4 border-white p-8 md:p-12 relative"
      >
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-3 bg-white hover:bg-slate-50 text-slate-600 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <ArrowLeft size={24} strokeWidth={3} />
        </button>

        <div className="text-center mt-12 mb-10">
          <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-full tracking-wider text-sm">
            Nhân vật đồng hành
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mt-6 drop-shadow-sm">
            Chọn người bạn sẽ <br className="hidden md:block"/> lớn lên cùng bé
          </h1>
          <p className="text-lg text-slate-600 mt-4 font-medium">Mỗi bài học là một chương trong hành trình trưởng thành.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
          {/* Boy Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange('boy')}
            className={cn(
              "group relative flex flex-col items-center p-8 rounded-[2rem] border-4 transition-all duration-300",
              value === 'boy' 
                ? "border-primary bg-primary/5 shadow-[0_8px_0_0_#FF8A65]" 
                : "border-slate-200 bg-white hover:border-primary/50 shadow-sm"
            )}
          >
            {value === 'boy' && (
              <motion.div layoutId="outline" className="absolute inset-0 rounded-[2rem] ring-4 ring-primary ring-offset-4 pointer-events-none" />
            )}
            <div className="w-40 h-40 mb-6 bg-blue-100 rounded-full overflow-hidden border-4 border-white shadow-inner flex items-end justify-center pt-4">
              <img src="assets/characters/betrai.webp" alt="Bé trai" className="w-32 object-contain group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
            <strong className="text-2xl font-extrabold text-slate-800 mb-2">Bé Nam</strong>
            <span className="text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">Hiếu kỳ · năng động</span>
          </motion.button>

          {/* Girl Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange('girl')}
            className={cn(
              "group relative flex flex-col items-center p-8 rounded-[2rem] border-4 transition-all duration-300",
              value === 'girl' 
                ? "border-accent bg-accent/5 shadow-[0_8px_0_0_#A98BFF]" 
                : "border-slate-200 bg-white hover:border-accent/50 shadow-sm"
            )}
          >
            {value === 'girl' && (
              <motion.div layoutId="outline" className="absolute inset-0 rounded-[2rem] ring-4 ring-accent ring-offset-4 pointer-events-none" />
            )}
            <div className="w-40 h-40 mb-6 bg-pink-100 rounded-full overflow-hidden border-4 border-white shadow-inner flex items-end justify-center pt-4">
              <img src="assets/characters/player-girl.png" alt="Bé gái" className="w-32 object-contain group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
            <strong className="text-2xl font-extrabold text-slate-800 mb-2">Bé An</strong>
            <span className="text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">Vui vẻ · sáng tạo</span>
          </motion.button>
        </div>

        <div className="flex justify-center">
          <BouncyButton color="accent" size="xl" onClick={onContinue}>
            Mở Chuyện Của Bé
          </BouncyButton>
        </div>
      </motion.div>
    </div>
  );
}
