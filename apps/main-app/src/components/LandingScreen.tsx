import { motion } from "motion/react";
import { Cloud, Rainbow, SunSVG } from "./ui/SVGs";
import { BouncyButton } from "./ui/BouncyButton";
import { Play, Map } from "lucide-react";

type Props = { onStart: () => void; onJourney: () => void };

export function LandingScreen({ onStart, onJourney }: Props) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-300 overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Background SVGs */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 w-32 h-32"
      >
        <SunSVG className="w-full h-full drop-shadow-md" />
      </motion.div>

      <motion.div 
        animate={{ x: [0, 20, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-48 opacity-80"
      >
        <Cloud className="w-full h-full" />
      </motion.div>

      <motion.div 
        animate={{ x: [0, -20, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-40 opacity-70"
      >
        <Cloud className="w-full h-full" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none">
        <Rainbow className="w-full max-w-2xl mx-auto" />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10 bg-white/70 backdrop-blur-md border-4 border-white shadow-xl rounded-[3rem] p-10 max-w-3xl text-center flex flex-col items-center gap-6"
      >
        <div className="bg-primary text-white font-bold py-2 px-4 rounded-full text-sm uppercase tracking-widest shadow-md">
          Toán & AI Mầm Non · 3–6 Tuổi
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 drop-shadow-sm leading-tight">
          Bản Đồ <span className="text-accent">Trưởng Thành</span>
        </h1>
        
        <p className="text-xl text-slate-700 font-medium max-w-lg">
          Một hành trình học Toán và từ vựng tiếng Anh qua gia đình, làng quê, 
          thành phố và truyện dân gian Việt Nam.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <span className="bg-white/80 text-teal-700 px-4 py-2 rounded-2xl font-bold shadow-sm">📖 Kể chuyện</span>
          <span className="bg-white/80 text-accent px-4 py-2 rounded-2xl font-bold shadow-sm">🌀 Xoắn ốc</span>
          <span className="bg-white/80 text-primary-shadow px-4 py-2 rounded-2xl font-bold shadow-sm">🇻🇳 Văn hoá Việt</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <BouncyButton color="primary" size="xl" onClick={onStart} className="flex items-center justify-center gap-2 w-full sm:w-auto">
            <Play fill="currentColor" size={24} /> Bắt Đầu Ngay
          </BouncyButton>
          <BouncyButton color="success" size="xl" onClick={onJourney} className="flex items-center justify-center gap-2 w-full sm:w-auto">
            <Map size={24} /> Lộ Trình
          </BouncyButton>
        </div>
      </motion.div>
    </div>
  );
}
