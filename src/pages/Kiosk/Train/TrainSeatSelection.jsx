import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TrainSeatSelection() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { from, to, date, passengers, seatClass, trainType } = state || {};

  const [selectedCar, setSelectedCar] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);

  const cars = [1, 2, 3, 4, 5];

  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const cols = ['A', 'B'];

  const handleSeatClick = (seatId) => {
    if (reservedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      return;
    }

    if ((passengers || 1) <= selectedSeats.length) {
      alert(`최대 ${passengers || 1}개의 좌석만 선택할 수 있습니다.`);
      return;
    }

    setSelectedSeats([...selectedSeats, seatId]);
  };

  useEffect(() => {
    // For each car (1-5), pick 10 random reserved seats (rows 1-10, cols A-D)
    const cars = [1, 2, 3, 4, 5];
    const rows = Array.from({ length: 10 }, (_, i) => i + 1);
    const cols = ['A', 'B', 'C', 'D'];
    const reserved = [];

    for (const c of cars) {
      const pool = [];
      for (const r of rows) {
        for (const col of cols) {
          pool.push(`${c}-${r}${col}`);
        }
      }

      // shuffle pool
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      reserved.push(...pool.slice(0, 10));
    }

    setReservedSeats(reserved);
  }, []);

  const handleConfirm = () => {
    if ((passengers || 1) !== selectedSeats.length) {
      alert(`${passengers || 1}개의 좌석을 선택해주세요.`);
      return;
    }

    navigate('/train-payment', {
      state: {
        from,
        to,
        date,
        passengers,
        seatClass,
        trainType,
        selectedCar,
        selectedSeats,
      },
    });
  };

  return (
    <div style={{ width: 412, minHeight: '100vh', margin: '0 auto', padding: 24, boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ border: 'none', background: '#fff', borderRadius: 999, width: 44, height: 44, fontSize: 22, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>&lt;</button>

      <h1 style={{ marginTop: 12, marginBottom: 8, fontSize: 24 }}>좌석 선택</h1>
      <p style={{ color: '#666', marginTop: 0 }}>호차와 좌석을 선택하세요.</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 12 }}>
        {cars.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCar(c)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              border: selectedCar === c ? '2px solid #f06b8b' : '1px solid #eee',
              background: selectedCar === c ? '#fff2f5' : '#fff',
              cursor: 'pointer',
            }}
          >
            {c}호차
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Left column: A and B 붙은 쌍 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rows.map((r) => {
            const seatA = `${selectedCar}-${r}A`;
            const seatB = `${selectedCar}-${r}B`;
            const reservedA = reservedSeats.includes(seatA);
            const reservedB = reservedSeats.includes(seatB);
            return (
              <div key={r} style={{ display: 'flex', gap: 8 }}>
                <div
                  onClick={() => handleSeatClick(seatA)}
                  role="button"
                  aria-disabled={reservedA}
                  style={{
                    width: 56,
                    height: 40,
                    background: reservedA ? '#eee' : selectedSeats.includes(seatA) ? '#f06b8b' : '#fff',
                    color: reservedA ? '#999' : selectedSeats.includes(seatA) ? '#fff' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: reservedA ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    opacity: reservedA ? 0.7 : 1,
                  }}
                >
                  {`${r}A`}
                </div>
                <div
                  onClick={() => handleSeatClick(seatB)}
                  role="button"
                  aria-disabled={reservedB}
                  style={{
                    width: 56,
                    height: 40,
                    background: reservedB ? '#eee' : selectedSeats.includes(seatB) ? '#f06b8b' : '#fff',
                    color: reservedB ? '#999' : selectedSeats.includes(seatB) ? '#fff' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: reservedB ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    opacity: reservedB ? 0.7 : 1,
                  }}
                >
                  {`${r}B`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Aisle spacer */}
        <div style={{ width: 48 }} />

        {/* Right column: C and D 붙은 쌍 (오른쪽에 붙음) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 'auto' }}>
          {rows.map((r) => {
            const seatC = `${selectedCar}-${r}C`;
            const seatD = `${selectedCar}-${r}D`;
            const reservedC = reservedSeats.includes(seatC);
            const reservedD = reservedSeats.includes(seatD);
            return (
              <div key={r} style={{ display: 'flex', gap: 8 }}>
                <div
                  onClick={() => handleSeatClick(seatC)}
                  role="button"
                  aria-disabled={reservedC}
                  style={{
                    width: 56,
                    height: 40,
                    background: reservedC ? '#eee' : selectedSeats.includes(seatC) ? '#f06b8b' : '#fff',
                    color: reservedC ? '#999' : selectedSeats.includes(seatC) ? '#fff' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: reservedC ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    opacity: reservedC ? 0.7 : 1,
                  }}
                >
                  {`${r}C`}
                </div>
                <div
                  onClick={() => handleSeatClick(seatD)}
                  role="button"
                  aria-disabled={reservedD}
                  style={{
                    width: 56,
                    height: 40,
                    background: reservedD ? '#eee' : selectedSeats.includes(seatD) ? '#f06b8b' : '#fff',
                    color: reservedD ? '#999' : selectedSeats.includes(seatD) ? '#fff' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: reservedD ? 'not-allowed' : 'pointer',
                    fontWeight: 700,
                    opacity: reservedD ? 0.7 : 1,
                  }}
                >
                  {`${r}D`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ marginBottom: 8 }}>
          선택된 좌석: {selectedSeats.length > 0 ? `${selectedSeats.length}개 (${selectedSeats.join(', ')})` : '선택 없음'}
        </div>
        <button onClick={handleConfirm} style={{ width: '100%', padding: 12, borderRadius: 12, border: 'none', background: '#4caf50', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>좌석 예매하기</button>
      </div>
    </div>
  );
}
