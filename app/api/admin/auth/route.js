import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// 로그인 시도 제한 (서버 메모리 기준)
const MAX_FAILS = 8;
const WINDOW_MS = 10 * 60 * 1000;
const fails = new Map();

function isLocked(ip) {
  const rec = fails.get(ip);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW_MS) {
    fails.delete(ip);
    return false;
  }
  return rec.count >= MAX_FAILS;
}

function markFail(ip) {
  const rec = fails.get(ip);
  if (!rec || Date.now() - rec.first > WINDOW_MS) {
    fails.set(ip, { count: 1, first: Date.now() });
  } else {
    rec.count += 1;
  }
}

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a || ''), 'utf8').digest();
  const hb = crypto.createHash('sha256').update(String(b || ''), 'utf8').digest();
  return crypto.timingSafeEqual(ha, hb);
}

function readStaffAccounts() {
  const raw = process.env.STAFF_ACCOUNTS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((s) => s && typeof s.id === 'string' && typeof s.pw === 'string')
      .map((s) => ({
        id: s.id,
        pw: s.pw,
        name: typeof s.name === 'string' ? s.name : s.id,
        dept: typeof s.dept === 'string' ? s.dept : '고객 상담팀'
      }));
  } catch (e) {
    return [];
  }
}

export async function POST(req) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminId = process.env.ADMIN_ID || 'admin';

  // 환경변수가 설정되지 않으면 로그인 자체를 차단 (기본 비밀번호로 열리지 않게)
  if (!adminPassword) {
    return NextResponse.json(
      {
        success: false,
        disabled: true,
        error: 'ADMIN_PASSWORD 환경변수가 설정되지 않아 관리자 로그인이 비활성화되어 있습니다.'
      },
      { status: 503 }
    );
  }

  const ip =
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (isLocked(ip)) {
    return NextResponse.json(
      { success: false, error: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 429 }
    );
  }

  let body = {};
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ success: false, error: '요청 형식이 올바르지 않습니다.' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id.trim() : '';
  const pw = typeof body.pw === 'string' ? body.pw.trim() : '';

  if (!id || !pw) {
    return NextResponse.json({ success: false, error: '아이디와 비밀번호를 입력하세요.' }, { status: 400 });
  }

  // 총괄 관리자
  if (safeEqual(id, adminId) && safeEqual(pw, adminPassword)) {
    fails.delete(ip);
    return NextResponse.json({
      success: true,
      role: 'admin',
      staff: { id: adminId, name: '총괄 관리자 (대표)', dept: '본사 총괄' }
    });
  }

  // 상담 직원 (STAFF_ACCOUNTS 환경변수에 등록된 계정만 허용)
  const staff = readStaffAccounts().find((s) => safeEqual(s.id, id) && safeEqual(s.pw, pw));
  if (staff) {
    fails.delete(ip);
    return NextResponse.json({
      success: true,
      role: 'worker',
      staff: { id: staff.id, name: staff.name, dept: staff.dept }
    });
  }

  markFail(ip);
  return NextResponse.json(
    { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
    { status: 401 }
  );
}
