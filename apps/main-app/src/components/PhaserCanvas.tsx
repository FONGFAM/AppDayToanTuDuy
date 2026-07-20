import { useEffect, useRef } from 'react';
import type Phaser from 'phaser';
import type { Avatar } from './AvatarScreen';
import { createGame } from '../game/createGame';

type Props = { avatar: Avatar; lessonId: string };

export function PhaserCanvas({ avatar, lessonId }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!parentRef.current) return;
    // Destroy previous game instance if it exists
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
    gameRef.current = createGame(parentRef.current, avatar, lessonId);
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [avatar, lessonId]);

  return (
    <div className="flex-1 w-full h-full p-2 sm:p-4 bg-slate-900 overflow-hidden relative">
      <div 
        ref={parentRef} 
        aria-label="Màn chơi hoạt hình"
        className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-slate-700 shadow-2xl relative bg-black flex items-center justify-center [&>canvas]:max-w-full [&>canvas]:max-h-full [&>canvas]:object-contain"
      />
    </div>
  );
}
