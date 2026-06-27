import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import fullmoon from '../../assets/images/fullmoon.svg';
import oldmoon from '../../assets/images/oldmoon.svg';
import star1 from '../../assets/images/star1.svg';
import star2 from '../../assets/images/star2.svg';

export default function Start11() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/home1');
  };

  return (
    <div
      style={{
        width: 412,
        height: 917,
        position: 'relative',
        background: '#FFCDD9',
        overflow: 'hidden',
      }}
    >
      {/* 배경 블러 */}
      <div
        style={{
          width: 247,
          height: 445,
          position: 'absolute',
          left: 82,
          top: 236,
          background: '#FD87B2',
          borderRadius: '50%',
          filter: 'blur(50px)',
          opacity: 0.6,
        }}
      />

      {/* 로고 */}
      <img
        src={logo}
        alt="logo"
        style={{
          width: 399,
          height: 166,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 80,
          objectFit: 'contain',
        }}
      />

      {/* 오른쪽 위 보름달 */}
      <img
        src={fullmoon}
        alt="fullmoon"
        style={{
          width: 95,
          position: 'absolute',
          left: 255,
          top: 305,
        }}
      />

      {/* 왼쪽 중간 별 */}
      <img
        src={star2}
        alt="star"
        style={{
          width: 120,
          position: 'absolute',
          left: 55,
          top: 390,
          transform: 'rotate(15deg)',
        }}
      />

      {/* 로그인 버튼 */}
      <button
        onClick={handleLoginClick}
        style={{
          width: 312,
          height: 105,
          position: 'absolute',
          left: 50,
          top: 545,
          background: '#F5F5F5',
          border: '1px solid #000',
          borderRadius: 15,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.25)',
          fontSize: 48,
          fontFamily: 'Pretendard',
          fontWeight: 400,
          cursor: 'pointer',
        }}
      >
        ↪ 로그인
      </button>

      {/* 왼쪽 아래 초승달 */}
      <img
        src={oldmoon}
        alt="oldmoon"
        style={{
          width: 120,
          position: 'absolute',
          left: 30,
          top: 705,
        }}
      />

      {/* 오른쪽 아래 별 */}
      <img
        src={star1}
        alt="star"
        style={{
          width: 120,
          position: 'absolute',
          left: 245,
          top: 760,
        }}
      />
    </div>
  );
}