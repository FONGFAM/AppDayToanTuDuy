type Props = { onStart: () => void; onJourney: () => void };

export function LandingScreen({ onStart, onJourney }: Props) {
  return (
    <main className="landing-screen">
      <div className="paper-cloud cloud-a" />
      <div className="paper-cloud cloud-b" />
      <section className="landing-copy">
        <span className="project-kicker">MATH & AI MẦM NON · 3–6 TUỔI</span>
        <h1>Bản Đồ<br /><em>Trưởng Thành</em></h1>
        <p className="landing-lead">
          Một hành trình học Toán và từ vựng tiếng Anh qua gia đình, làng quê,
          thành phố và truyện dân gian Việt Nam.
        </p>
        <div className="landing-pills">
          <span>📖 Kể chuyện nhập vai</span>
          <span>🌀 Giáo trình xoắn ốc</span>
          <span>🇻🇳 Văn hoá Việt</span>
        </div>
        <div className="landing-actions">
          <button className="button button-primary button-large" type="button" onClick={onStart}>Bắt đầu hành trình</button>
          <button className="button button-secondary" type="button" onClick={onJourney}>Xem bản đồ học tập</button>
        </div>
      </section>

      <section className="landing-visual" aria-label="Gia đình hoạt hình trong gian bếp">
        <div className="sun-disc" />
        <img className="landing-kitchen" src="assets/kitchen.jpg" alt="Gian bếp Việt ấm cúng" />
        <img className="hero-person hero-grandpa" src="assets/characters/grandpa.png" alt="Ông đang dùng bữa" />
        <img className="hero-person hero-grandma" src="assets/characters/gandma.webp" alt="Bà đang trò chuyện" />
        <img className="hero-person hero-mom" src="assets/characters/mom.png" alt="Mẹ đang dọn bàn" />
        <img className="hero-person hero-sister" src="assets/characters/sister.png" alt="Em gái đang vui chơi" />
        <img className="hero-person hero-boy" src="assets/characters/player-boy.png" alt="Bé trai đồng hành" />
        <div className="speech-bubble bubble-one">One · Two</div>
        <div className="speech-bubble bubble-two">Dài hay ngắn?</div>
      </section>
    </main>
  );
}
