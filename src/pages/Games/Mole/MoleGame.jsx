import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoleGame.css';

const LEVELS = {
  easy: { label: '초급', emoji: '🌱', description: '느리게, 여유롭게', interval: 1200, visible: 1800, bomb: 0, time: 60 },
  medium: { label: '중급', emoji: '🔥', description: '빠르게, 집중해서', interval: 800, visible: 1200, bomb: .15, time: 45 },
  hard: { label: '고급', emoji: '💀', description: '초고속, 폭탄 주의!', interval: 500, visible: 800, bomb: .3, time: 30 },
};

const emptyHoles = () => Array.from({ length: 9 }, (_, id) => ({ id, active: false, whacked: false, bomb: false }));

const STARS = [
  { left: 4, top: 8, size: 2 }, { left: 17, top: 3, size: 1 },
  { left: 31, top: 14, size: 3 }, { left: 54, top: 5, size: 1 },
  { left: 79, top: 11, size: 2 }, { left: 94, top: 4, size: 1 },
  { left: 9, top: 27, size: 1 }, { left: 68, top: 24, size: 2 },
  { left: 88, top: 33, size: 3 }, { left: 22, top: 41, size: 2 },
  { left: 48, top: 36, size: 1 }, { left: 5, top: 59, size: 3 },
  { left: 36, top: 65, size: 1 }, { left: 73, top: 54, size: 2 },
  { left: 96, top: 70, size: 1 }, { left: 14, top: 79, size: 2 },
  { left: 59, top: 83, size: 3 }, { left: 84, top: 91, size: 1 },
  { left: 39, top: 96, size: 2 }, { left: 2, top: 93, size: 1 },
];

function Mole({ whacked }) {
  return <svg viewBox="0 0 60 60" className="mole-svg" aria-hidden="true">
    <ellipse cx="30" cy="38" rx="18" ry="14" fill="#8B5E3C"/><ellipse cx="30" cy="26" rx="16" ry="14" fill="#A0714F"/>
    <ellipse cx="16" cy="20" rx="6" ry="7" fill="#A0714F"/><ellipse cx="44" cy="20" rx="6" ry="7" fill="#A0714F"/>
    <ellipse cx="16" cy="20" rx="3.5" ry="4.5" fill="#E8A0A0"/><ellipse cx="44" cy="20" rx="3.5" ry="4.5" fill="#E8A0A0"/>
    {whacked ? <><path d="m22 23 5 5m0-5-5 5m11-5 5 5m0-5-5 5" stroke="#1a0a2e" strokeWidth="2.5" strokeLinecap="round"/></> : <><ellipse cx="24" cy="25" rx="4" ry="4.5" fill="#1a0a2e"/><ellipse cx="36" cy="25" rx="4" ry="4.5" fill="#1a0a2e"/><circle cx="25.5" cy="23.5" r="1.5" fill="white"/><circle cx="37.5" cy="23.5" r="1.5" fill="white"/></>}
    <ellipse cx="30" cy="31" rx="4" ry="2.5" fill="#C45C8A"/><path d={whacked ? 'M26 35q4-2 8 0' : 'M26 34q4 6 8 0'} stroke="#1a0a2e" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {whacked && <><text x="6" y="14" fontSize="10">⭐</text><text x="48" y="12" fontSize="8">✨</text></>}
  </svg>;
}

function Bomb({ whacked }) {
  return <svg viewBox="0 0 60 60" className="mole-svg" aria-hidden="true"><circle cx="30" cy="34" r="18" fill={whacked ? '#ef4444' : '#1a1a2e'}/>{whacked ? <text x="30" y="41" fontSize="20" textAnchor="middle">💥</text> : <><rect x="27" y="10" width="6" height="10" rx="3" fill="#555"/><path d="M32 12q8-6 10 2" stroke="#ffd700" strokeWidth="2.5" fill="none"/><circle cx="42" cy="13" r="2" fill="#ff6b35"/><text x="30" y="40" fontSize="14" textAnchor="middle">💣</text></>}</svg>;
}

