import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Support.css';

const faqs = [
  {
    question: '학습 기록은 어떻게 보나요?',
    answer:
      "홈 화면에서 '학습 기록' 버튼을 누르면, 지금까지 했던 두뇌 훈련 게임들의 기록을 날짜별로 확인할 수 있습니다.",
  },
  {
    question: '키오스크 연습은 어떻게 하나요?',
    answer:
      "홈 화면에서 '키오스크' 버튼을 누르고, 연습하고 싶은 메뉴(카페, 음식점 등)를 선택하여 실제처럼 연습할 수 있습니다.",
  },
  {
    question: '실수로 앱이 꺼졌어요.',
    answer:
      '괜찮아요. 다시 앱을 켜서 이어서 학습하시면 됩니다. 학습 기록은 자동으로 저장되니 걱정하지 마세요.',
  },
  {
    question: '글씨 크기를 더 키우고 싶어요.',
    answer:
      '현재 앱에서는 글씨 크기 조절을 지원하지 않습니다. 스마트폰의 "설정 > 디스플레이 > 글자 크기와 스타일"에서 전체 글씨 크기를 조절할 수 있습니다.',
  },
];

export default function Support() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="support-shell">
      <div className="support-page">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h1 className="page-title">고객지원</h1>

        <div className="support-section">
          <h2>자주 묻는 질문</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => handleToggle(index)}>
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? '▲' : '▼'}</span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="support-section">
          <h2>문의하기</h2>
          <div className="contact-info">
            <p>
              추가로 궁금한 점이 있거나 문제가 발생하면 아래 연락처로 문의해주세요.
            </p>
            <ul>
              <li>
                <strong>전화:</strong> (아직 정보가 없습니다)
              </li>
              <li>
                <strong>운영시간:</strong> (아직 정보가 없습니다)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}