export const tutorialData = {
  deposit: [
    { text: "전화번호를 입력하세요 (숫자패드)", type: "numpad" },
    { text: "지폐를 투입구로 드래그하세요", type: "drag" },
    { text: "입금 완료!", type: "done" }
  ],
  withdrawal: [
    { text: "카드를 넣어주세요", type: "card" },
    { text: "비밀번호 4자리를 입력하세요", type: "numpad" },
    { text: "금액을 선택하세요", type: "amount", options: ["1만원", "5만원"] },
    { text: "현금이 인출되었습니다.", type: "done" }
  ],
  inquiry: [
    { text: "통장을 펼쳐서 삽입구에 넣어주세요", type: "inquiry_closed" },
    { text: "통장을 클릭하여 확인하세요", type: "inquiry_open" },
    { text: "조회 완료!", type: "done" }
  ]
};