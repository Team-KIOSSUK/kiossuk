import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import fullmoon from '../../assets/images/fullmoon.svg';
import oldmoon from '../../assets/images/oldmoon.svg';
import star1 from '../../assets/images/star1.svg';
import star2 from '../../assets/images/star2.svg';

export default function Start1() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/start1_1'); // '/start1_1' 경로로 이동합니다.
  };

  return (
    <div
      onClick={handleNavigate}
      style={{
        width: '412px',
        height: '917px',
        position: 'relative',
        cursor: 'pointer',
        background: '#FFCDD9',
        overflow: 'hidden',
      }}
    >
      {/* 배경 블러 */}
      <div
        style={{
          width: '247px',
          height: '445px',
          position: 'absolute',
          left: '82px',
          top: '244px',
          background: '#FD87B2',
          borderRadius: '50%',
          filter: 'blur(50px)',
          opacity: 0.6,
        }}
      />

      {/* 왼쪽 위 달 */}
      <img
        src={oldmoon}
        alt="old moon"
        style={{
          position: 'absolute',
          width: '120px',
          left: '65px',
          top: '55px',
        }}
      />

      {/* 오른쪽 위 별 */}
      <img
        src={star1}
        alt="star"
        style={{
          position: 'absolute',
          width: '120px',
          left: '250px',
          top: '170px',
        }}
      />

      {/* 로고 */}
      <img
        src={logo}
        alt="logo"
        style={{
          position: 'absolute',
          width: '399px',
          height: '166px',
          left: '6.5px', // (412 - 399) / 2
          top: '330px',
          objectFit: 'contain',
        }}
      />

      {/* 왼쪽 아래 별 */}
      <img
        src={star2}
        alt="star"
        style={{
          position: 'absolute',
          width: '120px',
          left: '60px',
          top: '600px',
        }}
      />

      {/* 오른쪽 아래 보름달 */}
      <img
        src={fullmoon}
        alt="full moon"
        style={{
          position: 'absolute',
          width: '95px',
          left: '245px',
          top: '735px',
        }}
      />
    </div>
  );
}