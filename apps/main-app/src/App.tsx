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

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [avatar, setAvatar] = useState<Avatar>('boy');
  const [activeLessonId, setActiveLessonId] = useState<string>('family-meal-shapes');
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialReplay, setTutorialReplay] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [subtitle, setSubtitle] = useState<Subtitle | null>(null);
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [action, setAction] = useState<ActionContext>({ label: 'THAO TÁC', enabled: false, hint: 'Đi đến gần đồ vật' });

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
    <main className="game-shell">
      <PhaserCanvas avatar={avatar} lessonId={activeLessonId} />

      <header className="game-topbar">
        <div className="objective-card">
          <span className="objective-label">
            {isMealShapes ? 'BÀI 2 · BƯA CƠM GIA ĐÌNH' : 'BÀI 3 · ĐÔI ĐŨA CỦA ÔNG'}
          </span>
          <strong>
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
        <div className="counter-row">
          {isMealShapes ? (
            <>
              <div className="counter-card">
                <span>⭕</span>
                <b>{progress.collected}/2</b>
                <small>hình tròn</small>
              </div>
              <div className="counter-card">
                <span>⬜</span>
                <b>{progress.pairs}/2</b>
                <small>hình vuông</small>
              </div>
            </>
          ) : (
            <>
              <div className="counter-card">
                <span>🥢</span>
                <b>{progress.collected}/{progress.target}</b>
                <small>chiếc</small>
              </div>
              <div className="counter-card">
                <span>◫</span>
                <b>{progress.pairs}/5</b>
                <small>đôi</small>
              </div>
            </>
          )}
        </div>
        <div className="top-actions">
          <button type="button" className="icon-button" onClick={() => setSoundEnabled((value) => !value)} aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}>{soundEnabled ? '🔊' : '🔇'}</button>
          <button type="button" className="icon-button" onClick={showHelp} aria-label="Xem hướng dẫn">?</button>
          <button type="button" className="icon-button" onClick={toggleFullscreen} aria-label="Toàn màn hình">⛶</button>
          <button type="button" className="icon-button" onClick={openMap} aria-label="Về bản đồ">🗺</button>
        </div>
      </header>

      <div className="controls-layer">
        <DPad />
        <div className="action-wrap">
          <span className="action-hint">{action.hint}</span>
          <button type="button" className="action-button" disabled={!action.enabled} onClick={() => gameBus.emit('action')}>{action.label}</button>
        </div>
      </div>

      {subtitle && <div className={`subtitle subtitle-${subtitle.tone}`} role="status" aria-live="polite">{subtitle.text}</div>}
      {showTutorial && <TutorialModal lessonId={activeLessonId} replay={tutorialReplay} onStart={tutorialReplay ? closeHelp : startLevel} onClose={tutorialReplay ? closeHelp : undefined} />}
      <div className="rotate-device"><span>↻</span><strong>Hãy xoay ngang màn hình</strong></div>
    </main>
  );
}
