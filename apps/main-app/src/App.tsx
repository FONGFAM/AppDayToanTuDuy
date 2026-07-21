import { useEffect, useState } from 'react';
import { AvatarScreen, type Avatar } from './components/AvatarScreen';
import { CompleteScreen } from './components/CompleteScreen';
import { DPad } from './components/DPad';
import { JourneyMap } from './components/JourneyMap';
import { LandingScreen } from './components/LandingScreen';
import { PhaserCanvas } from './components/PhaserCanvas';
import { TutorialModal } from './components/TutorialModal';
import { gameBus } from '@app/core';
import { playChime, speakEnglish } from './utils/audio';

type Screen = 'home' | 'avatar' | 'map' | 'game' | 'complete';
type Subtitle = { text: string; tone: 'guide' | 'learn' | 'try' | 'success' };
type Progress = { collected: number; pairs: number; target: number; phase: 'collect' | 'return' | 'serve' };
type ActionContext = { label: string; enabled: boolean; hint: string };
type LearningWord = { vietnamese: string; english: string; kind: 'tap' | 'success' | 'complete' };

const defaultProgress: Progress = { collected: 0, pairs: 0, target: 10, phase: 'collect' };

const getScreenFromHash = (): Screen => {
  const hash = window.location.hash.replace('#', '') as Screen;
  return ['home', 'avatar', 'map', 'game', 'complete'].includes(hash) ? hash : 'home';
};

