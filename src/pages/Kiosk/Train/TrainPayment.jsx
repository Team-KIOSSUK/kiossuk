import { useNavigate, useLocation } from 'react-router-dom';

const fareMap = {
  KTX: 10000,
  ITX: 9000,
  무궁화호: 6000,
};

export default function TrainPayment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    from,
    to,
    date,
    passengers,
    seatClass,
    trainType,
    selectedCar,
    selectedSeats,
  } = state || {};

  const farePerSeat = fareMap[trainType] || 0;
  const classMultiplier = seatClass === '특실' ? 1.7 : 1;
  const adjustedFarePerSeat = Math.round(farePerSeat * classMultiplier);
  const total = adjustedFarePerSeat * (selectedSeats?.length || 0);

  if (!state || !selectedSeats?.length) {
    return (
      <div style={{ width: 412, minHeight: '100vh', margin: '0 auto', padding: 24, boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
        <button onClick={() => navigate(-1)} style={{ border: 'none', background: '#fff', borderRadius: 999, width: 44, height: 44, fontSize: 22, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>&lt;</button>
        <h1 style={{ marginTop: 12, fontSize: 24 }}>결제 정보</h1>
        <p style={{ color: '#666' }}>결제할 좌석 정보가 없습니다. 이전 페이지로 돌아가세요.</p>
      </div>
    );
  }

  return (
    <div style={{ width: 412, minHeight: '100vh', margin: '0 auto', padding: 24, boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ border: 'none', background: '#fff', borderRadius: 999, width: 44, height: 44, fontSize: 22, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>&lt;</button>

      <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 24 }}>결제 페이지</h1>
      <p style={{ color: '#666', marginTop: 0 }}>선택한 좌석과 요금을 확인하세요.</p>

      <div style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>출발</div>
          <div style={{ color: '#333', marginTop: 6 }}>{from || '—'}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>도착</div>
          <div style={{ color: '#333', marginTop: 6 }}>{to || '—'}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>날짜</div>
          <div style={{ color: '#333', marginTop: 6 }}>{date || '—'}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>열차</div>
          <div style={{ color: '#333', marginTop: 6 }}>{trainType}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>좌석 등급</div>
          <div style={{ color: '#333', marginTop: 6 }}>{seatClass}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>호차</div>
          <div style={{ color: '#333', marginTop: 6 }}>{selectedCar}호차</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>좌석</div>
          <div style={{ color: '#333', marginTop: 6 }}>{selectedSeats.join(', ')}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#888' }}>요금</div>
          <div style={{ color: '#333', marginTop: 6 }}>
            {farePerSeat.toLocaleString()}원 {classMultiplier > 1 ? `x ${classMultiplier} (특실)` : ''} = {adjustedFarePerSeat.toLocaleString()}원
          </div>
          <div style={{ color: '#333', marginTop: 6 }}>
            총 {adjustedFarePerSeat.toLocaleString()}원 x {selectedSeats.length} = <strong>{total.toLocaleString()}원</strong>
          </div>
        </div>
      </div>

      <button onClick={() => { alert('결제가 완료되었습니다. 예매가 확정되었습니다.'); navigate('/kiosk'); }} style={{ marginTop: 20, width: '100%', padding: 12, borderRadius: 12, border: 'none', background: '#f06b8b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
        결제하기
      </button>
    </div>
  );
}
