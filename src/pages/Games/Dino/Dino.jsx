import { useEffect, useRef, useState } from 'react';
import './Dino.css';

export default function Dino() {
  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [dinoBottom, setDinoBottom] = useState(55);
  const [obstacleLeft, setObstacleLeft] = useState(700);

  const velocity = useRef(0);
  const isJumping = useRef(false);
  const scoreRef = useRef(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    setDinoBottom(55);
    setObstacleLeft(700);
    velocity.current = 0;
    isJumping.current = false;
  };

  const jump = () => {
    if (gameState !== 'playing') return;
    if (isJumping.current) return;

    isJumping.current = true;
    velocity.current = 16;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code !== 'Space') return;

      e.preventDefault();

      if (gameState === 'ready' || gameState === 'over') {
        startGame();
      } else {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setDinoBottom((prev) => {
        let next = prev + velocity.current;
        velocity.current -= 0.5;

        if (next <= 55) {
          next = 55;
          velocity.current = 0;
          isJumping.current = false;
        }

        return next;
      });

      setObstacleLeft((prev) => {
  const speed = 7 + Math.floor(scoreRef.current / 300);

  if (prev < -50) return 700;
  return prev - speed;
});

      scoreRef.current += 1;
      setScore(scoreRef.current);
    }, 20);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const dinoX = 95;
    const dinoWidth = 45;
    const dinoHeight = 45;

    const obstacleWidth = 35;
    const obstacleHeight = 50;

    const isXCrash =
      dinoX + dinoWidth > obstacleLeft &&
      dinoX < obstacleLeft + obstacleWidth;

    const isYCrash = dinoBottom < 55 + obstacleHeight;

    if (isXCrash && isYCrash) {
      setGameState('over');
    }
  }, [dinoBottom, obstacleLeft, gameState]);

  return (
    <div className="dino-page">

        <button
  className="back-btn"
  onClick={() => window.history.back()}
>
  ← 이전
</button>

      <h1>공룡 달리기</h1>
      <p>스페이스바로 점프해서 선인장을 피해요!</p>

      <div className="score">점수: {score}</div>

      <div className="dino-game">
        <div className="sun">☀️</div>
        <div className="cloud cloud-a">☁️</div>
        <div className="cloud cloud-b">☁️</div>

        {gameState === 'ready' && (
          <div className="message-box">
            <h2>READY</h2>
            <p>SPACE를 눌러 시작</p>
          </div>
        )}

        {gameState === 'over' && (
          <div className="message-box">
            <h2>GAME OVER</h2>
            <p>최종 점수: {score}</p>
            <button onClick={startGame}>다시 시작</button>
          </div>
        )}

        <div className="dino-character" style={{ bottom: `${dinoBottom}px` }}>
          🦖
        </div>

        <div className="obstacle" style={{ left: `${obstacleLeft}px` }}>
          🌵
        </div>

        <div className="ground"></div>
      </div>
    </div>
  );
}