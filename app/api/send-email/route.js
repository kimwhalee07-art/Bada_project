import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, html, type } = body;

    if (!to) {
      return NextResponse.json({ success: false, error: '수신자 이메일 주소가 필요합니다.' }, { status: 400 });
    }

    const FROM_EMAIL = 'BADA 고객지원센터 <bada@badahub.co.kr>';
    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. Resend API 키가 등록되어 있을 경우 실제 발송
    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [to],
          subject: subject,
          html: html
        })
      });

      const resData = await res.json();
      if (!res.ok) {
        console.error('Email send failed:', resData);
        return NextResponse.json({ success: false, error: resData }, { status: 500 });
      }

      return NextResponse.json({ success: true, messageId: resData.id });
    }

    // 2. 개발/테스트 단계: 콘솔 로그 기록 및 정상 시뮬레이션 반환
    console.log(`[BADA 이메일 발송]`);
    console.log(`- 발신: ${FROM_EMAIL}`);
    console.log(`- 수신: ${to}`);
    console.log(`- 제목: ${subject}`);
    console.log(`- 유형: ${type || '일반'}`);

    return NextResponse.json({
      success: true,
      simulated: true,
      message: `${to} 주소로 bada@badahub.co.kr 발송 요청이 정상 접수되었습니다.`
    });

  } catch (err) {
    console.error('Email route error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
