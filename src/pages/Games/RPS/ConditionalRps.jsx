import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const choices = [
  { name: '가위', emoji: '✌️' },
  { name: '바위', emoji: '✊' },
  { name: '보', emoji: '🖐️' },
];

const conditions = ['비기세요', '이기세요', '지세요'];
const roundOptions = [10, 15, 20];
const timeLimit = 60;

function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getRandomCondition() {
  return conditions[Math.floor(Math.random() * conditions.length)];
}

function getRequiredChoice(condition, computerChoice) {
  if (!computerChoice) return null;

  if (condition === '비기세요') {
    return computerChoice;
  }

  if (condition === '이기세요') {
    const winningMap = {
      가위: '바위',
      바위: '보',
      보: '가위',
    };
    return choices.find((choice) => choice.name === winningMap[computerChoice.name]);
  }

  const losingMap = {
    가위: '보',
    바위: '가위',
    보: '바위',
  };
  return choices.find((choice) => choice.name === losingMap[computerChoice.name]);
}

function isCorrectResult(userChoice, computerChoice, condition) {
  if (condition === '비기세요') {
    return userChoice.name === computerChoice.name;
  }

  if (condition === '이기세요') {
    const winningMap = {
      가위: '바위',
      바위: '보',
      보: '가위',
    };
    return userChoice.name === winningMap[computerChoice.name];
  }

  const losingMap = {
    가위: '보',
    바위: '가위',
    보: '바위',
  };
  return userChoice.name === losingMap[computerChoice.name];
}

export default function ConditionalRps() {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState(10);
  const [isStarted, setIsStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [condition, setCondition] = useState('비기세요');
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [currentComputerChoice, setCurrentComputerChoice] = useState(null);
  const [message, setMessage] = useState('반복 횟수를 선택하고 시작해보세요.');
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const finishGame = (reason, finalCorrectCount) => {
    setIsFinished(true);
    setIsStarted(false);
    setShowModal(true);
    setModalTitle(reason === 'time' ? '시간 종료!' : '게임 종료!');
    setModalMessage(`${finalCorrectCount}/${rounds}회 성공했습니다.`);
    setMessage(
      reason === 'time'
        ? `시간이 끝났어요! ${finalCorrectCount}/${rounds}회 성공했습니다.`
        : `게임이 끝났어요! ${finalCorrectCount}/${rounds}회 성공했습니다.`
    );
  };

  useEffect(() => {
    if (!isStarted || isFinished) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          finishGame('time', correctCount);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isStarted, isFinished, correctCount, rounds]);

  const handleStart = () => {
    const initialComputerChoice = getRandomChoice();
    const initialCondition = getRandomCondition();

    setIsStarted(true);
    setIsFinished(false);
    setShowModal(false);
    setCurrentRound(0);
    setCorrectCount(0);
    setTimeLeft(timeLimit);
    setCondition(initialCondition);
    setCurrentComputerChoice(initialComputerChoice);
    setUserChoice(null);
    setComputerChoice(null);
    setMessage('조건에 맞는 손을 선택하세요.');
  };

  const handleChoice = (choice) => {
    if (!isStarted || isFinished) return;

    const roundComputerChoice = currentComputerChoice || getRandomChoice();
    const nextComputerChoice = getRandomChoice();
    const nextCondition = getRandomCondition();
    const nextRound = currentRound + 1;
    const isCorrect = isCorrectResult(choice, roundComputerChoice, condition);
    const nextCorrectCount = correctCount + (isCorrect ? 1 : 0);

    setUserChoice(choice);
    setComputerChoice(roundComputerChoice);
    setCondition(nextCondition);
    setCurrentComputerChoice(nextComputerChoice);
    setCurrentRound(nextRound);
    setCorrectCount(nextCorrectCount);
    setMessage(isCorrect ? '정답!' : '아쉬워요.');

    if (nextRound >= rounds) {
      finishGame('round', nextCorrectCount);
    }
  };

  return (
    <div
      style={{
        width: 412,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #fff7f8 0%, #ffe6ec 100%)',
        padding: '24px 20px 40px',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      <button
        onClick={() => navigate('/brain-training')}
        style={{
          border: 'none',
          background: '#fff',
          borderRadius: '999px',
          width: 44,
          height: 44,
          fontSize: 22,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        &lt;
      </button>

      <h1 style={{ marginTop: 8, marginBottom: 8, fontSize: 28, color: '#333' }}>
        조건형 가위바위보
      </h1>
      <p style={{ marginTop: 0, color: '#666', lineHeight: 1.5 }}>
        매 라운드 조건이 랜덤으로 바뀌고,
        <br />
        1분안에 목표 횟수까지 도전해보세요.
      </p>

      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 20,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 16, color: '#f06b8b', fontWeight: 700, marginBottom: 8 }}>
          반복 횟수 선택
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {roundOptions.map((option) => (
            <button
              key={option}
              onClick={() => setRounds(option)}
              style={{
                flex: 1,
                border: rounds === option ? '2px solid #f06b8b' : '1px solid #f3d9e0',
                borderRadius: 999,
                padding: '10px 0',
                background: rounds === option ? '#fff2f5' : '#fff',
                color: '#333',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {option}회
            </button>
          ))}
        </div>
        <button
          onClick={handleStart}
          style={{
            marginTop: 14,
            width: '100%',
            border: 'none',
            borderRadius: 999,
            padding: '12px 0',
            background: '#f06b8b',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isStarted ? '다시 시작' : '게임 시작'}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, gap: 10 }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#888' }}>진행</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{currentRound}/{rounds}</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#888' }}>성공</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#f06b8b' }}>{correctCount}</div>
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#888' }}>시간</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#f06b8b' }}>{timeLeft}초</div>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 20,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 16, color: '#f06b8b', fontWeight: 700, marginBottom: 8 }}>
          이번 조건
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 10 }}>
          {condition}
        </div>
        <div style={{ fontSize: 18, color: '#555', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>컴퓨터가 낸 손:</span>
          <span style={{ fontSize: 22 }}>{currentComputerChoice ? currentComputerChoice.emoji : '🤔'}</span>
          <span style={{ fontWeight: 700 }}>{currentComputerChoice ? currentComputerChoice.name : '준비 중'}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => handleChoice(choice)}
            style={{
              border: 'none',
              borderRadius: 20,
              padding: '16px 8px',
              background: '#fff',
              boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
              fontSize: 18,
              fontWeight: 700,
              cursor: isStarted && !isFinished ? 'pointer' : 'default',
              opacity: isStarted && !isFinished ? 1 : 0.7,
            }}
          >
            <div style={{ fontSize: 30, marginBottom: 4 }}>{choice.emoji}</div>
            <div>{choice.name}</div>
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 18, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#333', marginBottom: 8 }}>결과</div>
        <div style={{ color: '#666', marginBottom: 10 }}>{message}</div>
        <div style={{ fontSize: 14, color: '#888' }}>
          나: {userChoice ? `${userChoice.emoji} ${userChoice.name}` : '선택 전'}
        </div>
        <div style={{ fontSize: 14, color: '#888', marginTop: 6 }}>
          컴퓨터: {computerChoice ? `${computerChoice.emoji} ${computerChoice.name}` : '대기 중'}
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              background: '#fff',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 800, color: '#333', marginBottom: 10 }}>
              {modalTitle}
            </div>
            <div style={{ fontSize: 16, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>
              {modalMessage}
            </div>
            <button
              onClick={() => setShowModal(false)}
              style={{
                border: 'none',
                borderRadius: 999,
                padding: '12px 18px',
                background: '#f06b8b',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
