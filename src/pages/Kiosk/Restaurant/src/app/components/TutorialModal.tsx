import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingCart, List, Languages, Bell, BookOpen, Star } from "lucide-react";
import logo from "../../imports/image.png";

type Level = "select" | "beginner" | "intermediate" | "advanced" | "staffcall";

interface Step {
  title: string;
  description: string;
  visual: React.ReactNode;
  tip?: string;
}

const LEVELS: { key: Exclude<Level, "select">; label: string; sublabel: string; icon: React.ReactNode; color: string; badge: string }[] = [
  {
    key: "beginner",
    label: "초급",
    sublabel: "메뉴 탐색 & 담기",
    icon: <BookOpen className="w-7 h-7" />,
    color: "bg-emerald-500",
    badge: "BASIC",
  },
  {
    key: "intermediate",
    label: "중급",
    sublabel: "수량 조절 & 주문",
    icon: <ShoppingCart className="w-7 h-7" />,
    color: "bg-blue-500",
    badge: "MID",
  },
  {
    key: "advanced",
    label: "고급",
    sublabel: "언어 변경 & 주문내역",
    icon: <Star className="w-7 h-7" />,
    color: "bg-violet-500",
    badge: "ADV",
  },
  {
    key: "staffcall",
    label: "직원호출",
    sublabel: "직원 호출 방법",
    icon: <Bell className="w-7 h-7" />,
    color: "bg-amber-500",
    badge: "CALL",
  },
];

// ── Visual components ──────────────────────────────────────────────────────────

function MockSidebar({ highlight }: { highlight?: "category" | "staff" }) {
  const cats = ["메인메뉴", "음료", "디저트", "조식세트", "커피&차"];
  return (
    <div className="w-24 bg-[#2a2a2a] rounded-l-lg overflow-hidden flex flex-col text-[9px]">
      <div className="p-2 border-b border-gray-600 flex items-center gap-1">
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <img src={logo} alt="" className="w-full h-full object-contain" />
        </div>
        <span className="text-white text-[8px]">녹나무</span>
      </div>
      <div className="flex-1">
        {cats.map((c, i) => (
          <div
            key={c}
            className={`px-2 py-1.5 transition-colors ${
              highlight === "category" && i === 0
                ? "bg-white text-black ring-2 ring-yellow-400"
                : i === 0
                ? "bg-white text-black"
                : "text-gray-400"
            }`}
          >
            {c}
          </div>
        ))}
      </div>
      <div className={`p-2 ${highlight === "staff" ? "ring-2 ring-yellow-400 rounded" : ""}`}>
        <div className={`text-center py-1.5 text-[8px] rounded ${highlight === "staff" ? "bg-yellow-300 text-black" : "bg-white text-black"}`}>
          직원호출
        </div>
      </div>
    </div>
  );
}

