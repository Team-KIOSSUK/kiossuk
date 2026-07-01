import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
      <button 
        onClick={() => navigate('/kiosk/bank')} 
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <img src="/back-icon.png" alt="뒤로가기" style={{ width: '40px' }} />
      </button>
    </div>
  );
}