'use client';
import React, { useState } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'stores' | 'orders'
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });

  // 1. 요금제 관리 상태 (CRUD)
  const [plans, setPlans] = useState([
    { id: 1, name: '데이터 무제한 30일', sub: '데이터와 통화를 마음껏', price: '39,600', unit: '/월', isBest: true, icon: '📶', desc: '무제한 데이터 (11GB + 일2GB 후 3Mbps)\n통화/문자 무제한\n여권/외국인등록증 모두 개통 가능\n30일 자동 연장 가능' },
    { id: 2, name: '실속형 선불폰', sub: '종량 충전형', price: '15,000', unit: '/부터', isBest: false, icon: '📱', desc: '필요한 만큼만 충전\n여권 개통 가능\n기본 요금 15,000원부터\n충전 금액만큼 사용' },
    { id: 3, name: '유학생 PASS팩', sub: '본인인증 완벽 지원', price: '29,700', unit: '/월', isBest: false, icon: '🎓', desc: '외국인등록증(ARC) 필수\n은행 계좌 개설 지원\n토스/배달앱 본인인증\n유학생 특화 요금 할인' },
    { id: 4, name: '단기 eSIM', sub: '여행/단기 출장 전용', price: '18,000', unit: '/5일', isBest: false, icon: '✈️', desc: '5일간 데이터 무제한\nQR코드로 이메일/메신저 전송\n물리 유심 교체 불필요\n신청 즉시 개통' }
  ]);

  // 2. 대리점/매장 관리 상태 (CRUD)
  const [stores, setStores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 도보 3분)', phone: '041-555-1234' },
    { id: 'ansan', name: '바다 안산 다문화거리점', address: '경기 안산시 단원구 원곡동', phone: '031-444-5678' },
    { id: 'suwon', name: '바다 수원역점', address: '경기 수원시 팔달구 매산로', phone: '031-222-9876' }
  ]);

  // 3. 주문 내역
  const [orders, setOrders] = useState([
    { id: 1, type: 'SIM', name: 'NGUYEN VAN A', phone: '010-9988-7766', detail: '데이터 무제한 30일 (천안 본점 픽업)', time: '10분 전' },
    { id: 2, type: 'INTERNET', name: 'ZHANG WEI', phone: '010-3322-1144', detail: 'KT 500M 인터넷+TV 상담 신청', time: '25분 전' }
  ]);

  // 모달 상태
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.id === 'admin' && loginForm.pw === '1234') {
      setIsAuthenticated(true);
      setLoginForm({ id: '', pw: '' });
    } else {
      alert('관리자 인증 정보가 올바르지 않습니다.');
    }
  };

  // 요금제 핸들러
  const handleSavePlan = (e) => {
    e.preventDefault();
    if (editingPlan.id) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
      alert('요금제가 수정되었습니다.');
    } else {
      setPlans([...plans, { ...editingPlan, id: Date.now() }]);
      alert('새 요금제가 등록되었습니다.');
    }
    setShowPlanModal(false);
  };

  const handleDeletePlan = (id) => {
    if (confirm('이 요금제를 삭제하시겠습니까?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  // 대리점 핸들러
  const handleSaveStore = (e) => {
    e.preventDefault();
    if (editingStore.isEditing) {
      setStores(stores.map(s => s.id === editingStore.id ? editingStore : s));
      alert('매장 정보가 수정되었습니다.');
    } else {
      setStores([...stores, editingStore]);
      alert('새 대리점이 등록되었습니다.');
    }
    setShowStoreModal(false);
  };

  const handleDeleteStore = (id) => {
    if (confirm('이 매장을 삭제하시겠습니까?')) {
      setStores(stores.filter(s => s.id !== id));
    }
  };

  // 비로그인 상태일 때 전용 로그인 화면
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '380px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#0284c7', color: '#fff', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>B</div>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>BADA 총괄 관리자 포털</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>인가된 직원 전용 시스템입니다.</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input 
              type="text" 
              placeholder="관리자 아이디 (admin)" 
              value={loginForm.id} 
              onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              required 
            />
            <input 
              type="password" 
              placeholder="비밀번호 (1234)" 
              value={loginForm.pw} 
              onChange={(e) => setLoginForm({ ...loginForm, pw: e.target.value })} 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              required 
            />
            <button type="submit" style={{ padding: '13px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
              시스템 로그인
            </button>
          </form>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <a href="/" style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none' }}>← 고객 메인화면으로 돌아가기</a>
          </div>
        </div>
      </div>
    );
  }

  // 관리자 인증 완료 후 대시보드 화면
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      {/* 관리자 헤더 */}
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#0284c7', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}>BADA</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>운영 관리 시스템</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>총괄 관리자 모드</span>
          <button onClick={() => setIsAuthenticated(false)} style={{ backgroundColor: '#334155', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
            로그아웃
          </button>
          <a href="/" target="_blank" style={{ fontSize: '12px', color: '#38bdf8', textDecoration: 'none' }}>메인 사이트 보기 ↗</a>
        </div>
      </header>

      {/* 대시보드 본문 */}
      <main style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>
        {/* 네비게이션 탭 */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <button onClick={() => setActiveTab('plans')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'plans' ? '#0284c7' : '#ffffff', color: activeTab === 'plans' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            📶 유심 요금제 관리 ({plans.length})
          </button>
          <button onClick={() => setActiveTab('stores')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'stores' ? '#0284c7' : '#ffffff', color: activeTab === 'stores' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            🏬 대리점/매장 관리 ({stores.length})
          </button>
          <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'orders' ? '#0284c7' : '#ffffff', color: activeTab === 'orders' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            📋 인입 주문/상담 접수 ({orders.length})
          </button>
        </div>

        {/* 탭 1: 요금제 관리 */}
        {activeTab === 'plans' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록된 요금제 목록</h2>
              <button 
                onClick={() => { setEditingPlan({ id: null, name: '', sub: '', price: '', unit: '/월', isBest: false, icon: '📶', desc: '' }); setShowPlanModal(true); }} 
                style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ➕ 새 요금제 등록
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {plans.map((p) => (
                <div key={p.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '24px' }}>{p.icon}</span>
                    {p.isBest && <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>BEST</span>}
                  </div>
                  <h3 style={{ fontSize: '16px', margin: '10px 0 4px 0' }}>{p.name}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{p.sub}</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#0284c7', marginBottom: '12px' }}>₩ {p.price} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}>{p.unit}</span></div>
                  <div style={{ flex: 1, fontSize: '12px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '10px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {p.desc}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                    <button onClick={() => { setEditingPlan({ ...p }); setShowPlanModal(true); }} style={{ padding: '8px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>수정</button>
                    <button onClick={() => handleDeletePlan(p.id)} style={{ padding: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 2: 대리점 관리 */}
        {activeTab === 'stores' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록된 픽업 매장/대리점</h2>
              <button 
                onClick={() => { setEditingStore({ id: `store_${Date.now()}`, name: '', address: '', phone: '' }); setShowStoreModal(true); }} 
                style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ➕ 새 대리점 등록
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {stores.map((s) => (
                <div key={s.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7' }}>{s.name}</div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>📍 {s.address}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>📞 {s.phone}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <button onClick={() => { setEditingStore({ ...s, isEditing: true }); setShowStoreModal(true); }} style={{ flex: 1, padding: '7px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>수정</button>
                    <button onClick={() => handleDeleteStore(s.id)} style={{ flex: 1, padding: '7px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 3: 주문 접수 현황 */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>실시간 접수 상담/주문 내역</h2>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px' }}>구분</th>
                    <th style={{ padding: '12px 16px' }}>신청자 성함</th>
                    <th style={{ padding: '12px 16px' }}>연락처</th>
                    <th style={{ padding: '12px 16px' }}>상세 신청 내역</th>
                    <th style={{ padding: '12px 16px' }}>접수 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: ord.type === 'SIM' ? '#e0f2fe' : '#fef3c7', color: ord.type === 'SIM' ? '#0369a1' : '#b45309', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>
                          {ord.type}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{ord.name}</td>
                      <td style={{ padding: '12px 16px' }}>{ord.phone}</td>
                      <td style={{ padding: '12px 16px' }}>{ord.detail}</td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{ord.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* 요금제 모달 */}
      {showPlanModal && editingPlan && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '17px' }}>{editingPlan.id ? '요금제 수정' : '새 요금제 등록'}</h3>
            <form onSubmit={handleSavePlan} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="요금제명" value={editingPlan.name} onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="가격 (예: 39,600)" value={editingPlan.price} onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                <input type="text" placeholder="단위 (/월)" value={editingPlan.unit} onChange={(e) => setEditingPlan({ ...editingPlan, unit: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <input type="text" placeholder="요약 설명" value={editingPlan.sub} onChange={(e) => setEditingPlan({ ...editingPlan, sub: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <textarea rows={3} placeholder="세부 내용 (줄바꿈 구분)" value={editingPlan.desc} onChange={(e) => setEditingPlan({ ...editingPlan, desc: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="checkbox" id="admIsBest" checked={editingPlan.isBest} onChange={(e) => setEditingPlan({ ...editingPlan, isBest: e.target.checked })} />
                <label htmlFor="admIsBest" style={{ fontSize: '13px' }}>인기 추천(BEST) 표시</label>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowPlanModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 대리점 모달 */}
      {showStoreModal && editingStore && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '17px' }}>{editingStore.isEditing ? '대리점 정보 수정' : '새 대리점 등록'}</h3>
            <form onSubmit={handleSaveStore} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="매장명" value={editingStore.name} onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              <input type="text" placeholder="주소" value={editingStore.address} onChange={(e) => setEditingStore({ ...editingStore, address: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              <input type="text" placeholder="전화번호" value={editingStore.phone} onChange={(e) => setEditingStore({ ...editingStore, phone: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowStoreModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
