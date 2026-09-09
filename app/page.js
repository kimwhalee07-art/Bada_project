'use client';
import React, { useState } from 'react';

const i18n = {
  zh: {
    banner: "🔥 BADA大海通讯 当天极速开通！免配送费·免SIM卡费",
    title: "BADA 韩国手机卡 & eSIM 申请中心",
    subTitle: "护照/外国人登录证均可办理 · 中文客服实时在线",
    plans: "热门推荐套餐",
    viewMore: "查看更多套餐 (+)",
    viewLess: "收起部分套餐 (-)",
    apply: "⚡ 3秒极速申请",
    methodPick: "选择领取方式",
    methodStore: "到店自取",
    methodDelivery: "全国快递",
    methodEsim: "eSIM即时发货",
    selectStore: "选择自取门店",
    detailBtn: "详情",
    applyThis: "申请此套餐",
    chatBtn: "BADA 咨询",
    chatTitle: "BADA AI 实时客服",
    chatPlaceholder: "输入咨询内容...",
    close: "关闭"
  },
  vi: {
    banner: "🔥 BADA SIM Hàn Quốc kích hoạt trong ngày! Miễn phí SIM & Giao hàng",
    title: "BADA - Trung Tâm Đăng Ký SIM & eSIM",
    subTitle: "Hỗ trợ Hộ chiếu & Thẻ ARC · Hỗ trợ tiếng Việt 24/7",
    plans: "Gói Cước Phổ Biến",
    viewMore: "Xem tất cả gói cước (+)",
    viewLess: "Thu gọn (-)",
    apply: "⚡ Đăng Ký Nhanh Trong 3 Giây",
    methodPick: "Chọn phương thức nhận",
    methodStore: "Nhận tại cửa hàng",
    methodDelivery: "Giao tận nơi",
    methodEsim: "Nhận eSIM ngay",
    selectStore: "Chọn chi nhánh nhận",
    detailBtn: "Chi tiết",
    applyThis: "Chọn gói này",
    chatBtn: "BADA Tư vấn",
    chatTitle: "BADA AI Hỗ Trợ 1:1",
    chatPlaceholder: "Nhập tin nhắn cần hỏi...",
    close: "Đóng"
  },
  en: {
    banner: "🔥 BADA Korea SIM Same-Day Activation! Free Express Delivery",
    title: "BADA Korea SIM & eSIM Center",
    subTitle: "Fast activation with Passport or ARC · 24/7 Multilingual AI Support",
    plans: "Recommended Plans",
    viewMore: "View All Plans (+)",
    viewLess: "Show Less (-)",
    apply: "⚡ 3-Sec Quick Application",
    methodPick: "Fulfillment Method",
    methodStore: "Store Pickup",
    methodDelivery: "Postal Delivery",
    methodEsim: "Instant eSIM",
    selectStore: "Select Pickup Store",
    detailBtn: "Details",
    applyThis: "Select This Plan",
    chatBtn: "BADA Chat",
    chatTitle: "BADA AI Live Support",
    chatPlaceholder: "Ask anything about plans...",
    close: "Close"
  },
  ko: {
    banner: "🔥 바다(BADA) 안심 개통 센터! 유심비 무료 & 당일 픽업/배송",
    title: "바다(BADA) 유심 & eSIM 개통 센터",
    subTitle: "여권/외국인등록증 당일 개통 · 24시간 다국어 AI 지원",
    plans: "실시간 추천 요금제",
    viewMore: "요금제 전체 더보기 (+)",
    viewLess: "목록 접기 (-)",
    apply: "⚡ 3초 간편 개통 신청",
    methodPick: "수령 방식 선택",
    methodStore: "매장 방문 픽업",
    methodDelivery: "전국 택배 배송",
    methodEsim: "eSIM 즉시 발급",
    selectStore: "방문 매장 선택",
    detailBtn: "상세보기",
    applyThis: "이 요금제로 신청",
    chatBtn: "바다 실시간 상담",
    chatTitle: "바다(BADA) AI 상담창",
    chatPlaceholder: "궁금한 점을 물어보세요...",
    close: "닫기"
  }
};

