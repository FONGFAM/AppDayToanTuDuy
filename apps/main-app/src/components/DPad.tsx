import { gameBus } from '@app/core';
import { cn } from '../utils/cn';

type Direction = 'up' | 'down' | 'left' | 'right';

function DirectionButton({ direction, symbol, label, className }: { direction: Direction; symbol: string; label: string, className?: string }) {
  const start = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    gameBus.emit('move-start', direction);
  };
  const stop = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    gameBus.emit('move-stop', direction);
  };

  return (
    <button
      type="button"
      className={cn(
        "bg-white/90 border-4 border-slate-200 shadow-bouncy active:shadow-bouncy-pressed text-slate-500 font-bold text-2xl flex items-center justify-center transition-all select-none backdrop-blur-sm",
        className
      )}
      aria-label={label}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={(event) => {
        if (event.buttons) stop(event);
      }}
    >
      <span aria-hidden="true">{symbol}</span>
    </button>
  );
}

export function DPad() {
  return (
    <div className="relative w-48 h-48 pointer-events-auto" aria-label="Các nút di chuyển">
      <DirectionButton direction="up" symbol="▲" label="Đi lên" className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-t-2xl rounded-b-md" />
      <DirectionButton direction="left" symbol="◀" label="Đi sang trái" className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 rounded-l-2xl rounded-r-md" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-200/50 rounded-lg pointer-events-none" aria-hidden="true" />
      <DirectionButton direction="right" symbol="▶" label="Đi sang phải" className="absolute top-1/2 right-0 -translate-y-1/2 w-16 h-16 rounded-r-2xl rounded-l-md" />
      <DirectionButton direction="down" symbol="▼" label="Đi xuống" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-b-2xl rounded-t-md" />
    </div>
  );
}
