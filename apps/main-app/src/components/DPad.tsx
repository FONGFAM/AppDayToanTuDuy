import { gameBus } from '@app/core';

type Direction = 'up' | 'down' | 'left' | 'right';

function DirectionButton({ direction, symbol, label }: { direction: Direction; symbol: string; label: string }) {
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
      className={`dpad-button dpad-${direction}`}
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
    <div className="dpad" aria-label="Các nút di chuyển">
      <DirectionButton direction="up" symbol="▲" label="Đi lên" />
      <DirectionButton direction="left" symbol="◀" label="Đi sang trái" />
      <div className="dpad-center" aria-hidden="true" />
      <DirectionButton direction="right" symbol="▶" label="Đi sang phải" />
      <DirectionButton direction="down" symbol="▼" label="Đi xuống" />
    </div>
  );
}