export default function App() {
  const [lang, setLang] = useState('zh');
  const [userAuth, setUserAuth] = useState({ role: 'guest', branchId: null, name: '손님' });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const [plans, setPlans] = useState([
    { id: 1, name: "데이터 무제한 30일 (BEST)", price: "39,600원", data: "11GB + 일2GB (소진시 3Mbps)", calls: "통화/문자 무제한", target: "여권/외국인등록증", detail: "가장 인기 있는 바다 무제한 플랜. 유튜브 시청 원활. 천안 본점 당일 픽업 또는 무료 택배 가능." },
    { id: 2, name: "실속 알뜰 선불폰", price: "15,000원부터", data: "기본 5GB 제공", calls: "종량 차감 방식", target: "여권 전용", detail: "통화량이 적고 단기 체류하는 분들을 위한 초저가 충전형 요금제." },
    { id: 3, name: "유학생 PASS 인증팩", price: "29,700원", data: "15GB + 3Mbps 무제한", calls: "통화 기본제공", target: "외국인등록증 필수", detail: "한국 은행 계좌 개설, 토스, 배달앱 본인인증(PASS)이 완벽하게 지원되는 유학생 전용 상품." },
    { id: 4, name: "여행자 전용 5일 eSIM", price: "18,000원", data: "매일 2GB 무제한", calls: "수신 전용", target: "여권 가능", detail: "유심 교체 없이 이메일로 QR코드를 받아 즉시 사용하는 초간편 여행 플랜." }
  ]);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [selectedPlanDetail, setSelectedPlanDetail] = useState(null);

  const [stores, setStores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 부근)', langTag: '다국어 상시 지원' }
  ]);

  const [orders, setOrders] = useState([
    { id: 101, name: "WANG WEI", contact: "010-1111-2222", plan: "데이터 무제한 30일", method: "매장 방문 픽업", branchId: "cheonan", time: "10분 전" }
  ]);

  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formMethod, setFormMethod] = useState('store');
  const [formStore, setFormStore] = useState('cheonan');
  const [formAddress, setFormAddress] = useState('');

  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', data: '', calls: '', target: '여권/외국인등록증', detail: '' });
  
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [newStore, setNewStore] = useState({ id: '', name: '', address: '', langTag: '' });

  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 바다(BADA) 공식 AI 매니저입니다. 한국 유심/eSIM 개통에 대해 편하게 물어보세요! (请提问 / Hỏi bất cứ điều gì)' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const t = i18n[lang];

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginId === 'admin' && loginPw === '1234') {
      setUserAuth({ role: 'admin', branchId: null, name: '총괄 관리자' });
      setShowLoginModal(false);
      setLoginId('');
      setLoginPw('');
    } else if (loginId === 'cheonan' && loginPw === '1234') {
      setUserAuth({ role: 'staff', branchId: 'cheonan', name: '바다 천안 본점' });
      setShowLoginModal(false);
      setLoginId('');
      setLoginPw('');
    } else {
      const matchedStore = stores.find(s => s.id === loginId && loginPw === '1234');
      if (matchedStore) {
        setUserAuth({ role: 'staff', branchId: matchedStore.id, name: matchedStore.name });
        setShowLoginModal(false);
        setLoginId('');
        setLoginPw('');
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formContact) {
      alert('이름과 연락처를 입력해주세요.');
      return;
    }
    const newOrder = {
      id: Date.now(),
      name: formName,
      contact: formContact,
      plan: selectedPlanDetail ? selectedPlanDetail.name : "데이터 무제한 30일",
      method: formMethod === 'store' ? '매장 방문 픽업' : formMethod === 'delivery' ? '전국 택배 배송' : 'eSIM 즉시 발급',
      branchId: formMethod === 'store' ? formStore : null,
      address: formMethod === 'delivery' ? formAddress : '',
      time: "방금 전"
    };
    setOrders([newOrder, ...orders]);
    alert('신청서가 안전하게 접수되었습니다. 바다(BADA) 담당자가 곧 연락드립니다!');
    setFormName('');
    setFormContact('');
    setFormAddress('');
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || isAiLoading) return;

    const userText = inputMsg;
    setChatMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInputMsg('');
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: '응답 생성 중 문제가 생겼습니다. 잠시 후 다시 질문해주세요.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredOrders = userAuth.role === 'admin' 
    ? orders 
    : orders.filter(o => o.branchId === userAuth.branchId);

  return (
    <div style={{ maxWidth: '440px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', position: 'relative', paddingBottom: '90px' }}>
      
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { c: 'zh', l: '中文' },
            { c: 'vi', l: 'Tiếng Việt' },
            { c: 'en', l: 'EN' },
            { c: 'ko', l: '한국어' }
          ].map(item => (
            <button
              key={item.c}
              onClick={() => setLang(item.c)}
              style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: lang === item.c ? 'bold' : 'normal', backgroundColor: lang === item.c ? '#2563eb' : '#f1f5f9', color: lang === item.c ? '#fff' : '#64748b', border: 'none', cursor: 'pointer' }}
            >
              {item.l}
            </button>
          ))}
        </div>

        <div>
          {userAuth.role === 'guest' ? (
            <button onClick={() => setShowLoginModal(true)} style={{ background: 'none', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', color: '#64748b', cursor: 'pointer' }}>
              🔒 관리자
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e40af', backgroundColor: '#dbeafe', padding: '2px 6px', borderRadius: '4px' }}>
                {userAuth.name}
              </span>
              <button onClick={() => setUserAuth({ role: 'guest', branchId: null, name: '손님' })} style={{ background: 'none', border: 'none', fontSize: '11px', color: '#ef4444', cursor: 'pointer' }}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
        {t.banner}
      </div>

      {userAuth.role !== 'guest' && (
        <div style={{ margin: '12px 16px', padding: '14px', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
            📋 {userAuth.name} 접수 현황 ({filteredOrders.length}건)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
            {filteredOrders.length === 0 ? (
              <div style={{ fontSize: '12px', color: '#64748b' }}>신규 접수 건이 없습니다.</div>
            ) : (
              filteredOrders.map(o => (
                <div key={o.id} style={{ backgroundColor: '#ffffff', padding: '8px 10px', borderRadius: '8px', fontSize: '12px', border: '1px solid #dbeafe' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{o.name}</span>
                    <span style={{ color: '#2563eb' }}>{o.method}</span>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>
                    연락처: {o.contact} | 요금제: {o.plan}
                    {o.address && ` | 배송지: ${o.address}`}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {userAuth.role === 'admin' && (
        <div style={{ margin: '0 16px 16px 16px', padding: '14px', backgroundColor: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#065f46' }}>🏢 제휴 대리점 목록 ({stores.length}곳)</div>
            <button onClick={() => setShowAddStoreModal(true)} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              + 지점 추가
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {stores.map(store => (
              <div key={store.id} style={{ backgroundColor: '#fff', padding: '8px 10px', borderRadius: '8px', border: '1px solid #d1fae5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{store.name} <span style={{ fontSize: '10px', color: '#059669', backgroundColor: '#e6fffa', padding: '1px 4px', borderRadius: '3px' }}>ID: {store.id}</span></div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>{store.address}</div>
                </div>
                <button
                  onClick={() => {
                    if (stores.length === 1) {
                      alert('최소 1개의 매장은 유지되어야 합니다.');
                      return;
                    }
                    if (confirm(`'${store.name}' 지점을 삭제하시겠습니까?`)) {
                      setStores(stores.filter(s => s.id !== store.id));
                      if (formStore === store.id) setFormStore(stores[0].id);
                    }
                  }}
                  style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: '16px' }}>
        <h1 style={{ fontSize: '19px', fontWeight: '800', margin: '0 0 4px 0', color: '#1e40af' }}>{t.title}</h1>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>{t.subTitle}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{t.plans}</h2>
          {userAuth.role === 'admin' && (
            <button onClick={() => setShowAddPlanModal(true)} style={{ backgroundColor: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              + 요금제 추가
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(showAllPlans ? plans : plans.slice(0, 3)).map(plan => (
            <div key={plan.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                    {plan.target}
                  </span>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '6px' }}>{plan.name}</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#2563eb' }}>{plan.price}</div>
              </div>

              <div style={{ fontSize: '12px', color: '#64748b', margin: '8px 0 10px 0' }}>
                • 데이터: {plan.data}<br />
                • 음성/문자: {plan.calls}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setSelectedPlanDetail(plan)}
                  style={{ flex: 1, padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {t.detailBtn}
                </button>
                {userAuth.role === 'admin' && (
                  <button
                    onClick={() => {
                      if (confirm('요금제를 삭제하시겠습니까?')) {
                        setPlans(plans.filter(p => p.id !== plan.id));
                      }
                    }}
                    style={{ padding: '7px 10px', borderRadius: '6px', border: 'none', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '12px', cursor: 'pointer' }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAllPlans(!showAllPlans)}
          style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}
        >
          {showAllPlans ? t.viewLess : t.viewMore}
        </button>

        <div style={{ marginTop: '24px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 12px 0' }}>{t.apply}</h2>
          <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>{t.methodPick}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[
                { id: 'store', label: t.methodStore },
                { id: 'delivery', label: t.methodDelivery },
                { id: 'esim', label: t.methodEsim }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormMethod(m.id)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: formMethod === m.id ? 'bold' : 'normal',
                    backgroundColor: formMethod === m.id ? '#2563eb' : '#f8fafc',
                    color: formMethod === m.id ? '#ffffff' : '#64748b',
                    border: formMethod === m.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {formMethod === 'store' && (
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{t.selectStore}</div>
                <select
                  value={formStore}
                  onChange={e => setFormStore(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#fff' }}
                >
                  {stores.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.address})</option>
                  ))}
                </select>
              </div>
            )}

            {formMethod === 'delivery' && (
              <input
                type="text"
                placeholder="한국 내 배송 주소 (숙소/원룸 상세 주소)"
                value={formAddress}
                onChange={e => setFormAddress(e.target.value)}
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', width: '100%', boxSizing: 'border-box' }}
                required
              />
            )}

            <input
              type="text"
              placeholder="이름 (여권 영문명)"
              value={formName}
              onChange={e => setFormName(e.target.value)}
              style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', width: '100%', boxSizing: 'border-box' }}
              required
            />
            <input
              type="text"
              placeholder="연락처 (전화번호 / 카카오 / 위챗 / Zalo)"
              value={formContact}
              onChange={e => setFormContact(e.target.value)}
              style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', width: '100%', boxSizing: 'border-box' }}
              required
            />

            <button
              type="submit"
              style={{ padding: '11px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}
            >
              신청서 접수하기
            </button>
          </form>
        </div>
      </div>

      {selectedPlanDetail && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '18px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: '4px' }}>
              {selectedPlanDetail.target}
            </span>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', margin: '8px 0 4px 0' }}>{selectedPlanDetail.name}</h3>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#2563eb', marginBottom: '12px' }}>{selectedPlanDetail.price}</div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '12px', lineHeight: '1.6', marginBottom: '14px' }}>
              <div><strong>데이터:</strong> {selectedPlanDetail.data}</div>
              <div><strong>음성/문자:</strong> {selectedPlanDetail.calls}</div>
              <div style={{ marginTop: '6px', color: '#475569' }}>{selectedPlanDetail.detail}</div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setSelectedPlanDetail(null)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                {t.close}
              </button>
              <button
                onClick={() => {
                  alert(`'${selectedPlanDetail.name}'이(가) 선택되었습니다. 하단 신청서를 마저 작성해 주세요.`);
                  setSelectedPlanDetail(null);
                }}
                style={{ flex: 2, padding: '8px', borderRadius: '6px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {t.applyThis}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStoreModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '340px', borderRadius: '14px', padding: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 10px 0' }}>새 제휴 대리점 등록</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newStore.id || !newStore.name) return;
              setStores([...stores, newStore]);
              setShowAddStoreModal(false);
              setNewStore({ id: '', name: '', address: '', langTag: '' });
              alert('새 지점이 등록되었습니다.');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="지점 코드/아이디 (예: ansan)" value={newStore.id} onChange={e => setNewStore({ ...newStore, id: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <input type="text" placeholder="지점 이름 (예: 바다 안산점)" value={newStore.name} onChange={e => setNewStore({ ...newStore, name: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <input type="text" placeholder="매장 상세 주소" value={newStore.address} onChange={e => setNewStore({ ...newStore, address: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <input type="text" placeholder="지원 언어 태그 (예: 중국어/베트남어 지원)" value={newStore.langTag} onChange={e => setNewStore({ ...newStore, langTag: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAddStoreModal(false)} style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', fontSize: '12px' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '8px', border: 'none', background: '#059669', color: '#fff', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>지점 등록</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddPlanModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '340px', borderRadius: '14px', padding: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 10px 0' }}>새 요금제 등록</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              setPlans([...plans, { ...newPlan, id: Date.now() }]);
              setShowAddPlanModal(false);
              setNewPlan({ name: '', price: '', data: '', calls: '', target: '여권/외국인등록증', detail: '' });
              alert('요금제가 추가되었습니다.');
            }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="요금제명" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <input type="text" placeholder="가격 (예: 25,000원)" value={newPlan.price} onChange={e => setNewPlan({ ...newPlan, price: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <input type="text" placeholder="데이터 스펙" value={newPlan.data} onChange={e => setNewPlan({ ...newPlan, data: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} />
              <input type="text" placeholder="통화/문자" value={newPlan.calls} onChange={e => setNewPlan({ ...newPlan, calls: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} />
              <textarea placeholder="상세 설명" value={newPlan.detail} onChange={e => setNewPlan({ ...newPlan, detail: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px', height: '50px' }} />
              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" onClick={() => setShowAddPlanModal(false)} style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', fontSize: '12px' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '8px', border: 'none', background: '#1d4ed8', color: '#fff', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>등록</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '300px', borderRadius: '14px', padding: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 12px 0' }}>바다(BADA) 관리자 로그인</h3>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" placeholder="아이디" value={loginId} onChange={e => setLoginId(e.target.value)} style={{ padding: '9px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <input type="password" placeholder="비밀번호" value={loginPw} onChange={e => setLoginPw(e.target.value)} style={{ padding: '9px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} required />
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', fontSize: '12px' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '8px', border: 'none', background: '#1e293b', color: '#fff', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>로그인</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 50 }}>
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 18px', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(37,99,235,0.3)', cursor: 'pointer' }}
          >
            💬 {t.chatBtn}
          </button>
        ) : (
          <div style={{ width: '310px', height: '390px', backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              <span>{t.chatTitle}</span>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ padding: '8px 10px', borderRadius: '10px', backgroundColor: msg.role === 'user' ? '#2563eb' : '#f1f5f9', color: msg.role === 'user' ? '#fff' : '#1e293b', whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div style={{ alignSelf: 'flex-start', fontSize: '11px', color: '#94a3b8' }}>바다 AI가 답변을 작성 중입니다...</div>
              )}
            </div>

            <form onSubmit={handleSendChat} style={{ padding: '8px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px' }}>
              <input
                type="text"
                placeholder={t.chatPlaceholder}
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                style={{ flex: 1, padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
              />
              <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                전송
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
