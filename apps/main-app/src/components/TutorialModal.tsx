import { motion } from "motion/react";
import { BouncyButton } from "./ui/BouncyButton";
import { X } from "lucide-react";

type Props = {
  lessonId: string;
  onStart: () => void;
  onClose?: () => void;
  replay?: boolean;
};

export function TutorialModal({ lessonId, onStart, onClose, replay = false }: Props) {
  const isMealShapes = lessonId === 'family-meal-shapes';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      <motion.section 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative bg-white w-full max-w-lg rounded-[2rem] border-4 border-slate-100 shadow-2xl p-6 md:p-8 flex flex-col gap-6"
      >
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute -top-4 -right-4 w-10 h-10 bg-white border-2 border-slate-200 text-slate-500 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            <X strokeWidth={3} />
          </button>
        )}

        {isMealShapes ? (
          <>
            <div className="text-center">
              <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs">Năm 1 · Chặng 1 · Bài 2</span>
              <h2 id="tutorial-title" className="text-3xl font-extrabold text-slate-800 mt-4 mb-2">Bữa cơm gia đình</h2>
              <p className="text-slate-600 font-medium">Dọn mâm cơm và chia đồ ăn, bát đũa cho cả nhà.</p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: '⭕', title: 'Tìm mâm tròn', desc: 'Kéo chiếc mâm tròn đặt lên bàn.' },
                { icon: '⬜', title: 'Chia đồ ăn', desc: 'Kéo đĩa tròn vào mâm tròn, đĩa vuông vào khay vuông.' },
                { icon: '🍲', title: 'Chia bát đũa', desc: 'Bát to cho bố, bát nhỏ cho con, lấy đũa cho ông bà.' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                  <div className="text-3xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">{step.icon}</div>
                  <div>
                    <strong className="block text-slate-800 text-lg">{step.title}</strong>
                    <span className="text-slate-500 text-sm font-medium">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 text-blue-800 font-bold p-4 rounded-2xl text-center flex items-center justify-center gap-2 border-2 border-blue-100" aria-label="Phép tính của màn chơi">
              <span>Hình dạng</span><b className="text-blue-400 mx-1">+</b><span>Kích thước</span><b className="text-blue-400 mx-1">+</b><span>Số lượng</span>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs">Năm 1 · Chặng 1 · Bài 3</span>
              <h2 id="tutorial-title" className="text-3xl font-extrabold text-slate-800 mt-4 mb-2">Đôi đũa của ông</h2>
              <p className="text-slate-600 font-medium">Gia đình có 5 người. Mỗi người cần 1 đôi đũa.</p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: '↕', title: 'Di chuyển', desc: 'Dùng phím hoặc nút mũi tên.' },
                { icon: '🥢', title: 'Đếm & so sánh', desc: 'Lấy đủ 10 chiếc đũa ở ống đũa.' },
                { icon: '👨‍👩‍👧‍👦', title: 'Mang về & chia đũa', desc: 'Ngồi xuống bàn, mỗi người nhận đúng 2 chiếc.' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
                  <div className="text-3xl bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">{step.icon}</div>
                  <div>
                    <strong className="block text-slate-800 text-lg">{step.title}</strong>
                    <span className="text-slate-500 text-sm font-medium">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 text-accent font-bold p-4 rounded-2xl text-center flex items-center justify-center gap-2 border-2 border-accent/20" aria-label="Phép tính của màn chơi">
              <span>5 người</span><b className="text-accent/50 mx-1">×</b><span>2 chiếc</span><b className="text-accent/50 mx-1">=</b><span>10 chiếc</span>
            </div>
          </>
        )}
        
        <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-wide">Màn hình hiện tiếng Việt · Loa phát từ đơn tiếng Anh</p>

        <div className="flex justify-center w-full mt-2">
          <BouncyButton color="primary" size="lg" onClick={onStart} className="w-full">
            {replay ? 'Tiếp tục chơi' : 'Vào Chơi Ngay'}
          </BouncyButton>
        </div>
      </motion.section>
    </div>
  );
}
