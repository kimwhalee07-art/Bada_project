'use client';
import React, { useState } from 'react';

export default function BadaPage() {
  const [lang, setLang] = useState('ko');

  // 모달 상태 관리
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('데이터 무제한 30일');

  // 관리자 전용 편집 모달 상태
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null); // null이면 신규 추가
  const [showEditStoreModal, setShowEditStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  // FAQ 아코디언 열림/닫힘
  const [openFaq, setOpenFaq] = useState(null);

  // 관리자/직원 로그인 상태
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });
  const [userAuth, setUserAuth] = useState({ role: 'guest', name: '손님', branchId: null });

  // 1. 매장(지점) 상태 관리
  const [stores, setStores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 도보 3분)', phone: '041-555-1234' },
    { id: 'ansan', name: '바다 안산 다문화거리점', address: '경기 안산시 단원구 원곡동', phone: '031-444-5678' },
    { id: 'suwon', name: '바다 수원역점', address: '경기 수원시 팔달구 매산로', phone: '031-222-9876' }
  ]);

  // 2. 요금제 상태 관리
  const [plans, setPlans] = useState([
    { id: 1, name: '데이터 무제한 30일', sub: '데이터와 통화를 마음껏', price: '39,600', unit: '/월', isBest: true, icon: '📶', desc: ['무제한 데이터 (11GB + 일2GB 후 3Mbps)', '통화/문자 무제한', '여권/외국인등록증 모두 개통 가능', '30일 자동 연장 가능'] },
    { id: 2, name: '실속형 선불폰', sub: '종량 충전형', price: '15,000', unit: '/부터', isBest: false, icon: '📱', desc: ['필요한 만큼만 충전', '여권 개통 가능', '기본 요금 15,000원부터', '충전 금액만큼 사용'] },
    { id: 3, name: '유학생 PASS팩', sub: '본인인증 완벽 지원', price: '29,700', unit: '/월', isBest: false, icon: '🎓', desc: ['외국인등록증(ARC) 필수', '은행 계좌 개설 지원', '토스/배달앱 본인인증', '유학생 특화 요금 할인'] },
    { id: 4, name: '단기 eSIM', sub: '여행/단기 출장 전용', price: '18,000', unit: '/5일', isBest: false, icon: '✈️', desc: ['5일간 데이터 무제한', 'QR코드로 이메일/메신저 전송', '물리 유심 교체 불필요', '신청 즉시 개통'] }
  ]);

  // 간편 신청서 폼 데이터
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '데이터 무제한 30일',
    idType: 'passport',
    deliveryMethod: 'store',
    pickupStore: 'cheonan',
    address: ''
  });

  // 접수 목록 (관리자/직원 열람용)
  const [orders, setOrders] = useState([
    { id: 1, name: 'NGUYEN VAN A', phone: '010-9988-7766', plan: '데이터 무제한 30일', method: '매장 픽업 (천안 본점)', time: '10분 전' }
  ]);

  // 3. 채팅 모드 및 상태 관리 (AI 상담 vs 직원 라이브 상담)
  const [chatMode, setChatMode] = useState('ai'); // 'ai' | 'human'
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 바다(BADA) AI 매니저입니다.\n외국인 선불SIM 요금제, 수령 방식, 여권/외국인등록증 안내 등 무엇이든 물어보세요!' }
  ]);
  const [staffMessages, setStaffMessages] = useState([
    { sender: 'staff', name: '천안본점 매니저', time: '방금', content: '반갑습니다! 바다 천안 본점 상담 직원입니다. 원하는 요금제나 개통 서류에 대해 남겨주시면 실시간 응대해 드립니다.' }
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
    const storeInfo = stores.find(s => s.id === form.pickupStore);
    const newOrder = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      plan: form.plan,
      method: form.deliveryMethod === 'store' ? `매장 픽업 (${storeInfo?.name || '천안 본점'})` : form.deliveryMethod === 'delivery' ? `택배 배송 (${form.address})` : 'eSIM 발급',
      time: '방금 전'
    };
    setOrders([newOrder, ...orders]);
    alert(`신청이 정상 접수되었습니다!\n- 성함: ${form.name}\n- 요금제: ${form.plan}\n바다(BADA) 담당 직원이 곧 연락을 드립니다.`);
    setShowApplyModal(false);
    setForm({ name: '', email: '', phone: '', plan: '데이터 무제한 30일', idType: 'passport', deliveryMethod: 'store', pickupStore: 'cheonan', address: '' });
  };

  // 로그인 처리
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.id === 'admin' && loginForm.pw === '1234') {
      setUserAuth({ role: 'admin', name: '총괄 관리자', branchId: null });
      setShowLoginModal(false);
      alert('총괄 관리자 권한으로 로그인되었습니다. (매장/요금제 추가 및 수정 가능)');
    } else if (loginForm.id === 'cheonan' && loginForm.pw === '1234') {
      setUserAuth({ role: 'staff', name: '바다 천안 본점', branchId: 'cheonan' });
      setShowLoginModal(false);
      alert('천안 본점 매니저로 로그인되었습니다.');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다. (테스트 관리자 ID: admin / PW: 1234)');
    }
  };

  // AI 채팅 전송
  const handleSendChat = async (e, directText = null) => {
    if (e) e.preventDefault();
    const textToSend = directText || inputMsg;
    if (!textToSend.trim()) return;

    if (chatMode === 'human') {
      setStaffMessages(prev => [...prev, { sender: 'customer', name: '나', time: '방금', content: textToSend }]);
      setInputMsg('');
      setTimeout(() => {
        setStaffMessages(prev => [...prev, { sender: 'staff', name: '직원 상담원', time: '방금', content: '문의가 접수되었습니다. 개통 전문 직원이 빠르게 확인 후 실시간 답변을 전달해 드립니다!' }]);
      }, 1000);
      return;
    }

    if (isAiLoading) return;
    setChatMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    if (!directText) setInputMsg('');
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: '답변을 불러오는 중 일시적 오류가 발생했습니다. 아래 "직원 상담" 탭을 눌러 직원에게 직접 남겨주세요.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // 요금제 저장 (추가/수정)
  const handleSavePlan = (e) => {
    e.preventDefault();
    if (editingPlan.id) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    } else {
      setPlans([...plans, { ...editingPlan, id: Date.now() }]);
    }
    setShowEditPlanModal(false);
    setEditingPlan(null);
  };

  // 매장 저장 (추가/수정)
  const handleSaveStore = (e) => {
    e.preventDefault();
    if (stores.some(s => s.id === editingStore.id && (!editingStore.isNew))) {
      setStores(stores.map(s => s.id === editingStore.id ? editingStore : s));
    } else {
      setStores([...stores, editingStore]);
    }
    setShowEditStoreModal(false);
    setEditingStore(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b' }}>

      {/* 1. 상단 글로벌 네비게이션 헤더 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: '18px' }}>
              B
            </div>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>BADA</span>
          </div>

          <nav style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
            <a href="#plans" style={{ textDecoration: 'none', color: 'inherit' }}>요금제</a>
            <a href="#delivery" style={{ textDecoration: 'none', color: 'inherit' }}>수령매장</a>
            <a href="#guide" style={{ textDecoration: 'none', color: 'inherit' }}>안내사항</a>
            <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</a>
          </nav>

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
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '4px 10px', borderRadius: '6px' }}>
                  🔑 {userAuth.name}
                </span>
                <button onClick={() => setUserAuth({ role: 'guest', name: '손님', branchId: null })} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#ef4444', cursor: 'pointer' }}>로그아웃</button>
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

      {/* [관리자 로그인 시 노출되는 실시간 접수 현황 바] */}
      {userAuth.role !== 'guest' && (
        <div style={{ backgroundColor: '#0369a1', color: '#ffffff', padding: '12px 20px' }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <span><strong>📋 {userAuth.name} 전용 대시보드</strong> | 접수된 주문: <strong>{orders.length}건</strong></span>
            <span style={{ color: '#bae6fd' }}>아래 요금제 및 매장 섹션에서 직접 수정/추가/삭제할 수 있습니다.</span>
          </div>
        </div>
      )}

      {/* 2. 다크 네이비 히어로 섹션 */}
      <section style={{ backgroundColor: '#0b1329', color: '#ffffff', padding: '70px 20px 80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '30px', padding: '6px 14px', fontSize: '13px', color: '#7dd3fc', marginBottom: '22px' }}>
            <span>⚡</span> 외국인 전용 안심 선불유심 & eSIM 센터
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.25', margin: '0 0 18px 0', letterSpacing: '-1px' }}>
            한국에서 가장 편리한 <span style={{ color: '#38bdf8' }}>유심 & eSIM</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: '1.6', margin: '0 auto 32px auto', maxWidth: '600px' }}>
            여권 또는 외국인등록증으로 5분 만에 개통. 24시간 AI 상담과 담당 직원 1:1 직통 케어를 지원합니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '50px' }}>
            <a href="#plans" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#0284c7', color: '#ffffff', padding: '13px 26px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none' }}>
              요금제 보기 <span>↓</span>
            </a>
            <button onClick={() => setShowChat(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', padding: '13px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              <span>💬</span> 실시간 상담하기
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '780px', margin: '0 auto' }}>
            {[
              { icon: '⚡', title: '5분', sub: '신속 개통 지원' },
              { icon: '🤖', title: 'AI + 직원', sub: '실시간 하이브리드 상담' },
              { icon: '🏬', title: '천안본점 & 제휴망', sub: '당일 수령 & 전국 택배' }
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

      {/* 3. 요금제 안내 섹션 (+ 관리자 요금제 수정/추가/삭제) */}
      <section id="plans" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>요금제 안내</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>외국인의 체류 목적에 최적화된 맞춤 플랜</p>
          </div>
          {userAuth.role === 'admin' && (
            <button 
              onClick={() => {
                setEditingPlan({ name: '', sub: '', price: '', unit: '/월', isBest: false, icon: '📱', desc: ['데이터 제공', '통화 기본'] });
                setShowEditPlanModal(true);
              }}
              style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              + 새 요금제 등록
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {plans.map((plan) => (
            <div key={plan.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: plan.isBest ? '2px solid #0284c7' : '1px solid #e2e8f0', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {plan.isBest && (
                <span style={{ position: 'absolute', top: '-11px', right: '20px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
                  BEST
                </span>
              )}
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{plan.icon}</div>
              <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{plan.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>{plan.sub}</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284c7', marginBottom: '16px' }}>
                ₩ {plan.price} <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>{plan.unit}</span>
              </div>

              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
                {plan.desc.map((d, idx) => (
                  <div key={idx}>✓ {d}</div>
                ))}
              </div>

              {/* 관리자 모드: 수정/삭제 버튼 노출 */}
              {userAuth.role === 'admin' ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => { setEditingPlan({ ...plan }); setShowEditPlanModal(true); }}
                    style={{ flex: 1, padding: '9px', backgroundColor: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                  >
                    수정
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`'${plan.name}' 요금제를 정말 삭제할까요?`)) {
                        setPlans(plans.filter(p => p.id !== plan.id));
                      }
                    }}
                    style={{ padding: '9px 12px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setSelectedPlanForModal(plan.name); setShowApplyModal(true); }}
                  style={{ width: '100%', padding: '12px', backgroundColor: plan.isBest ? '#0284c7' : '#f1f5f9', color: plan.isBest ? '#ffffff' : '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  가입 신청
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. 수령 방식 및 매장 섹션 (+ 관리자 매장 수정/추가/삭제) */}
      <section id="delivery" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '70px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>수령 방식 및 픽업 매장</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>가까운 매장 픽업, 무료 택배 배송 또는 eSIM으로 즉시 발급받으세요.</p>
            </div>
            {userAuth.role === 'admin' && (
              <button 
                onClick={() => {
                  setEditingStore({ id: `store_${Date.now()}`, name: '', address: '', phone: '', isNew: true });
                  setShowEditStoreModal(true);
                }}
                style={{ backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                + 제휴 지점 등록
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '36px' }}>
            {[
              { num: '01', icon: '🏬', title: '매장 방문 픽업', desc: '바다 천안 본점 및 제휴 대리점 방문. (실물 여권 또는 외국인등록증 지참)' },
              { num: '02', icon: '📦', title: '전국 택배 배송', desc: '체류 숙소/원룸으로 1~2일 내 배송. 전국 어디나 안전하고 빠른 무료 배송' },
              { num: '03', icon: '📲', title: 'eSIM 즉시 발급', desc: '이메일 또는 메신저로 QR코드 전송. 실물 칩 교체 없이 즉시 통신 개통' }
            ].map((step) => (
              <div key={step.num} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '30px', fontWeight: '900', color: '#e2e8f0' }}>{step.num}</div>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{step.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{step.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* 현재 등록된 제휴 매장 리스트 */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#0f172a' }}>📍 당일 방문 수령 가능한 매장 목록 ({stores.length}곳)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {stores.map((s) => (
                <div key={s.id} style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0284c7' }}>{s.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.address}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>📞 {s.phone}</div>
                  </div>
                  {userAuth.role === 'admin' && (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        onClick={() => { setEditingStore({ ...s }); setShowEditStoreModal(true); }}
                        style={{ padding: '6px 10px', backgroundColor: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => {
                          if (stores.length === 1) return alert('최소 1개의 매장은 유지되어야 합니다.');
                          if (confirm(`'${s.name}' 매장을 삭제할까요?`)) {
                            setStores(stores.filter(item => item.id !== s.id));
                          }
                        }}
                        style={{ padding: '6px 8px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 핵심 안내 사항 (여권 vs ARC 비교) */}
      <section id="guide" style={{ maxWidth: '900px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>핵심 안내 사항</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>여권 개통 vs 외국인등록증(ARC) 개통 규정 비교</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #fef08a', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>🛂</span>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>여권 개통</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>단기 체류자 및 입국 초기 외국인을 위한 신속 개통</p>
            <div style={{ fontSize: '13px', lineHeight: '2.0' }}>
              <div style={{ color: '#16a34a' }}>✓ 데이터/통화/문자 완벽 사용</div>
              <div style={{ color: '#dc2626' }}>✕ 통신사 PASS 본인인증 불가</div>
              <div style={{ color: '#dc2626' }}>✕ 시중 은행 계좌 개설 불가</div>
              <div style={{ color: '#dc2626' }}>✕ 배달의민족/토스 인증 불가</div>
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid #22c55e', padding: '28px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-11px', right: '20px', backgroundColor: '#22c55e', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
              추천 플랜
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>🪪</span>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>외국인등록증(ARC) 개통</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>유학생, 취업비자 등 장기 체류자를 위한 정식 개통</p>
            <div style={{ fontSize: '13px', lineHeight: '2.0', color: '#16a34a' }}>
              <div>✓ 데이터/통화/문자 무제한 사용</div>
              <div>✓ 통신사 PASS 본인인증 지원</div>
              <div>✓ 시중 은행 계좌 개설 완벽 지원</div>
              <div>✓ 모든 한국 금융 및 배달앱 인증 가능</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ (자주 묻는 질문) */}
      <section id="faq" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '70px 20px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>❓</div>
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
        <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>BADA - 바다 외국인 유심 개통 센터</div>
        <div>충청남도 천안시 동남구 대흥로 (천안 본점) | 고객센터 직통: 041-555-1234</div>
        <div style={{ marginTop: '12px', color: '#64748b' }}>© 2026 BADA Communications. All rights reserved.</div>
      </footer>

      {/* 8. 간편 신청서 모달 */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '460px', padding: '28px', position: 'relative', boxShadow: '0 20px 30px rgba(0,0,0,0.2)' }}>
            <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>간편 신청서</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>정보를 남겨주시면 개통 담당자가 즉시 확인합니다.</p>
            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input 
                type="text" 
                placeholder="👤 성함 (여권 영문명) *" 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                required 
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input 
                  type="email" 
                  placeholder="✉️ 이메일" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
                <input 
                  type="tel" 
                  placeholder="📞 연락처 *" 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                  required 
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>신청 요금제 *</label>
                <select 
                  value={form.plan} 
                  onChange={(e) => setForm({ ...form, plan: e.target.value })} 
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  {plans.map(p => (
                    <option key={p.id} value={p.name}>{p.name} (₩ {p.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>신분증 종류 *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[{ id: 'passport', label: '여권' }, { id: 'arc', label: '외국인등록증(ARC)' }].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setForm({ ...form, idType: item.id })}
                      style={{ padding: '10px', borderRadius: '8px', border: form.idType === item.id ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: form.idType === item.id ? '#f0f9ff' : '#ffffff', color: form.idType === item.id ? '#0284c7' : '#475569', fontWeight: form.idType === item.id ? 'bold' : 'normal', fontSize: '13px', cursor: 'pointer' }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>수령 방식 *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                  {[
                    { id: 'store', label: '매장 픽업' },
                    { id: 'delivery', label: '택배 배송' },
                    { id: 'esim', label: 'eSIM 발급' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setForm({ ...form, deliveryMethod: m.id })}
                      style={{ padding: '9px 4px', borderRadius: '8px', border: form.deliveryMethod === m.id ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: form.deliveryMethod === m.id ? '#f0f9ff' : '#ffffff', color: form.deliveryMethod === m.id ? '#0284c7' : '#475569', fontWeight: form.deliveryMethod === m.id ? 'bold' : 'normal', fontSize: '12px', cursor: 'pointer' }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {form.deliveryMethod === 'store' && (
                  <select 
                    value={form.pickupStore} 
                    onChange={(e) => setForm({ ...form, pickupStore: e.target.value })} 
                    style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#f8fafc' }}
                  >
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.address})</option>
                    ))}
                  </select>
                )}

                {form.deliveryMethod === 'delivery' && (
                  <input 
                    type="text" 
                    placeholder="숙소/원룸 상세 도로명 주소" 
                    value={form.address} 
                    onChange={(e) => setForm({ ...form, address: e.target.value })} 
                    style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', boxSizing: 'border-box' }}
                    required 
                  />
                )}
              </div>

              <button type="submit" style={{ width: '100%', padding: '13px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                신청 완료
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 9. 로그인 모달 */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '360px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center', margin: '0 0 16px 0' }}>BADA 관리자 / 직원 로그인</h3>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="아이디 (admin 또는 cheonan)" 
                value={loginForm.id} 
                onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                required 
              />
              <input 
                type="password" 
                placeholder="비밀번호 (1234)" 
                value={loginForm.pw} 
                onChange={(e) => setLoginForm({ ...loginForm, pw: e.target.value })} 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                required 
              />
              <button type="submit" style={{ width: '100%', padding: '11px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                로그인
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
              • 총괄 관리자: 아이디 <strong>admin</strong> / 비밀번호 <strong>1234</strong><br/>
              • 천안 본점: 아이디 <strong>cheonan</strong> / 비밀번호 <strong>1234</strong>
            </div>
          </div>
        </div>
      )}

      {/* 10. [관리자 전용] 요금제 추가/수정 모달 */}
      {showEditPlanModal && editingPlan && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '400px', padding: '24px', position: 'relative' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 0 14px 0' }}>{editingPlan.id ? '요금제 수정' : '새 요금제 등록'}</h3>
            <form onSubmit={handleSavePlan} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="요금제 명칭 (예: 데이터 무제한 30일)" 
                value={editingPlan.name} 
                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })} 
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                required 
              />
              <input 
                type="text" 
                placeholder="서브 설명 (예: 데이터와 통화를 마음껏)" 
                value={editingPlan.sub} 
                onChange={(e) => setEditingPlan({ ...editingPlan, sub: e.target.value })} 
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                required 
              />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="가격 (예: 39,600)" 
                  value={editingPlan.price} 
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })} 
                  style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  required 
                />
                <input 
                  type="text" 
                  placeholder="단위 (예: /월)" 
                  value={editingPlan.unit} 
                  onChange={(e) => setEditingPlan({ ...editingPlan, unit: e.target.value })} 
                  style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  required 
                />
              </div>
              <textarea 
                placeholder="주요 스펙 (줄바꿈으로 구분)" 
                value={editingPlan.desc ? editingPlan.desc.join('\n') : ''} 
                onChange={(e) => setEditingPlan({ ...editingPlan, desc: e.target.value.split('\n') })} 
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', height: '90px' }}
                required 
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowEditPlanModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>저장하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 11. [관리자 전용] 매장 추가/수정 모달 */}
      {showEditStoreModal && editingStore && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '380px', padding: '24px', position: 'relative' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', margin: '0 0 14px 0' }}>{editingStore.isNew ? '새 제휴 매장 등록' : '매장 정보 수정'}</h3>
            <form onSubmit={handleSaveStore} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="매장 이름 (예: 바다 부천점)" 
                value={editingStore.name} 
                onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })} 
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                required 
              />
              <input 
                type="text" 
                placeholder="매장 상세 주소" 
                value={editingStore.address} 
                onChange={(e) => setEditingStore({ ...editingStore, address: e.target.value })} 
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                required 
              />
              <input 
                type="text" 
                placeholder="매장 전화번호" 
                value={editingStore.phone} 
                onChange={(e) => setEditingStore({ ...editingStore, phone: e.target.value })} 
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                required 
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowEditStoreModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#fff' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>매장 저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 12. 바다(BADA) 하이브리드 상담 위젯 (AI 봇 + 직원 1:1 라이브 채팅) */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        {!showChat ? (
          <button 
            onClick={() => setShowChat(true)}
            style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', fontSize: '24px', boxShadow: '0 4px 16px rgba(2,132,199,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            💬
          </button>
        ) : (
          <div style={{ width: '350px', height: '490px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            
            {/* 상담창 최상단 헤더 */}
            <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>BADA 고객 지원 센터</div>
                <div style={{ fontSize: '11px', color: '#bae6fd' }}>외국인 유심 & eSIM 공식 상담창</div>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}>×</button>
            </div>

            {/* 상담 모드 전환 탭: AI 상담 ↔ 직원 1:1 상담 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setChatMode('ai')}
                style={{ padding: '8px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: chatMode === 'ai' ? '#ffffff' : '#f1f5f9', color: chatMode === 'ai' ? '#0284c7' : '#64748b', borderBottom: chatMode === 'ai' ? '2px solid #0284c7' : 'none' }}
              >
                🤖 AI 24시간 자동상담
              </button>
              <button 
                onClick={() => setChatMode('human')}
                style={{ padding: '8px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: chatMode === 'human' ? '#ffffff' : '#f1f5f9', color: chatMode === 'human' ? '#0284c7' : '#64748b', borderBottom: chatMode === 'human' ? '2px solid #0284c7' : 'none' }}
              >
                👨‍💼 매장 직원 1:1 상담
              </button>
            </div>

            {/* 대화 영역 */}
            <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              
              {chatMode === 'ai' ? (
                <>
                  {chatMessages.map((msg, i) => (
                    <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                      <div style={{ padding: '9px 12px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#0284c7' : '#f1f5f9', color: msg.role === 'user' ? '#ffffff' : '#1e293b', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {chatMessages.length === 1 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {['요금제 추천해줘', '여권으로 PASS 인증 돼?', '천안 매장 위치', 'eSIM 신청 방법'].map((tag) => (
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
                </>
              ) : (
                <>
                  <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '10px', border: '1px solid #bfdbfe', fontSize: '12px', color: '#1e40af', lineHeight: '1.4' }}>
                    📢 <strong>바다 공식 매니저 연결 모드</strong><br/>
                    매장 방문 예약, 서류 확인, 맞춤 견적 등 직원의 직접 확인이 필요한 내용을 편하게 남겨주세요.
                  </div>
                  {staffMessages.map((msg, i) => (
                    <div key={i} style={{ alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px', textAlign: msg.sender === 'customer' ? 'right' : 'left' }}>{msg.name} ({msg.time})</div>
                      <div style={{ padding: '9px 12px', borderRadius: '12px', backgroundColor: msg.sender === 'customer' ? '#0284c7' : '#f8fafc', color: msg.sender === 'customer' ? '#ffffff' : '#1e293b', border: msg.sender === 'customer' ? 'none' : '1px solid #e2e8f0', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </>
              )}

            </div>

            {/* 입력창 */}
            <form onSubmit={handleSendChat} style={{ padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px' }}>
              <input 
                type="text" 
                placeholder={chatMode === 'ai' ? "AI에게 물어보기..." : "직원에게 메시지 남기기..."} 
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
