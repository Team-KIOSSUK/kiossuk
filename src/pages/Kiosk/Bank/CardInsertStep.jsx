import { useRef, useState } from 'react';
import './CardInsertStep.css';

export default function CardInsertStep({ guideText, onSuccess }) {
  const containerRef = useRef(null);
  const slotRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // 카드 이동량 (transform)
  const [dragging, setDragging] = useState(false);
  const [inserted, setInserted] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (inserted) return;
    setDragging(true);
    dragStart.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging || inserted) return;
    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = () => {
    if (!dragging || inserted) return;
    setDragging(false);

    const slotRect = slotRef.current.getBoundingClientRect();
    const cardRect = containerRef.current
      .querySelector('.drag-card')
      .getBoundingClientRect();

    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const slotCenterX = slotRect.left + slotRect.width / 2;
    const slotCenterY = slotRect.top + slotRect.height / 2;

    const distance = Math.hypot(
      cardCenterX - slotCenterX,
      cardCenterY - slotCenterY
    );

    if (distance < 45) {
      // 투입구 근처 → 성공, 카드를 슬롯 위치로 스냅
      //const dx = slotCenterX - (cardRect.left - pos.x + cardRect.width / 2) + pos.x - pos.x;
      const targetX = pos.x + (slotCenterX - cardCenterX);
      const targetY = pos.y + (slotCenterY - cardCenterY) - 10; // 살짝 안쪽으로
      setPos({ x: targetX, y: targetY });
      setInserted(true);
      setTimeout(() => {
        onSuccess();
      }, 700);
    } else {
      // 실패 → 원위치로 복귀
      setPos({ x: 0, y: 0 });
    }
  };

  return (
    <div className="card-insert-wrap" ref={containerRef}>
      <p className="card-insert-guide">{guideText}</p>

      <div className="atm-machine">
        <div className="atm-machine-screen">
          <span>화면</span>
        </div>
        <div className="atm-machine-slot" ref={slotRef}>
          <span className="slot-line" />
        </div>
        <div className="atm-machine-keypad">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="keypad-dot" />
          ))}
        </div>
      </div>

      <div
        className={`drag-card ${dragging ? 'dragging' : ''} ${inserted ? 'inserted' : ''}`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span className="drag-card-chip" />
        <span className="drag-card-label">MY CARD</span>
      </div>

      {!inserted && (
        <p className="card-insert-hint">카드를 투입구까지 끌어다 놓으세요</p>
      )}
    </div>
  );
}