export default function MoleGame() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('menu');
  const [level, setLevel] = useState('easy');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [holes, setHoles] = useState(emptyHoles);
  const [effect, setEffect] = useState(null);
  const timers = useRef(new Map());
  const spawnTimer = useRef(null);
  const clockTimer = useRef(null);
  const comboRef = useRef(0);
  const config = LEVELS[level];

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout); timers.current.clear();
    clearInterval(spawnTimer.current); clearInterval(clockTimer.current);
  }, []);

  const spawn = useCallback(() => {
    setHoles(prev => {
      const free = prev.filter(h => !h.active);
      if (!free.length) return prev;
      const picked = free[Math.floor(Math.random() * free.length)];
      const bomb = Math.random() < config.bomb;
      const id = picked.id;
      // 내려가는 동안 종류를 유지해야 폭탄이 두더지로 바뀌어 보이지 않는다.
      const hide = setTimeout(() => setHoles(current => current.map(h => h.id === id ? { ...h, active: false, whacked: false } : h)), config.visible);
      timers.current.set(id, hide);
      return prev.map(h => h.id === id ? { ...h, active: true, whacked: false, bomb } : h);
    });
  }, [config]);

  const start = () => {
    clearTimers(); setScore(0); setCombo(0); comboRef.current = 0; setBestCombo(0); setMistakes(0);
    setHoles(emptyHoles()); setTime(config.time); setScreen('playing');
  };

  useEffect(() => {
    if (screen !== 'playing') return undefined;
    spawn();
    spawnTimer.current = setInterval(spawn, config.interval);
    clockTimer.current = setInterval(() => setTime(value => {
      if (value <= 1) { clearTimers(); setScreen('result'); return 0; }
      return value - 1;
    }), 1000);
    return clearTimers;
  }, [screen, spawn, config.interval, clearTimers]);

  const hit = hole => {
    if (!hole.active || hole.whacked || screen !== 'playing') return;
    clearTimeout(timers.current.get(hole.id)); timers.current.delete(hole.id);
    if (hole.bomb) {
      comboRef.current = 0; setCombo(0); setScore(s => Math.max(0, s - 10)); setMistakes(m => m + 1); setEffect({ id: hole.id, icon: '💥' });
    } else {
      const next = comboRef.current + 1; comboRef.current = next; setCombo(next); setBestCombo(best => Math.max(best, next));
      setScore(s => s + 10 * (next >= 5 ? 3 : next >= 3 ? 2 : 1)); setEffect({ id: hole.id, icon: '✨' });
    }
    setHoles(prev => prev.map(h => h.id === hole.id ? { ...h, whacked: true } : h));
    setTimeout(() => { setHoles(prev => prev.map(h => h.id === hole.id ? { ...h, active: false, whacked: false } : h)); setEffect(null); }, 350);
  };

  const rank = score >= 300 ? ['👑', '전설'] : score >= 200 ? ['🏆', '달인'] : score >= 100 ? ['⭐', '숙련'] : ['🌱', '초보'];

  return <main className="mole-page">
    <section className="mole-phone">
      {STARS.map((s, i) => <i className="game-star" key={i} style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}/>) }
      {screen === 'menu' && <div className="mole-screen menu-screen">
        <button className="mole-back" onClick={() => navigate(-1)} aria-label="두뇌 훈련으로 돌아가기">‹</button>
        <div className="paw">🐾</div><h1>두더지 게임</h1><p className="select-label">난이도 선택</p>
        <div className="level-list">{Object.entries(LEVELS).map(([key, item]) => <button key={key} className={`level-card ${level === key ? `selected ${key}` : ''}`} onClick={() => setLevel(key)}><span className="level-emoji">{item.emoji}</span><span><strong>{item.label}{level === key && <em>선택됨</em>}</strong><small>{item.description}</small><small>⏱ {item.time}초 · {item.bomb ? `💣 폭탄 ${item.bomb * 100}%` : '💣 폭탄 없음'}</small></span></button>)}</div>
        <button className="primary-game-btn" onClick={start}>🔨 게임 시작!</button>
      </div>}
      {screen === 'playing' && <div className="mole-screen playing-screen">
        <div className="score-board"><div><small>점수</small><strong>{score}</strong></div><div><b className={time <= 10 ? 'danger' : ''}>{time}</b><small>초</small></div><div><small>콤보</small><strong>x{combo}</strong></div></div>
        <div className="time-track"><span style={{ width: `${time / config.time * 100}%` }}/></div><div className="level-badge">{config.emoji} {config.label}</div>
        {combo >= 3 && <div className="combo-popup">🔥 COMBO x{combo}!</div>}
        <div className="hole-grid">{holes.map(hole => <button className="hole" key={hole.id} onPointerDown={() => hit(hole)} aria-label={hole.active ? (hole.bomb ? '폭탄' : '두더지') : '빈 구멍'}><span className="hole-shadow"/><span className="dirt"/><span className={`creature ${hole.active ? 'up' : ''}`}>{hole.bomb ? <Bomb whacked={hole.whacked}/> : <Mole whacked={hole.whacked}/>}</span>{effect?.id === hole.id && <b className="hit-effect">{effect.icon}</b>}</button>)}</div>
        <button className="quit-btn" onClick={() => { clearTimers(); setScreen('menu'); }}>그만하기</button>
      </div>}
      {screen === 'result' && <div className="mole-screen result-screen"><div className="rank-icon">{rank[0]}</div><h2>게임 종료!</h2><h3>{rank[1]} 등급</h3><div className="result-grid"><div><small>최종 점수</small><strong>{score}점</strong></div><div><small>난이도</small><strong>{config.label}{config.emoji}</strong></div><div><small>최대 콤보</small><strong>{bestCombo}x</strong></div><div><small>실수 횟수</small><strong>{mistakes}번</strong></div></div><button className="primary-game-btn" onClick={start}>🔄 다시 도전!</button><button className="secondary-game-btn" onClick={() => setScreen('menu')}>메뉴로 돌아가기</button></div>}
    </section>
  </main>;
}
