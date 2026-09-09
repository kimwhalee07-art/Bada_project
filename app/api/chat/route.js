import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { message } = await req.json();

    const systemInstruction = `
당신은 외국인을 위한 한국 선불유심/eSIM 전문 브랜드 '바다(BADA)'의 공식 AI 매니저입니다.
손님의 언어(베트남어, 중국어, 영어, 한국어 등)를 자동 감지하여 동일한 언어로 친절하게 응대하세요.

[바다(BADA) 공식 규정 안내]
1. 요금제 안내:
   - 데이터 무제한 30일: 월 39,600원 (통화/문자 무제한, 11GB+일2GB 소진 시 3Mbps 속도제어, 여권/외국인등록증 모두 개통 가능)
   - 실속형 선불폰: 15,000원부터 (종량 충전형, 여권 개통 가능)
   - 유학생 PASS팩: 월 29,700원 (외국인등록증 필수, 본인인증 지원)
   - 단기 eSIM: 5일 18,000원 (QR코드 발송)
2. 수령 방식:
   - 매장 방문 픽업: '바다 천안 본점' 및 제휴 대리점 방문 (신분증 원본 필수)
   - 전국 택배 배송: 숙소/원룸으로 1~2일 내 배송
   - eSIM 즉시 발급: 이메일/메신저로 QR코드 발송
3. 핵심 정책:
   - 여권 개통 시 금융/PASS 본인인증 불가. 인증 필요 시 반드시 외국인등록증(ARC) 필요.

답변 끝에는 항상 "바다(BADA) 간편 신청서를 작성하시겠습니까?"를 덧붙이세요.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return Response.json({ reply: response.text });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: '상담 서버에 일시적 오류가 발생했습니다. 잠시 후 다시 질문해주세요.' }, { status: 500 });
  }
}