function MockMenuGrid({ highlight }: { highlight?: boolean }) {
  const items = ["🍢", "🦑", "🥩", "🍱"];
  return (
    <div className="grid grid-cols-2 gap-2 p-2 flex-1">
      {items.map((emoji, i) => (
        <div
          key={i}
          className={`rounded-lg overflow-hidden border-2 transition-all ${
            highlight && i === 0 ? "border-yellow-400 scale-105 shadow-lg" : "border-gray-200"
          }`}
        >
          <div className="aspect-square bg-gray-100 flex items-center justify-center text-2xl">{emoji}</div>
          <div className="text-center text-[8px] py-1 bg-white">
            <div className="text-gray-700">메뉴 {i + 1}</div>
            <div className="text-gray-500">12,000원</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockCart({ highlight }: { highlight?: "qty" | "order" | "total" }) {
  return (
    <div className="w-28 bg-gray-100 rounded-r-lg border border-gray-200 flex flex-col text-[9px]">
      <div className="p-2 border-b border-gray-300 flex justify-between items-center">
        <span className="font-semibold">제주 한치 꼬치</span>
        <span className="text-gray-400 text-[7px]">삭제</span>
      </div>
      <div className="p-2 flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">기본</span>
          <span>18,000</span>
        </div>
        <div className="text-xl font-bold mb-2">18,000</div>
        <div className={`flex items-center justify-between rounded p-1 ${highlight === "qty" ? "ring-2 ring-yellow-400 bg-yellow-50" : ""}`}>
          <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center font-bold">−</div>
          <span className="font-semibold">1개</span>
          <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center font-bold">+</div>
        </div>
      </div>
      <div className="p-2 bg-white border-t border-gray-200">
        <div className={`flex justify-between mb-1.5 ${highlight === "total" ? "text-yellow-600 font-bold" : ""}`}>
          <span>합계</span>
          <span>18,000</span>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 bg-gray-200 rounded text-center py-1">담기</div>
          <div className={`flex-1 rounded text-center py-1 text-white ${highlight === "order" ? "bg-yellow-500 ring-2 ring-yellow-300" : "bg-[#2a2a2a]"}`}>
            주문
          </div>
        </div>
      </div>
    </div>
  );
}

function MockLangBar({ highlight }: { highlight?: "lang" | "history" }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-between text-[9px]">
      <div className="flex gap-1">
        {["한국어", "English", "日本語", "中文"].map((l, i) => (
          <div
            key={l}
            className={`px-1.5 py-0.5 rounded transition-all ${
              highlight === "lang"
                ? i === 1
                  ? "border-b-2 border-yellow-400 text-yellow-600 font-bold"
                  : "text-gray-400"
                : i === 0
                ? "border-b-2 border-black font-bold"
                : "text-gray-400"
            }`}
          >
            {l}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <div className={`px-2 py-0.5 border border-gray-300 rounded ${highlight === "history" ? "bg-yellow-100 border-yellow-400 text-yellow-700 font-bold" : ""}`}>
          주문내역
        </div>
        <div className="px-2 py-0.5 bg-[#2a2a2a] text-white rounded">장바구니</div>
      </div>
    </div>
  );
}

function MockOrderConfirm() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-3 text-[9px]">
      <div className="text-red-500 text-center font-semibold mb-2 leading-tight">
        장바구니의 상품과 수량을<br />확인하셨습니까?
      </div>
      <div className="flex justify-between mb-1 border-b pb-1">
        <span>제주 한치 꼬치</span>
        <span>1개</span>
        <span>18,000</span>
      </div>
      <div className="flex justify-between font-bold mt-1">
        <span>합계</span>
        <span className="text-red-500">18,000</span>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex-1 bg-gray-200 text-center py-1 rounded">아니요</div>
        <div className="flex-1 bg-[#2a2a2a] text-white text-center py-1 rounded ring-2 ring-yellow-400">예</div>
      </div>
    </div>
  );
}

function MockStaffModal({ highlight }: { highlight?: "grid" | "button" }) {
  const opts = ["냅킨", "물티슈", "물 리필", "얼음", "젓가락", "결제"];
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-3 text-[9px]">
      <div className="font-semibold text-sm mb-1">직원호출 메뉴</div>
      <div className="text-gray-400 mb-2">항목을 선택해주세요.</div>
      <div className={`grid grid-cols-3 gap-1 mb-3 ${highlight === "grid" ? "ring-2 ring-yellow-400 rounded p-1" : ""}`}>
        {opts.map((o) => (
          <div key={o} className="border border-gray-200 text-center py-1.5 rounded hover:bg-gray-50">
            {o}
          </div>
        ))}
      </div>
      <div className={`w-full text-center py-1.5 rounded text-white ${highlight === "button" ? "bg-yellow-500 ring-2 ring-yellow-300" : "bg-[#2a2a2a]"}`}>
        호출
      </div>
    </div>
  );
}

// ── Step data ──────────────────────────────────────────────────────────────────

const STEPS: Record<Exclude<Level, "select">, Step[]> = {
  beginner: [
    {
      title: "카테고리 선택",
      description: "화면 왼쪽 메뉴에서 원하는 카테고리를 탭하세요.\n메인메뉴, 음료, 디저트, 조식세트, 커피&차 중에서 고를 수 있습니다.",
      tip: "처음에는 메인메뉴가 선택되어 있습니다.",
      visual: (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 h-44">
          <MockSidebar highlight="category" />
          <MockMenuGrid />
        </div>
      ),
    },
    {
      title: "메뉴 선택하기",
      description: "원하는 메뉴 카드를 탭하면 장바구니에 자동으로 추가됩니다.\n품절 표시된 메뉴는 선택할 수 없습니다.",
      tip: "메뉴를 탭할 때마다 수량이 1씩 늘어납니다.",
      visual: (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 h-44">
          <MockSidebar />
          <MockMenuGrid highlight />
        </div>
      ),
    },
    {
      title: "장바구니 확인",
      description: "메뉴를 선택하면 오른쪽에 장바구니 패널이 열립니다.\n담은 메뉴 이름과 가격을 확인할 수 있습니다.",
      tip: "하단의 장바구니 버튼으로도 열 수 있습니다.",
      visual: (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 h-44">
          <MockSidebar />
          <MockMenuGrid />
          <MockCart />
        </div>
      ),
    },
  ],
  intermediate: [
    {
      title: "수량 조절하기",
      description: "+ / − 버튼을 눌러 수량을 조절하세요.\n수량을 0으로 낮추면 장바구니에서 삭제됩니다.",
      tip: "수량에 따라 금액이 자동으로 계산됩니다.",
      visual: (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 h-44">
          <MockSidebar />
          <MockMenuGrid />
          <MockCart highlight="qty" />
        </div>
      ),
    },
    {
      title: "주문하기 버튼",
      description: "장바구니 하단의 주문하기 버튼을 눌러 주문을 진행하세요.\n주문 전 최종 확인 화면이 나타납니다.",
      tip: "담기 버튼은 패널을 닫고 메뉴 선택을 계속합니다.",
      visual: (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 h-44">
          <MockSidebar />
          <MockMenuGrid />
          <MockCart highlight="order" />
        </div>
      ),
    },
    {
      title: "주문 최종 확인",
      description: "주문 확인 화면에서 상품과 수량을 다시 한번 확인하세요.\n예를 누르면 주문이 완료됩니다.",
      tip: "아니요를 누르면 장바구니로 돌아갑니다.",
      visual: (
        <div className="flex h-44 items-center justify-center p-4">
          <div className="w-64">
            <MockOrderConfirm />
          </div>
        </div>
      ),
    },
  ],
  advanced: [
    {
      title: "언어 변경",
      description: "화면 하단 바에서 원하는 언어를 탭하세요.\n한국어 · English · 日本語 · 中文을 지원합니다.",
      tip: "언어를 바꾸면 메뉴 이름과 UI가 모두 전환됩니다.",
      visual: (
        <div className="flex flex-col gap-2 p-2">
          <MockLangBar highlight="lang" />
          <div className="text-xs text-center text-gray-400 mt-2">↑ English 탭 선택 시</div>
        </div>
      ),
    },
    {
      title: "주문내역 확인",
      description: "하단 바의 주문내역 버튼을 누르면\n이번 세션에서 주문한 내역을 확인할 수 있습니다.",
      tip: "주문 금액 합계도 한눈에 확인할 수 있습니다.",
      visual: (
        <div className="flex flex-col gap-2 p-2">
          <MockLangBar highlight="history" />
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-[9px]">
            <div className="font-semibold text-sm mb-2">주문내역</div>
            <div className="grid grid-cols-4 gap-1 text-gray-400 border-b pb-1 mb-1">
              <div>상품명</div><div className="text-center">수량</div><div className="text-right">금액</div><div className="text-right">합계</div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <div>모듬꼬치</div><div className="text-center">2개</div><div className="text-right">25,000</div><div className="text-right">50,000</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "사이드바 숨기기",
      description: "좌상단의 ≡ 버튼을 누르면 메뉴 사이드바를 숨길 수 있습니다.\n메뉴 그리드를 더 넓게 볼 때 유용합니다.",
      tip: "헤더의 ≡ 버튼을 다시 누르면 사이드바가 다시 나타납니다.",
      visual: (
        <div className="flex gap-4 items-center justify-center h-36">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 h-32">
            <MockSidebar />
            <MockMenuGrid />
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="flex flex-col rounded-lg overflow-hidden border-2 border-yellow-400 h-32 w-40">
            <div className="bg-white border-b border-gray-200 p-2 flex items-center gap-2">
              <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center text-[8px]">≡</div>
              <span className="text-[9px] font-semibold">녹나무</span>
            </div>
            <MockMenuGrid />
          </div>
        </div>
      ),
    },
  ],
  staffcall: [
    {
      title: "직원호출 버튼",
      description: "왼쪽 사이드바 하단의 직원호출 버튼을 누르세요.\n직원호출 메뉴 팝업이 열립니다.",
      tip: "급할 때는 하단의 호출 버튼 하나로 바로 호출할 수 있습니다.",
      visual: (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 h-44">
          <MockSidebar highlight="staff" />
          <MockMenuGrid />
        </div>
      ),
    },
    {
      title: "필요한 항목 선택",
      description: "냅킨, 물티슈, 물 리필 등 필요한 항목을 선택하세요.\n항목을 누르면 즉시 직원에게 요청이 전달됩니다.",
      tip: "항목을 선택하면 팝업이 자동으로 닫힙니다.",
      visual: (
        <div className="flex h-44 items-center justify-center p-2">
          <div className="w-64">
            <MockStaffModal highlight="grid" />
          </div>
        </div>
      ),
    },
    {
      title: "직원 직접 호출",
      description: "특정 항목 없이 직원만 호출하려면\n하단의 호출 버튼을 누르세요.",
      tip: "호출 후 직원이 테이블로 방문합니다.",
      visual: (
        <div className="flex h-44 items-center justify-center p-2">
          <div className="w-64">
            <MockStaffModal highlight="button" />
          </div>
        </div>
      ),
    },
  ],
};

const LEVEL_COLORS: Record<Exclude<Level, "select">, { bg: string; text: string; progress: string }> = {
  beginner:     { bg: "bg-emerald-50",  text: "text-emerald-700",  progress: "bg-emerald-500" },
  intermediate: { bg: "bg-blue-50",     text: "text-blue-700",     progress: "bg-blue-500" },
  advanced:     { bg: "bg-violet-50",   text: "text-violet-700",   progress: "bg-violet-500" },
  staffcall:    { bg: "bg-amber-50",    text: "text-amber-700",    progress: "bg-amber-500" },
};

// ── Main component ─────────────────────────────────────────────────────────────

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [level, setLevel] = useState<Level>("select");
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => { setLevel("select"); setStep(0); }, 300);
  };

  if (level === "select") {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-xl mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">키오스크 사용 가이드</h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-500 mb-6">학습할 단계를 선택하세요.</p>
          <div className="grid grid-cols-2 gap-4">
            {LEVELS.map((lv) => (
              <button
                key={lv.key}
                onClick={() => { setLevel(lv.key); setStep(0); }}
                className="flex items-center gap-4 p-5 rounded-xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-md transition-all text-left group"
              >
                <div className={`w-12 h-12 ${lv.color} text-white rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  {lv.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-lg">{lv.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold text-white ${lv.color}`}>{lv.badge}</span>
                  </div>
                  <div className="text-sm text-gray-400">{lv.sublabel}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const steps = STEPS[level];
  const current = steps[step];
  const colors = LEVEL_COLORS[level];
  const levelInfo = LEVELS.find((l) => l.key === level)!;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl mx-4 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`${colors.bg} px-6 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLevel("select")}
              className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
            >
              <ChevronLeft className={`w-4 h-4 ${colors.text}`} />
            </button>
            <div className={`w-7 h-7 ${levelInfo.color} text-white rounded-lg flex items-center justify-center`}>
              {levelInfo.icon && <span className="scale-75">{levelInfo.icon}</span>}
            </div>
            <div>
              <span className={`font-bold ${colors.text}`}>{levelInfo.label}</span>
              <span className="text-gray-400 text-sm ml-2">{levelInfo.sublabel}</span>
            </div>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-white/60 rounded-lg transition-colors">
            <X className={`w-4 h-4 ${colors.text}`} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className={`h-full ${colors.progress} transition-all duration-500`}
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 pt-4 pb-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`rounded-full transition-all ${
                i === step ? `w-6 h-2.5 ${colors.progress}` : "w-2.5 h-2.5 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 pb-2">
          <h3 className="text-lg font-bold mt-2 mb-1">
            <span className={`${colors.text} mr-2`}>STEP {step + 1}.</span>
            {current.title}
          </h3>
          <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed mb-3">
            {current.description}
          </p>

          {/* Visual */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 mb-3 overflow-hidden">
            {current.visual}
          </div>

          {/* Tip */}
          {current.tip && (
            <div className={`${colors.bg} rounded-lg px-4 py-2.5 flex items-start gap-2 mb-4`}>
              <span className="text-base mt-0.5">💡</span>
              <p className={`text-sm ${colors.text}`}>{current.tip}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> 이전
          </button>

          <span className="text-sm text-gray-400">{step + 1} / {steps.length}</span>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className={`flex items-center gap-1 px-4 py-2 ${colors.progress} text-white rounded-lg hover:opacity-90 transition-opacity`}
            >
              다음 <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setLevel("select")}
              className={`flex items-center gap-1 px-4 py-2 ${colors.progress} text-white rounded-lg hover:opacity-90 transition-opacity`}
            >
              완료 ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
