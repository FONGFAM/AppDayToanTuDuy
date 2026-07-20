type Props = { onReplay: () => void; onMap: () => void };

export function CompleteScreen({ onReplay, onMap }: Props) {
  return (
    <main className="complete-screen">
      <section className="complete-card">
        <div className="stars">★ ★ ★</div>
        <span className="project-kicker">CHẶNG 1 · NGÔI NHÀ KỲ DIỆU</span>
        <h1>Hoàn thành!</h1>
        <p>Bé đã lấy đủ đũa, chọn đúng đũa dài và chia đều cho cả gia đình.</p>
        <div className="result-equation">
          <article><b>5</b><span>người</span></article><strong>×</strong><article><b>2</b><span>chiếc</span></article><strong>=</strong><article><b>10</b><span>chiếc đũa</span></article>
        </div>
        <div className="learned-words"><span>One</span><span>Two</span><span>Long</span><span>Short</span><span>Grandpa</span><span>Family</span></div>
        <div className="graduation-key">🗝️ <strong>Mảnh chìa khoá Tri thức đầu tiên</strong></div>
        <div className="complete-actions">
          <button className="button button-primary" type="button" onClick={onReplay}>Chơi lại</button>
          <button className="button button-secondary" type="button" onClick={onMap}>Về bản đồ</button>
        </div>
      </section>
    </main>
  );
}