export default function App() {
  const [screen, setScreenState] = useState<Screen>(getScreenFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setScreenState(getScreenFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setScreen = (newScreen: Screen) => {
    window.location.hash = newScreen;
  };
  const [avatar, setAvatar] = useState<Avatar>('boy');
  const [activeLessonId, setActiveLessonId] = useState<string>('family-meal-shapes');
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialReplay, setTutorialReplay] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [subtitle, setSubtitle] = useState<Subtitle | null>(null);
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [action, setAction] = useState<ActionContext>({ label: 'THAO TÁC', enabled: false, hint: 'Đi đến gần đồ vật' });
  const [isCutscene, setIsCutscene] = useState(false);

  useEffect(() => {
    const unsubscribe = [
      gameBus.on<Progress>('progress', setProgress),
      gameBus.on<ActionContext>('action-context', setAction),
      gameBus.on<Subtitle>('subtitle', (value) => {
        setSubtitle(value);
        window.setTimeout(() => setSubtitle((current) => current === value ? null : current), value.tone === 'success' ? 2800 : 2100);
      }),
      gameBus.on<LearningWord>('learning-word', ({ vietnamese, english, kind }) => {
        setSubtitle({ text: vietnamese, tone: kind === 'complete' || kind === 'success' ? 'success' : 'learn' });
        speakEnglish(english, soundEnabled);
        playChime(kind, soundEnabled);
      }),
      gameBus.on<boolean>('cutscene', setIsCutscene),
      gameBus.on('level-complete', () => {
        setScreen('complete');
      }),
    ];
    return () => unsubscribe.forEach((off) => off());
  }, [soundEnabled]);

  const openMap = () => setScreen('map');

  const startGame = (lessonId: string) => {
    localStorage.setItem('growth-avatar', avatar);
    setActiveLessonId(lessonId);
    setProgress(defaultProgress);
    setScreen('game');
    setTutorialReplay(false);
    setShowTutorial(true);
  };

  const startLevel = () => {
    setShowTutorial(false);
    gameBus.emit('start-level');
  };

  const showHelp = () => {
    gameBus.emit('pause-level');
    setTutorialReplay(true);
    setShowTutorial(true);
  };

  const closeHelp = () => {
    setShowTutorial(false);
    gameBus.emit('resume-level');
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      // Fullscreen can be blocked inside some embedded browsers.
    }
  };

  if (screen === 'home') {
    return (
      <>
        <LandingScreen onStart={() => setScreen('avatar')} onJourney={openMap} />
        <div className="rotate-device"><span>↻</span><strong>Hãy xoay ngang màn hình</strong></div>
      </>
    );
  }

  if (screen === 'avatar') {
    return <AvatarScreen value={avatar} onChange={setAvatar} onContinue={openMap} onBack={() => setScreen('home')} />;
  }

  if (screen === 'map') {
    return <JourneyMap avatar={avatar} onPlay={startGame} onHome={() => setScreen('home')} />;
  }

  if (screen === 'complete') {
    return <CompleteScreen onReplay={() => startGame(activeLessonId)} onMap={openMap} />;
  }

  const isMealShapes = activeLessonId === 'family-meal-shapes';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 font-sans select-none">
      <PhaserCanvas avatar={avatar} lessonId={activeLessonId} />

      {/* Top Bar */}
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start pointer-events-none z-10">
        {/* Chỉ hiện tiêu đề khi KHÔNG phải cutscene */}
        <div className={`bg-white/90 backdrop-blur-md rounded-2xl border-4 border-slate-200 shadow-sm p-4 max-w-sm pointer-events-auto transition-opacity duration-500 ${isCutscene ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            {isMealShapes ? 'BÀI 2 · BƯA CƠM GIA ĐÌNH' : 'BÀI 3 · ĐÔI ĐŨA CỦA ÔNG'}
          </span>
          <strong className="text-lg font-bold text-slate-800 leading-tight">
            {isMealShapes ? (
              progress.phase === 'collect'
                ? 'Tìm và kéo mâm tròn đặt lên bàn'
                : progress.phase === 'return'
                  ? 'Kéo đĩa tròn vào mâm tròn, đĩa vuông vào khay vuông'
                  : progress.phase === 'serve'
                    ? 'Kéo Bát To cho Bố, Bát Nhỏ cho Bé'
                    : 'Chạm ống đũa lấy đũa đưa ông bà'
            ) : (
              progress.phase === 'collect'
                ? 'Đi lấy đủ 10 chiếc đũa'
                : progress.phase === 'return'
                  ? 'Mang đũa về bàn và ngồi xuống'
                  : 'Chia mỗi người 1 đôi đũa'
            )}
          </strong>
        </div>

        <div className="flex flex-col md:flex-row gap-3 pointer-events-auto">
          {/* Chỉ hiện Counter khi KHÔNG phải cutscene */}
          <div className={`flex gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl border-4 border-slate-200 shadow-sm transition-opacity duration-500 ${isCutscene ? 'opacity-0 hidden md:flex' : 'opacity-100'}`}>
            {isMealShapes ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-xl">
                  <span className="text-xl">⭕</span>
                  <div className="flex flex-col leading-tight"><b className="text-slate-800 text-lg">{progress.collected}/2</b><small className="text-[10px] text-slate-500 font-bold tracking-wide">Hình Tròn</small></div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-xl">
                  <span className="text-xl">⬜</span>
                  <div className="flex flex-col leading-tight"><b className="text-slate-800 text-lg">{progress.pairs}/2</b><small className="text-[10px] text-slate-500 font-bold tracking-wide">Hình Vuông</small></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-xl">
                  <span className="text-xl">🥢</span>
                  <div className="flex flex-col leading-tight"><b className="text-slate-800 text-lg">{progress.collected}/{progress.target}</b><small className="text-[10px] text-slate-500 font-bold tracking-wide">Chiếc</small></div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-xl">
                  <span className="text-xl">◫</span>
                  <div className="flex flex-col leading-tight"><b className="text-slate-800 text-lg">{progress.pairs}/5</b><small className="text-[10px] text-slate-500 font-bold tracking-wide">Đôi</small></div>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2 items-start justify-end">
            <div className={`flex gap-2 transition-opacity duration-500 ${isCutscene ? 'opacity-0 hidden md:flex' : 'opacity-100'}`}>
              <button type="button" className="w-12 h-12 bg-white/90 border-4 border-slate-200 rounded-full flex items-center justify-center text-xl hover:bg-slate-50 shadow-sm active:scale-95 transition-all" onClick={() => setSoundEnabled((value) => !value)} aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}>{soundEnabled ? '🔊' : '🔇'}</button>
              <button type="button" className="w-12 h-12 bg-white/90 border-4 border-slate-200 rounded-full flex items-center justify-center text-xl hover:bg-slate-50 shadow-sm active:scale-95 transition-all font-bold text-slate-500" onClick={showHelp} aria-label="Xem hướng dẫn">?</button>
              <button type="button" className="w-12 h-12 bg-white/90 border-4 border-slate-200 rounded-full flex items-center justify-center text-xl hover:bg-slate-50 shadow-sm active:scale-95 transition-all" onClick={toggleFullscreen} aria-label="Toàn màn hình">⛶</button>
            </div>
            {/* Nút Menu luôn hiện */}
            <button type="button" className="w-12 h-12 bg-white/90 border-4 border-slate-200 rounded-full flex items-center justify-center text-xl hover:bg-slate-50 shadow-sm active:scale-95 transition-all" onClick={openMap} aria-label="Về bản đồ">🗺</button>
          </div>
        </div>
      </header>

      {/* Controls
      <div className={`absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none z-10 transition-opacity duration-500 ${isCutscene ? 'opacity-0 hidden md:flex' : 'opacity-100'}`}>
        <DPad />
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <span className="bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-bold">{action.hint}</span>
          <button 
            type="button" 
            disabled={!action.enabled} 
            onClick={() => gameBus.emit('action')}
            className={`px-8 py-4 rounded-3xl font-bold text-xl tracking-wider transition-all shadow-bouncy active:shadow-bouncy-pressed ${
              action.enabled ? 'bg-primary text-white border-primary shadow-[0_6px_0_0_#C85230]' : 'bg-slate-300 text-slate-500 shadow-[0_6px_0_0_#94a3b8]'
            }`}
          >
            {action.label}
          </button>
        </div>
      </div> */}

      {/* Subtitle */}
      {subtitle && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className={`px-6 py-3 rounded-2xl text-xl font-bold text-white shadow-lg border-2 backdrop-blur-md ${subtitle.tone === 'success' ? 'bg-success/90 border-success shadow-success/30' :
              subtitle.tone === 'try' ? 'bg-amber-500/90 border-amber-500 shadow-amber-500/30' :
                subtitle.tone === 'learn' ? 'bg-accent/90 border-accent shadow-accent/30' :
                  'bg-slate-800/90 border-slate-700'
            }`} role="status" aria-live="polite">
            {subtitle.text}
          </div>
        </div>
      )}

      {showTutorial && <TutorialModal lessonId={activeLessonId} replay={tutorialReplay} onStart={tutorialReplay ? closeHelp : startLevel} onClose={tutorialReplay ? closeHelp : undefined} />}

      {/* Rotate Device Warning (Mobile Portrait) */}
      <div className="portrait:flex landscape:hidden fixed inset-0 z-50 bg-slate-900 text-white flex-col items-center justify-center p-8 text-center font-sans">
        <span className="text-6xl mb-4 animate-spin-slow">↻</span>
        <strong className="text-2xl font-bold">Hãy xoay ngang màn hình</strong>
        <p className="text-slate-400 mt-2">Trải nghiệm game tốt nhất khi ở chế độ toàn màn hình ngang.</p>
      </div>
    </div>
  );
}
