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
        inquiry: {
        title: '예금 조회',
        steps: [
        { id: 1, text: '통장을 투입구에 넣어주세요.' },
       { id: 2, text: '조회하실 계좌를 선택해 주세요.' },
        { id: 3, text: '화면에서 잔액을 확인해 주세요.' },
    ]
  },

        passbook: {
        title: '통장 정리',
        steps: [
       { id: 1, text: '통장 투입구에 통장을 넣어주세요.' },
        { id: 2, text: '통장 정리 버튼을 눌러주세요.' },
        { id: 3, text: '정리가 완료될 때까지 기다려주세요.' },
    ]
  },
};

  
