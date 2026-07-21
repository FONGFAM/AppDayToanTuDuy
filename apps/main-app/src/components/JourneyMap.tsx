import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Star, PlayCircle } from 'lucide-react';
import { curriculum } from '../data/curriculum';
import type { Avatar } from './AvatarScreen';
import { cn } from '../utils/cn';
import { BouncyButton } from './ui/BouncyButton';

type Props = { avatar: Avatar; onPlay: (lessonId: string) => void; onHome: () => void };

export function JourneyMap({ avatar, onPlay, onHome }: Props) {
  const [yearId, setYearId] = useState<1 | 2 | 3>(1);
  const year = useMemo(() => curriculum.find((item) => item.id === yearId)!, [yearId]);
  const avatarImage = avatar === 'boy' ? 'assets/characters/betrai.webp' : 'assets/characters/player-girl.png';

  const bgColors = ["bg-primary", "bg-secondary", "bg-success", "bg-accent", "bg-teal"];

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onHome}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft size={24} strokeWidth={3} />
          </button>
          <div>
            <span className="text-xs font-bold text-accent tracking-[0.12em]">Storytelling · Xoắn Ốc</span>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-[0.05em]">Chuyện Của Bé</h1>
          </div>
        </div>
        <img className="w-12 h-12 rounded-full border-2 border-slate-200 bg-slate-100 object-cover" src={avatarImage} alt="Avatar" />
      </header>

      {/* Year Tabs */}
      <nav className="flex justify-center gap-2 p-4 bg-white/50 backdrop-blur-md sticky top-[76px] z-10 border-b border-slate-200">
        {curriculum.map((item) => (
          <BouncyButton
            key={item.id}
            color={item.id === yearId ? "primary" : "secondary"}
            size="sm"
            onClick={() => setYearId(item.id)}
            className={cn(
              "flex flex-col items-center !px-6 !py-2",
              item.id !== yearId && "!bg-white !text-slate-500 hover:!bg-slate-50 !shadow-sm !border-2 !border-slate-200"
            )}
          >
            <small className="text-[10px] font-bold opacity-80">Năm {item.id}</small>
            <strong className="text-sm">{item.title}</strong>
          </BouncyButton>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={yearId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                {year.className}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-800">{year.title}</h2>
              <p className="text-slate-500 mt-2 font-medium">{year.subtitle}</p>
            </div>

            <div className="flex flex-col gap-12">
              {year.stages.map((stage, stageIndex) => (
                <div key={stage.id} className="relative">
                  {/* Stage Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm",
                      bgColors[stageIndex % bgColors.length], "text-white"
                    )}>
                      {stage.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{stage.title}</h3>
                      <p className="text-slate-500 text-sm font-medium">{stage.theme}</p>
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stage.lessons.map((lesson, lessonIndex) => {
                      const playable = Boolean(lesson.playable);
                      const colorClass = bgColors[(stageIndex + lessonIndex) % bgColors.length];
                      
                      return (
                        <motion.button
                          key={lesson.id}
                          whileHover={playable ? { scale: 1.03 } : {}}
                          whileTap={playable ? { scale: 0.97 } : {}}
                          onClick={playable ? () => onPlay(lesson.id) : undefined}
                          className={cn(
                            "relative flex flex-col items-start p-6 rounded-[2rem] border-4 text-left transition-all duration-300",
                            playable 
                              ? `bg-white border-slate-200 hover:border-slate-300 shadow-sm cursor-pointer` 
                              : "bg-slate-100 border-slate-200 opacity-80 cursor-not-allowed grayscale-[0.5]"
                          )}
                        >
                          {/* Badge / Stars */}
                          <div className="flex justify-between items-center w-full mb-4">
                            <span className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm",
                              playable ? colorClass : "bg-slate-400"
                            )}>
                              {lessonIndex + 1}
                            </span>
                            {playable ? (
                              <div className="flex gap-1">
                                <Star size={18} className="fill-amber-400 text-amber-400" />
                                <Star size={18} className="fill-slate-200 text-slate-200" />
                                <Star size={18} className="fill-slate-200 text-slate-200" />
                              </div>
                            ) : (
                              <div className="p-2 bg-slate-200 rounded-full text-slate-500">
                                <Lock size={16} strokeWidth={3} />
                              </div>
                            )}
                          </div>

                          <strong className="text-lg font-bold text-slate-800 leading-tight mb-1">{lesson.title}</strong>
                          <small className="text-xs font-bold text-slate-500 tracking-wider mb-3">{lesson.math}</small>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{lesson.mission}</p>
                          
                          <div className="mt-auto pt-4 border-t border-slate-100 w-full flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {lesson.english.slice(0, 2).map((word) => (
                                <span key={word} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                                  {word}
                                </span>
                              ))}
                            </div>
                            {playable && <PlayCircle size={28} className={cn("text-white p-1 rounded-full shadow-sm", colorClass)} />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
