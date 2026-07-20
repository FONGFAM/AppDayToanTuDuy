import { useMemo, useState } from 'react';
import { curriculum } from '../data/curriculum';
import type { Avatar } from './AvatarScreen';

type Props = { avatar: Avatar; onPlay: (lessonId: string) => void; onHome: () => void };

export function JourneyMap({ avatar, onPlay, onHome }: Props) {
  const [yearId, setYearId] = useState<1 | 2 | 3>(1);
  const year = useMemo(() => curriculum.find((item) => item.id === yearId)!, [yearId]);
  const avatarImage = avatar === 'boy' ? 'assets/characters/player-boy.png' : 'assets/characters/player-girl.png';

  return (
    <main className="journey-screen">
      <header className="journey-header">
        <button className="back-link" type="button" onClick={onHome}>← Trang chủ</button>
        <div>
          <span className="project-kicker">GIÁO TRÌNH XOẮN ỐC · STORYTELLING</span>
          <h1>Chuyện Của Bé</h1>
        </div>
        <img className="map-avatar" src={avatarImage} alt="Nhân vật đồng hành" />
      </header>

      <nav className="year-tabs" aria-label="Chọn năm học">
        {curriculum.map((item) => (
          <button key={item.id} type="button" className={item.id === yearId ? 'active' : ''} onClick={() => setYearId(item.id)}>
            <small>Năm {item.id} · {item.ages}</small>
            <strong>{item.title}</strong>
          </button>
        ))}
      </nav>

      <section className="year-intro">
        <div><span>{year.className}</span><h2>{year.title}</h2><p>{year.subtitle}</p></div>
        <div className="spiral-note">Gia đình <b>→</b> Xã hội <b>→</b> Thiên nhiên</div>
      </section>

      <section className="stage-list">
        {year.stages.map((stage, stageIndex) => (
          <article className="stage-row" key={stage.id}>
            <div className="stage-story">
              <span className="stage-index">Chặng {stageIndex + 1}</span>
              <div className="stage-icon">{stage.icon}</div>
              <h3>{stage.title}</h3>
              <small>{stage.theme}</small>
              <p>{stage.story}</p>
            </div>
            <div className="lesson-grid">
              {stage.lessons.map((lesson, lessonIndex) => {
                const playable = Boolean(lesson.playable);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    className={`lesson-card ${playable ? 'playable' : 'locked'}`}
                    onClick={playable ? () => onPlay(lesson.id) : undefined}
                    aria-label={`${lesson.title}${playable ? ', chơi bản demo' : ', sắp ra mắt'}`}
                  >
                    <span className="lesson-number">{lessonIndex + 1}</span>
                    <div>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.math}</small>
                      <p>{lesson.mission}</p>
                      <div className="word-row">{lesson.english.slice(0, 4).map((word) => <span key={word}>{word}</span>)}</div>
                    </div>
                    <b className="lesson-status">{playable ? 'CHƠI DEMO ▶' : 'SẮP RA MẮT'}</b>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
