import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, customerId } = body;

    return NextResponse.json({
      success: true,
      status: 'received',
      reply: '메시지가 담당 직원에게 안전하게 전달되었습니다.'
    });

  } catch (err) {
    return NextResponse.json({ 
      success: false, 
      reply: '서버 처리 중 오류가 발생했습니다.' 
    }, { status: 500 });
  }
}
