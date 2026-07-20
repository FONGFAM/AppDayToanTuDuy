export type Avatar = 'boy' | 'girl';

type Props = { value: Avatar; onChange: (avatar: Avatar) => void; onContinue: () => void; onBack: () => void };

export function AvatarScreen({ value, onChange, onContinue, onBack }: Props) {
  return (
    <main className="setup-screen">
      <section className="setup-card">
        <button className="back-link" type="button" onClick={onBack}>← Quay lại</button>
        <span className="project-kicker">NHÂN VẬT ĐỒNG HÀNH</span>
        <h1>Chọn người bạn sẽ lớn lên cùng bé</h1>
        <p>Mỗi bài học là một chương trong hành trình trưởng thành.</p>
        <div className="avatar-grid">
          <button className={`avatar-card ${value === 'boy' ? 'selected' : ''}`} type="button" onClick={() => onChange('boy')}>
            <div className="avatar-stage"><img src="assets/characters/player-boy.png" alt="Bé trai" /></div>
            <strong>Bé Nam</strong><span>Hiếu kỳ · năng động</span>
          </button>
          <button className={`avatar-card ${value === 'girl' ? 'selected' : ''}`} type="button" onClick={() => onChange('girl')}>
            <div className="avatar-stage"><img src="assets/characters/player-girl.png" alt="Bé gái" /></div>
            <strong>Bé An</strong><span>Vui vẻ · sáng tạo</span>
          </button>
        </div>
        <button className="button button-primary button-large" type="button" onClick={onContinue}>Mở Chuyện Của Bé</button>
      </section>
    </main>
  );
}
