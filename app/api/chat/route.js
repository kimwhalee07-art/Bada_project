import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: "당신은 외국인을 위한 한국 선불유심/eSIM 전문 브랜드 '바다(BADA)'의 공식 AI 매니저입니다. 손님의 언어(베트남어, 중국어, 영어, 한국어 등)를 자동 감지하여 동일한 언어로 친절하게 응대하세요. 요금제: 30일 무제한 39,600원, 실속형 15,000원부터, PASS인증팩 29,700원, 단기 eSIM 18,000원. 방문 픽업은 바다 천안 본점 기준입니다."
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    return Response.json({ reply: response.text() });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: '상담 서버에 일시적 오류가 발생했습니다. 잠시 후 다시 질문해주세요.' }, { status: 500 });
  }
}
