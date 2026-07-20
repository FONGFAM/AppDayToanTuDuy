type Props = {
  lessonId: string;
  onStart: () => void;
  onClose?: () => void;
  replay?: boolean;
};

export function TutorialModal({ lessonId, onStart, onClose, replay = false }: Props) {
  const isMealShapes = lessonId === 'family-meal-shapes';

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      <section className="tutorial-card">
        {isMealShapes ? (
          <>
            <div className="tutorial-heading">
              <span className="project-kicker">NĂM 1 · CHẶNG 1 · BÀI 2</span>
              <h2 id="tutorial-title">Bữa cơm gia đình</h2>
              <p>Dọn mâm cơm và chia đồ ăn, bát đũa cho cả nhà.</p>
            </div>

            <div className="tutorial-steps">
              <article><span className="step-icon">⭕</span><strong>Tìm mâm tròn</strong><small>Kéo chiếc mâm tròn đặt lên bàn.</small></article>
              <article><span className="step-icon">⬜</span><strong>Chia đồ ăn</strong><small>Kéo đĩa tròn vào mâm tròn, đĩa vuông vào khay vuông.</small></article>
              <article><span className="step-icon">🍲</span><strong>Chia bát đũa</strong><small>Bát to cho bố, bát nhỏ cho con, lấy đũa cho ông bà.</small></article>
            </div>

            <div className="math-preview" aria-label="Phép tính của màn chơi">
              <span>Hình dạng</span><b>+</b><span>Kích thước</span><b>+</b><span>Số lượng</span>
            </div>
          </>
        ) : (
          <>
            <div className="tutorial-heading">
              <span className="project-kicker">NĂM 1 · CHẶNG 1 · BÀI 3</span>
              <h2 id="tutorial-title">Đôi đũa của ông</h2>
              <p>Gia đình có 5 người. Mỗi người cần 1 đôi đũa.</p>
            </div>

            <div className="tutorial-steps">
              <article><span className="step-icon">↕</span><strong>Di chuyển</strong><small>Dùng phím hoặc nút mũi tên.</small></article>
              <article><span className="step-icon">🥢</span><strong>Đếm & so sánh</strong><small>Lấy đủ 10 chiếc đũa ở ống đũa.</small></article>
              <article><span className="step-icon">👨‍👩‍👧‍👦</span><strong>Mang về & chia đũa</strong><small>Ngồi xuống bàn, mỗi người nhận đúng 2 chiếc.</small></article>
            </div>

            <div className="math-preview" aria-label="Phép tính của màn chơi">
              <span>5 người</span><b>×</b><span>2 chiếc</span><b>=</b><span>10 chiếc</span>
            </div>
          </>
        )}
        <p className="audio-note">Màn hình hiện tiếng Việt · Loa phát từ đơn tiếng Anh</p>

        <div className="modal-actions">
          {onClose && <button type="button" className="button button-secondary" onClick={onClose}>Đóng</button>}
          <button type="button" className="button button-primary" onClick={onStart}>{replay ? 'Tiếp tục' : 'Bắt đầu'}</button>
        </div>
      </section>
    </div>
  );
}
