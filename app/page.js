'use client';
import React, { useState } from 'react';

export default function BadaPage() {
  const [lang, setLang] = useState('ko');
  
  // 모달 상태 관리
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('데이터 무제한 30일');

  // FAQ 아코디언 열림/닫힘
  const [openFaq, setOpenFaq] = useState(null);

  // 간편 신청서 폼 데이터
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '데이터 무제한 30일',
    idType: 'passport', // 'passport' | 'arc'
    deliveryMethod: 'store' // 'store' | 'delivery' | 'esim'
  });

  // 관리자/직원 로그인 상태
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });
  const [userAuth, setUserAuth] = useState({ role: 'guest', name: '손님' });

  // AI 채팅 메시지
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 바다(BADA) AI 매니저입니다.\n외국인 선불SIM 요금제, 수령 방식, 여권/외국인등록증 안내 등 무엇이든 물어보세요!'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // FAQ 데이터
  const faqs = [
    { q: "여권으로 개통하면 PASS 인증이 되나요?", a: "아닙니다. 여권 개통 유심은 한국 법률상 PASS 본인인증 및 은행 계좌 개설이 불가능합니다. PASS 인증이 필요하신 경우 반드시 외국인등록증(ARC)으로 개통하셔야 합니다." },
    { q: "eSIM은 어떻게 받나요?", a: "신청 완료 즉시 등록하신 이메일 또는 카카오톡/위챗으로 QR코드가 발송됩니다. 스마트폰 설정에서 QR코드만 스캔하시면 유심 칩 교체 없이 즉시 사용 가능합니다." },
    { q: "택배 배송은 얼마나 걸리나요?", a: "평일 기준 오후 4시 이전 접수 건은 당일 출고되며, 전국 숙소/원룸/호텔로 1~2일 내에 무료로 안전하게 배송됩니다." },
    { q: "데이터 무제한의 속도 제한이 있나요?", a: "기본 제공량(11GB + 매일 2GB)을 모두 소진한 후에도 3Mbps 속도로 무제한 이용 가능합니다. 유튜브 고화질(720p) 영상 시청과 SNS, 보이스톡을 끊김 없이 즐기실 수 있습니다." }
  ];

  // 신청서 제출
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert('이름과 전화번호를 입력해주세요.');
      return;
    }
    alert(`신청이 정상 접수되었습니다!\n- 이름: ${form.name}\n- 요금제: ${form.plan}\n바다(BADA) 담당자가 곧 안내 연락을 드립니다.`);
    setShowApplyModal(false);
    setForm({ name: '', email: '', phone: '', plan: '데이터 무제한 30일', idType: 'passport', deliveryMethod: 'store' });
  };

  // 로그인 핸들러
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.id === 'admin' && loginForm.pw === '1234') {
      setUserAuth({ role: 'admin', name: '총괄 관리자' });
      setShowLoginModal(false);
      alert('관리자 모드로 접속했습니다.');
    } else if (loginForm.id === 'cheonan' && loginForm.pw === '1234') {
      setUserAuth({ role: 'staff', name: '천안 본점 매니저' });
      setShowLoginModal(false);
      alert('천안 본점 모드로 접속했습니다.');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // AI 채팅 전송
  const handleSendChat = async (e, directText = null) => {
    if (e) e.preventDefault();
    const textToSend = directText || inputMsg;
    if (!textToSend.trim() || isAiLoading) return;

    setChatMessages((prev) => [...prev, { role: 'user', content: textToSend }]);
    if (!directText) setInputMsg('');
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: 'assistant', content: '응답 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b' }}>

      {/* 1. 상단 글로벌 네비게이션 헤더 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: '18px' }}>
              B
            </div>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>BADA</span>
          </div>

          {/* 중앙 메뉴 (데스크톱) */}
          <nav style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
            <a href="#plans" style={{ textDecoration: 'none', color: 'inherit' }}>요금제</a>
            <a href="#delivery" style={{ textDecoration: 'none', color: 'inherit' }}>수령방법</a>
            <a href="#guide" style={{ textDecoration: 'none', color: 'inherit' }}>안내사항</a>
            <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>자주묻는질문</a>
          </nav>

          {/* 우측 유틸리티 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {userAuth.role === 'guest' ? (
              <button 
                onClick={() => setShowLoginModal(true)} 
                style={{ background: 'none', border: 'none', fontSize: '13px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}
              >
                <span>🔒</span> 로그인
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '3px 8px', borderRadius: '6px' }}>{userAuth.name}</span>
                <button onClick={() => setUserAuth({ role: 'guest', name: '손님' })} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#ef4444', cursor: 'pointer' }}>로그아웃</button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px' }}>
              <span>🌐</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ border: 'none', background: 'transparent', fontSize: '13px', color: '#475569', outline: 'none', cursor: 'pointer' }}>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>

            <button 
              onClick={() => { setSelectedPlanForModal('데이터 무제한 30일'); setShowApplyModal(true); }}
              style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 6px rgba(2,132,199,0.3)' }}
            >
              신청하기
            </button>
          </div>
        </div>
      </header>

      {/* 2. 다크 네이비 히어로 섹션 */}
      <section style={{ backgroundColor: '#0b1329', color: '#ffffff', padding: '70px 20px 80px 20px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '30px', padding: '6px 14px', fontSize: '13px', color: '#7dd3fc', marginBottom: '22px' }}>
            <span>⚡</span> 외국인 전용 안심 선불유심/eSIM
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.25', margin: '0 0 18px 0', letterSpacing: '-1px' }}>
            한국에서 가장 편리한 <span style={{ color: '#38bdf8' }}>유심 & eSIM</span>
          </h1>

          <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6', margin: '0 auto 32px auto', maxWidth: '600px' }}>
            여권 또는 외국인등록증으로 5분 만에 개통. 데이터 무제한, 통화 무제한, 전국 택배 배송. <strong>바다(BADA)</strong>에서 시작하세요.
          </p>

          {/* 히어로 CTA 버튼 2개 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '50px' }}>
            <a 
              href="#plans" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#0284c7', color: '#ffffff', padding: '13px 26px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }}
            >
              요금제 보기 <span>↓</span>
            </a>
            <button 
              onClick={() => setShowChat(true)} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', padding: '13px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              <span>💬</span> 상담하기
            </button>
          </div>

          {/* 3대 특장점 카드 3개 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '780px', margin: '0 auto' }}>
            {[
              { icon: '⚡', title: '5분', sub: '신속 개통' },
              { icon: '🤖', title: '24시간', sub: 'AI 상담' },
              { icon: '🚀', title: '전국', sub: '택배 배송' }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(2,132,199,0.15)', color: '#38bdf8', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '18px', fontWeight: '800' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. 요금제 안내 섹션 */}
      <section id="plans" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>요금제 안내</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>외국인의 라이프스타일에 맞춘 4가지 요금제</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          {/* 1. 무제한 30일 (BEST) */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid #0284c7', padding: '24px', position: 'relative', boxShadow: '0 4px 20px rgba(2,132,199,0.08)', display: 'flex', flexDirection: 'column' }}>
            <span style={{ position: 'absolute', top: '-11px', right: '20px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
              BEST
            </span>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📶</div>
            <div style={{ fontSize: '17px', fontWeight: 'bold' }}>데이터 무제한 30일</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>데이터와 통화를 마음껏</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284c7', marginBottom: '16px' }}>₩ 39,600 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>/월</span></div>
            
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
              <div>✓ 무제한 데이터 (11GB + 일 2GB 소진 후 3Mbps)</div>
              <div>✓ 통화/문자 무제한</div>
              <div>✓ 여권/외국인등록증 모두 개통 가능</div>
              <div>✓ 30일 자동 연장 가능</div>
            </div>

            <button 
              onClick={() => { setSelectedPlanForModal('데이터 무제한 30일'); setShowApplyModal(true); }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
            >
              가입 신청
            </button>
          </div>

          {/* 2. 실속형 선불폰 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
            <div style={{ fontSize: '17px', fontWeight: 'bold' }}>실속형 선불폰</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>종량 충전형</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>₩ 15,000 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>/부터</span></div>
            
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
              <div>✓ 필요한 만큼만 충전</div>
              <div>✓ 여권 개통 가능</div>
              <div>✓ 기본 요금 15,000원부터</div>
              <div>✓ 충전 금액만큼 사용</div>
            </div>

            <button 
              onClick={() => { setSelectedPlanForModal('실속형 선불폰'); setShowApplyModal(true); }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
            >
              가입 신청
            </button>
          </div>

          {/* 3. 유학생 PASS팩 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎓</div>
            <div style={{ fontSize: '17px', fontWeight: 'bold' }}>유학생 PASS팩</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>본인인증 완벽 지원</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>₩ 29,700 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>/월</span></div>
            
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
              <div>✓ 외국인등록증(ARC) 필수</div>
              <div>✓ 은행 계좌 개설 지원</div>
              <div>✓ 토스/배달앱 본인인증</div>
              <div>✓ 유학생 특화 혜택</div>
            </div>

            <button 
              onClick={() => { setSelectedPlanForModal('유학생 PASS팩'); setShowApplyModal(true); }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
            >
              가입 신청
            </button>
          </div>

          {/* 4. 단기 eSIM */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✈️</div>
            <div style={{ fontSize: '17px', fontWeight: 'bold' }}>단기 eSIM</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>대한민국 여행/출장 전용</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>₩ 18,000 <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>/5일</span></div>
            
            <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
              <div>✓ 5일간 데이터 사용</div>
              <div>✓ QR코드로 이메일/메신저 발송</div>
              <div>✓ 물리 유심 불필요</div>
              <div>✓ 즉시 개통</div>
            </div>

            <button 
              onClick={() => { setSelectedPlanForModal('단기 eSIM'); setShowApplyModal(true); }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
            >
              가입 신청
            </button>
          </div>

        </div>
      </section>

      {/* 4. 수령 방식 3단계 섹션 */}
      <section id="delivery" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '70px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>수령 방식</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>원하시는 방법으로 편하게 받으세요</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { num: '01', icon: '🏬', title: '매장 방문 픽업', desc: '바다 천안 본점 및 제휴 대리점 방문 (실물 여권 또는 외국인등록증 원본 필수)' },
              { num: '02', icon: '📦', title: '전국 택배 배송', desc: '숙소/원룸으로 1~2일 내 배송. 전국 어디나 빠르고 안전하게 무료 배송' },
              { num: '03', icon: '📲', title: 'eSIM 즉시 발급', desc: '이메일 또는 메신저로 QR코드 전송. 유심 교체 없이 즉시 사용 가능' }
            ].map((step) => (
              <div key={step.num} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '30px', fontWeight: '900', color: '#e2e8f0' }}>{step.num}</div>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{step.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{step.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{step.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. 핵심 안내 사항 (여권 vs ARC 비교) */}
      <section id="guide" style={{ maxWidth: '900px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>핵심 안내 사항</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>여권 vs 외국인등록증 — 꼭 확인하세요</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* 여권 개통 카드 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #fef08a', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>🛂</span>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>여권 개통</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>여권으로 개통 시 기본 통신 서비스는 정상 이용 가능합니다.</p>
            <div style={{ fontSize: '13px', lineHeight: '2.0' }}>
              <div style={{ color: '#16a34a' }}>✓ 데이터/통화/문자 사용 가능</div>
              <div style={{ color: '#dc2626' }}>✕ PASS 본인인증 불가능</div>
              <div style={{ color: '#dc2626' }}>✕ 은행 계좌 개설 제한</div>
              <div style={{ color: '#dc2626' }}>✕ 토스/배달앱 인증 불가</div>
            </div>
          </div>

          {/* 외국인등록증(ARC) 개통 카드 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid #22c55e', padding: '28px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-11px', right: '20px', backgroundColor: '#22c55e', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
              RECOMMENDED
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>🪪</span>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>외국인등록증(ARC) 개통</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>외국인등록증으로 개통 시 모든 서비스 인증이 가능합니다.</p>
            <div style={{ fontSize: '13px', lineHeight: '2.0', color: '#16a34a' }}>
              <div>✓ 데이터/통화/문자 사용 가능</div>
              <div>✓ PASS 본인인증 가능</div>
              <div>✓ 은행 계좌 개설 지원</div>
              <div>✓ 토스/배달앱 인증 완벽 지원</div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FAQ (자주 묻는 질문) */}
      <section id="faq" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '70px 20px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              ❓
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>FAQ</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: '100%', padding: '18px 20px', backgroundColor: '#ffffff', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', fontWeight: 'bold', color: '#1e293b', cursor: 'pointer' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '18px', color: '#94a3b8' }}>{openFaq === idx ? '▲' : '▼'}</span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 20px 18px 20px', fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. 푸터 */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', textAlign: 'center', fontSize: '13px', lineHeight: '1.8' }}>
        <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>BADA - 바다 외국인 유심 센터</div>
        <div>충청남도 천안시 동남구 대흥로 (천안 본점) | 고객센터: 010-XXXX-XXXX</div>
        <div style={{ marginTop: '12px', color: '#64748b' }}>© 2026 BADA. All rights reserved.</div>
      </footer>

      {/* 8. 간편 신청서 모달 (영상 00:18 시연) */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '460px', padding: '28px', position: 'relative', boxShadow: '0 20px 30px rgba(0,0,0,0.2)' }}>
            
            <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>

            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>간편 신청서</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>아래 정보를 입력해주시면 빠르게 개통을 도와드립니다</p>

            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div>
                <input 
                  type="text" 
                  placeholder="👤 이름 *" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input 
                  type="email" 
                  placeholder="✉️ 이메일 *" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  required 
                />
                <input 
                  type="tel" 
                  placeholder="📞 전화번호 *" 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>요금제 선택 *</label>
                <select 
                  value={form.plan} 
                  onChange={(e) => setForm({ ...form, plan: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  <option value="데이터 무제한 30일">데이터 무제한 30일 (₩ 39,600)</option>
                  <option value="실속형 선불폰">실속형 선불폰 (₩ 15,000부터)</option>
                  <option value="유학생 PASS팩">유학생 PASS팩 (₩ 29,700)</option>
                  <option value="단기 eSIM">단기 eSIM (₩ 18,000)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>신분증 종류 *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[{ id: 'passport', label: '여권' }, { id: 'arc', label: '외국인등록증' }].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setForm({ ...form, idType: item.id })}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: form.idType === item.id ? '2px solid #0284c7' : '1px solid #cbd5e1',
                        backgroundColor: form.idType === item.id ? '#f0f9ff' : '#ffffff',
                        color: form.idType === item.id ? '#0284c7' : '#475569',
                        fontWeight: form.idType === item.id ? 'bold' : 'normal',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>수령 방법 *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                  {[
                    { id: 'store', label: '매장 픽업' },
                    { id: 'delivery', label: '택배 배송' },
                    { id: 'esim', label: 'eSIM 발급' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setForm({ ...form, deliveryMethod: m.id })}
                      style={{
                        padding: '9px 4px',
                        borderRadius: '8px',
                        border: form.deliveryMethod === m.id ? '2px solid #0284c7' : '1px solid #cbd5e1',
                        backgroundColor: form.deliveryMethod === m.id ? '#f0f9ff' : '#ffffff',
                        color: form.deliveryMethod === m.id ? '#0284c7' : '#475569',
                        fontWeight: form.deliveryMethod === m.id ? 'bold' : 'normal',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '13px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
              >
                신청 완료
              </button>

            </form>
          </div>
        </div>
      )}

      {/* 9. 로그인 모달 (영상 00:19 시연) */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '360px', padding: '28px', position: 'relative' }}>
            
            <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>

            <h3 style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center', margin: '0 0 16px 0' }}>BADA 로그인</h3>

            <button 
              type="button"
              onClick={() => alert('구글 소셜 로그인은 정식 서비스 연동 후 지원됩니다.')}
              style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', marginBottom: '14px' }}
            >
              <span>🌐</span> Google로 로그인
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0', color: '#94a3b8', fontSize: '12px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
              <span>또는 이메일 로그인</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="✉️ 아이디 / 이메일" 
                value={loginForm.id} 
                onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                required 
              />
              <input 
                type="password" 
                placeholder="🔒 비밀번호" 
                value={loginForm.pw} 
                onChange={(e) => setLoginForm({ ...loginForm, pw: e.target.value })} 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                required 
              />
              <button 
                type="submit" 
                style={{ width: '100%', padding: '11px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}
              >
                로그인
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: '#64748b' }}>
              관리자/직원 전용 로그인 지원
            </div>
          </div>
        </div>
      )}

      {/* 10. 바다(BADA) AI 실시간 상담창 (영상 00:11 시연) */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        {!showChat ? (
          <button 
            onClick={() => setShowChat(true)}
            style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', fontSize: '24px', boxShadow: '0 4px 16px rgba(2,132,199,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            💬
          </button>
        ) : (
          <div style={{ width: '340px', height: '460px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            
            {/* 상담창 헤더 */}
            <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>BADA AI 매니저</div>
                <div style={{ fontSize: '11px', color: '#bae6fd' }}>24시간 언제든 상담하세요!</div>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}>×</button>
            </div>

            {/* 대화 내용 */}
            <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ padding: '9px 12px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#0284c7' : '#f1f5f9', color: msg.role === 'user' ? '#ffffff' : '#1e293b', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* 퀵 바로가기 질문 버튼들 (첫 턴에 제공) */}
              {chatMessages.length === 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {['요금제 안내', '수령 방법', '여권 vs 등록증', 'eSIM 발급'].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => handleSendChat(null, tag)}
                      style={{ padding: '5px 10px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '11px', color: '#0284c7', cursor: 'pointer' }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {isAiLoading && (
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>바다 AI가 답변을 작성하고 있습니다...</div>
              )}
            </div>

            {/* 입력창 */}
            <form onSubmit={handleSendChat} style={{ padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px' }}>
              <input 
                type="text" 
                placeholder="메시지를 입력하세요..." 
                value={inputMsg} 
                onChange={(e) => setInputMsg(e.target.value)} 
                style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
              <button 
                type="submit" 
                style={{ padding: '9px 14px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                전송
              </button>
            </form>

          </div>
        )}
      </div>

    </div>
  );
}
