// src/data/TutorialData.js
export const tutorialData = {
  withdrawal: {
    title: '예금 인출',
    steps: [
      { id: 1, text: '카드 투입구에 카드를 넣어주세요.' },
      { id: 2, text: '비밀번호를 입력해 주세요.' },
      { id: 3, text: '찾으실 금액을 선택하세요.'},
      ]
    },
        transfer: {
        title: '계좌 이체',
        steps: [
        { id: 1, text: '보내실 분의 계좌번호를 입력하세요.' },
        { id: 2, text: '이체하실 금액을 입력하세요.' },
        { id: 3, text: '입력하신 내용을 확인 후 확인 버튼을 누르세요.' },
        ]
  },
  // 나중에 transfer, balance 등도 여기에 추가하면 됩니다.
};