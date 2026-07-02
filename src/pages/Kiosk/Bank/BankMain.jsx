import { useNavigate } from 'react-router-dom';
import './Bank.css';

const menuList = [
  { label: '출금', icon: '💵', type: 'withdrawal', active: true },
  { label: '입금', icon: '💰', type: 'deposit', active: true },
  { label: '조회거래', icon: '📋', type: 'inquiry', active: true },
  { label: '계좌송금', icon: '🏦', type: 'transfer', active: false },
  { label: '신용카드', icon: '💳', type: 'card', active: false },
  { label: '지로/공과금', icon: '🧾', type: 'bill', active: false },
  { label: '통장정리', icon: '📖', type: 'passbook', active: false },
  { label: '무통장거래', icon: '📱', type: 'nopassbook', active: false },
  { label: '해외송금', icon: '✈️', type: 'overseas', active: false },
  { label: '다른업무', icon: '➕', type: 'etc', active: false },
];

export default function BankMain() {
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    if (!menu.active) {
      return;
    }
    navigate('/kiosk/bank/select', { state: { type: menu.type } }); // ← practice가 아니라 select로
  };

  return (
    <div className="kiosk-page atm-container">
      <div className="atm-screen-guide">
        <p className="atm-guide-title">은행 업무 안내</p>
        <p className="atm-guide-sub">이용하실 거래를 선택해 주세요</p>
      </div>

      <div className="atm-menu-grid">
        {menuList.map((menu) => {
          const isDisabled = !menu.active;
          return (
            <button
              key={menu.type}
              type="button"
              className={isDisabled ? 'atm-menu-card disabled' : 'atm-menu-card'}
              onClick={() => handleMenuClick(menu)}
              disabled={isDisabled}
            >
              <span className="atm-menu-icon">{menu.icon}</span>
              <span className="atm-menu-label">{menu.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}