type Handler<T = unknown> = (payload: T) => void;

class GameEventBus {
  private readonly target = new EventTarget();

  emit<T>(name: string, payload?: T): void {
    this.target.dispatchEvent(new CustomEvent(name, { detail: payload }));
  }

  on<T>(name: string, handler: Handler<T>): () => void {
    const listener = (event: Event) => handler((event as CustomEvent<T>).detail);
    this.target.addEventListener(name, listener);
    return () => this.target.removeEventListener(name, listener);
  }
}

export const gameBus = new GameEventBus();
