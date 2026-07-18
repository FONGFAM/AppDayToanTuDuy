type Props = { onChoose: (choice: 'long' | 'short') => void };

export function ComparisonModal({ onChoose }: Props) {
  return (
    <div className="modal-backdrop comparison-backdrop" role="dialog" aria-modal="true" aria-label="Chọn đôi đũa dài">
      <section className="comparison-card">
        <span className="project-kicker">THỬ THÁCH SO SÁNH</span>
        <h2>Chọn đôi đũa dài cho ông</h2>
        <p>Chạm vào đôi đũa đúng. Phụ đề bằng tiếng Việt, giọng đọc bằng tiếng Anh.</p>
        <div className="chopstick-choice-row">
          <button type="button" onClick={() => onChoose('short')}>
            <span className="sticks short-sticks"><i /><i /></span>
            <strong>Ngắn</strong><small>Short</small>
          </button>
          <button type="button" onClick={() => onChoose('long')}>
            <span className="sticks long-sticks"><i /><i /></span>
            <strong>Dài</strong><small>Long</small>
          </button>
        </div>
      </section>
    </div>
  );
}
