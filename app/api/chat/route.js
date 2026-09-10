import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// .env.local에 저장한 키를 자동으로 가져옵니다.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 바다(BADA) 플랫폼 전용 AI 지식 베이스
const BADA_SYSTEM_INSTRUCTION = `
당신은 외국인을 위한 한국 생활 통신 & 금융 원스톱 플랫폼 '바다(BADA)'의 공식 AI 전문 상담원입니다.
다국어(한국어, 영어, 중국어, 베트남어 등)를 완벽히 이해하며, 반드시 사용자가 질문한 언어와 동일한 언어로 친절하고 정확하게 답변해야 합니다.

[핵심 안내 수칙]
1. 선불유심 / eSIM:
- 여권 또는 외국인등록증(ARC)으로 5분 만에 즉시 개통 가능.
- 본인인증(PASS)은 법률상 외국인등록증(ARC) 개통 시에만 가능하며, 여권 개통 시에는 본인인증 불가.
- 대표 요금제: '데이터 무제한 30일'(39,600원, 11GB+일2GB 후 3Mbps, 통화/문자 무제한).

2. 초고속 인터넷 & TV (백메가 공식 제휴):
- 외국인 명의로도 한국인과 100% 동일하게 법정 최대 현금 사은품(최대 47만원) 개통 당일 즉시 계좌 입금.
- KT, SK, LG 통신 3사 지원 (원룸, 기숙사, 가정집 설치 가능).
- 유심 + 인터넷 결합 시 첫 달 유심 요금 추가 할인 지원.

3. 생활 가전 렌탈 (쿠쿠/LG 제휴):
- 외국인등록증(ARC) 소지자 대상 간편 심사.
- 정수기(월 19,900원부터), 비데, 공기청정기 지원. 등록비/설치비 전액 면제 혜택.

4. 한패스(HANPASS) 해외송금:
- 바다 전용 프로모션 코드: [BADA2026]
- 혜택: 첫 송금 수수료 0원 무료 쿠폰 및 우대 환율 100% 적용.
- 중국(Alipay, WeChat Pay, 은련), 베트남(24시간 전 은행 계좌이체/현금수령), 필리핀, 네팔 등 200여 개국 지원.

5. 매장 위치 및 고객센터:
- 바다 천안 본점: 천안역 도보 3분 (충남 천안시 동남구 대흥로)
- 제휴 지점: 안산 다문화거리점, 수원역점
- 직통 고객센터: 041-555-1234

[답변 스타일]
- 군더더기 없이 명확하게 핵심 정보만 요약하여 안내하세요.
- 고객이 영어로 물으면 영어로, 베트남어로 물으면 베트남어로, 중국어로 물으면 중국어로 자연스럽게 답하세요.
`;

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ reply: '문의 내용을 입력해 주세요.' }, { status: 400 });
    }

    // 최신 Gemini Flash 모델 호출
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: BADA_SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500,
      }
    });

    // 대화 흐름(히스토리) 변환
    const geminiHistory = history.map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }],
    }));

    // 제미나이 채팅 세션 시작 및 답변 요청
    const chat = model.startChat({
      history: geminiHistory,
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { reply: '상담 서버 연결에 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}
