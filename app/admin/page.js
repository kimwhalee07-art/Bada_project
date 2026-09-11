'use client';
import React, { useState, useEffect, useRef } from 'react';

// 다국어 표준 매크로 사전
const MACRO_TEMPLATES = [
  {
    id: 'id_request',
    label: '📸 여권/등록증 사진 요청',
    translations: {
      ko: '개통 처리를 위해 여권 사진(또는 외국인등록증 앞뒷면)을 선명하게 찍어 보내주세요.',
      en: 'Please send a clear photo of your Passport (or both sides of your ARC) for activation.',
      zh: '办理开通需要，请发送一张清晰的护照照片（或外国人登录证正反面照片）。',
      vi: 'Vui lòng gửi ảnh chụp rõ nét Hộ chiếu (hoặc 2 mặt Thẻ cư trú ARC) để nhân viên tiến hành kích hoạt SIM.'
    }
  },
  {
    id: 'fast_activation',
    label: '⚡ 5분 즉시 개통 안내',
    translations: {
      ko: '서류 확인이 완료되었습니다! 5분 내로 즉시 개통 처리해 드리겠습니다. 잠시만 기다려 주세요.',
      en: 'Documents verified! Your SIM will be activated within 5 minutes. Please wait a moment.',
      zh: '材料已确认完毕！5分钟内将为您快速开通，请稍候。',
      vi: 'Giấy tờ đã được xác nhận! SIM sẽ được kích hoạt ngay trong vòng 5 phút. Vui lòng đợi trong giây lát.'
    }
  },
  {
    id: 'cash_gift',
    label: '🎁 인터넷 사은품 당일 입금',
    translations: {
      ko: '인터넷+TV 설치 완료 당일, 약속드린 법정 최대 현금 사은품을 고객님 계좌로 즉시 입금해 드립니다.',
      en: 'On the day of Internet+TV installation, your cash gift will be deposited directly into your bank account.',
      zh: '宽带+电视安装完成当天，承诺的最高现金补贴将立即转账至您的银行账户。',
      vi: 'Vào ngày lắp đặt xong Internet+TV, toàn bộ tiền quà tặng tiền mặt sẽ được chuyển khoản trực tiếp vào tài khoản ngân hàng của bạn.'
    }
  },
  {
    id: 'hanpass_code',
    label: '💸 한패스 송금코드 안내',
    translations: {
      ko: '한패스(HANPASS) 앱에서 추천인 프로모션 코드 [BADA2026]을 입력하시면 첫 송금 수수료 무료 쿠폰이 지급됩니다.',
      en: 'Enter promo code [BADA2026] in the HANPASS app to receive a zero-fee coupon on your first transfer.',
      zh: '在HANPASS汉游APP输入邀请码 [BADA2026]，首笔汇款立享免手续费优惠券。',
      vi: 'Nhập mã giới thiệu [BADA2026] trên ứng dụng HANPASS để nhận coupon miễn phí 0 won cho lần chuyển tiền đầu tiên.'
    }
  },
  {
    id: 'store_visit',
    label: '🏬 천안 본점 방문 안내',
    translations: {
      ko: '바다 천안 본점(천안역 동부광장 도보 3분)으로 실물 신분증(여권 또는 등록증)을 지참하여 방문해 주세요.',
      en: 'Please visit BADA Cheonan Main Store (3 mins from Cheonan Station) with your physical Passport or ARC.',
      zh: '请携带护照或登录证原件，前往BADA天安总店（天安站东广场步行3分钟）自提。',
      vi: 'Vui lòng mang theo Hộ chiếu hoặc Thẻ ARC bản gốc đến trực tiếp BADA chi nhánh Cheonan (cách ga Cheonan 3 phút đi bộ).'
    }
  },
  {
    id: 'wait_moment',
    label: '⏳ 잠시 확인 대기 요청',
    translations: {
      ko: '고객님의 문의 사항을 확인 중입니다. 잠시만 기다려 주시면 친절히 답변드리겠습니다.',
      en: 'We are checking your request. Please hold on a moment and we will assist you shortly.',
      zh: '正在为您核实相关信息，请稍候片刻，我们将尽快回复您。',
      vi: 'Nhân viên đang tiến hành kiểm tra thông tin. Vui lòng đợi trong giây lát, chúng tôi sẽ hỗ trợ bạn ngay.'
    }
  }
];

export default function AdminPage() {
  const [authRole, setAuthRole] = useState(null); // null | 'admin' | 'worker'
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'live_chat' | 'services' | 'promotions' | 'stores' | 'orders'
  const [serviceCategory, setServiceCategory] = useState('all');
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });

  // [신규] 전체 등록 고객 목록 (0000_0000_0001 관리번호 체계)
  const [users, setUsers] = useState([]);

  // 1. 모든 서비스 상품 데이터 (CRUD 영구 보존)
  const [services, setServices] = useState([
    { id: 1, category: 'SIM', title: '데이터 무제한 30일', provider: '알뜰폰 종합', price: '39,600', unit: '/월', badge: 'BEST', icon: '📶', sub: '데이터와 통화를 마음껏', desc: '무제한 데이터 (11GB + 일2GB 후 3Mbps)\n통화/문자 무제한\n여권/외국인등록증 모두 개통 가능' },
    { id: 2, category: 'SIM', title: '실속형 선불폰', provider: '선불 충전', price: '15,000', unit: '/부터', badge: '', icon: '📱', sub: '종량 충전형', desc: '필요한 만큼만 충전\n여권 개통 가능\n기본 요금 15,000원부터' },
    { id: 3, category: 'SIM', title: '유학생 PASS팩', provider: 'KT/SK', price: '29,700', unit: '/월', badge: '인증추천', icon: '🎓', sub: '본인인증 완벽 지원', desc: '외국인등록증(ARC) 필수\n은행 계좌 개설 지원\n토스/배달앱 본인인증' },
    { id: 4, category: 'INTERNET', title: 'KT 인터넷+TV', provider: 'KT', price: '최대 47만원', unit: '당일지급', badge: 'NO.1', icon: '🌐', sub: '대칭형 기가 인터넷', desc: '외국인 동일 법정 사은품 전액 지급\n전국 어디서나 1등 품질 커버리지\nWiFi 공유기 무상 임대' },
    { id: 5, category: 'INTERNET', title: 'SK 브로드밴드+TV', provider: 'SK', price: '최대 47만원', unit: '당일지급', badge: 'BEST VALUE', icon: '🌐', sub: 'Btv 다국어 콘텐츠 지원', desc: '외국인 전용 가족 결합 할인\n가성비 최고 요금 플랜\n다양한 외국어 방송 채널' },
    { id: 6, category: 'INTERNET', title: 'LG U+ 인터넷+TV', provider: 'LG', price: '최대 47만원', unit: '당일지급', badge: 'OTT특화', icon: '🌐', sub: '넷플릭스·디즈니 결합', desc: 'IPTV 셋톱박스 기본 제공\n글로벌 OTT 완벽 연동\n설치 당일 현금 사은품 지원' },
    { id: 7, category: 'RENTAL', title: '쿠쿠 슬림 정수기 (냉온정)', provider: 'CUCKOO', price: '19,900', unit: '/월', badge: '인기렌탈', icon: '💧', sub: '외국인 간편 심사 등록', desc: '외국인등록증 하나로 당일 접수\n초기 등록비/설치비 전액 면제\n4개월 주기 필터 무상 교체' }
  ]);

  // 2. 글로벌 프로모션 설정
  const [promotions, setPromotions] = useState({
    hanpassCode: 'BADA2026',
    hanpassBenefit: '수수료 0원 쿠폰 + 우대 환율 100% 적용',
    internetNotice: '💡 바다 유심 + 인터넷 동시 신청 고객 특별 혜택: 유심 첫 달 기본요금 추가 할인 지원!'
  });

  // 3. 대리점/수령매장 관리
  const [stores, setStores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 도보 3분)' },
    { id: 'ansan', name: '바다 안산 다문화거리점', address: '경기 안산시 단원구 원곡동' },
    { id: 'suwon', name: '바다 수원역점', address: '경기 수원시 팔달구 매산로' }
  ]);

  // 4. 주문/상담 접수 내역
  const [orders, setOrders] = useState([
    { id: 1, type: 'SIM', name: 'NGUYEN VAN A', phone: '010-9988-7766', detail: '데이터 무제한 30일 (천안 본점 픽업)', time: '10분 전' },
    { id: 2, type: 'INTERNET', name: 'ZHANG WEI', phone: '010-3322-1144', detail: 'KT 500M 인터넷+TV 상담 신청', time: '25분 전' },
    { id: 3, type: 'RENTAL', name: 'ALI MOHAMMAD', phone: '010-5544-2233', detail: '쿠쿠 정수기 렌탈 상담 접수', time: '1시간 전' }
  ]);

  // 5. 1:1 고객 실시간 채팅
  const [chatRooms, setChatRooms] = useState({});
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [staffReplyText, setStaffReplyText] = useState('');
  const [macroTargetLang, setMacroTargetLang] = useState('vi');
  const prevMsgCountRef = useRef({});

  // 알림 차임벨 사운드
  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn(e);
    }
  };

  // 회원 목록 및 채팅방 동기화
  const loadData = () => {
    // 1. 회원 목록 동기화
    try {
      const storedUsers = localStorage.getItem('bada_user_db');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (e) {
      console.error(e);
    }

    // 2. 채팅방 목록 동기화
    try {
      const storedChats = localStorage.getItem('bada_live_chat_rooms');
      if (storedChats) {
        const parsed = JSON.parse(storedChats);
        let hasNewMsg = false;
        Object.keys(parsed).forEach(k => {
          const room = parsed[k];
          const prevCount = prevMsgCountRef.current[k] || 0;
          if (room.messages && room.messages.length > prevCount) {
            const lastMsg = room.messages[room.messages.length - 1];
            if (lastMsg && lastMsg.sender === 'customer') hasNewMsg = true;
            prevMsgCountRef.current[k] = room.messages.length;
          }
        });
        if (hasNewMsg) playNotificationSound();
        setChatRooms(parsed);
        if (!selectedRoomId && Object.keys(parsed).length > 0) {
          setSelectedRoomId(Object.keys(parsed)[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(loadData, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [selectedRoomId]);

  useEffect(() => {
    if (selectedRoomId && chatRooms[selectedRoomId]) {
      setMacroTargetLang(chatRooms[selectedRoomId].lang || 'vi');
    }
  }, [selectedRoomId, chatRooms]);

  // 직원 답장 전송
  const sendReplyMessage = (text) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentRoom = chatRooms[selectedRoomId];
    if (!currentRoom) return;

    const updatedMessages = [
      ...currentRoom.messages,
      { sender: 'staff', text: text, time: timeStr }
    ];

    const updatedRooms = {
      ...chatRooms,
      [selectedRoomId]: {
        ...currentRoom,
        unreadCount: 0,
        lastMessage: text,
        lastTime: timeStr,
        messages: updatedMessages
      }
    };

    setChatRooms(updatedRooms);
    localStorage.setItem('bada_live_chat_rooms', JSON.stringify(updatedRooms));
    prevMsgCountRef.current[selectedRoomId] = updatedMessages.length;
  };

  const handleSendStaffReply = (e) => {
    if (e) e.preventDefault();
    if (!staffReplyText.trim() || !selectedRoomId) return;
    sendReplyMessage(staffReplyText.trim());
    setStaffReplyText('');
  };

  const handleSendMacro = (macroItem) => {
    if (!selectedRoomId) return;
    const textToSend = macroItem.translations[macroTargetLang] || macroItem.translations.ko;
    sendReplyMessage(textToSend);
  };

  // 모달 상태
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.id === 'admin' && loginForm.pw === '1234') {
      setAuthRole('admin');
      setLoginForm({ id: '', pw: '' });
    } else if (loginForm.id === 'worker' && loginForm.pw === '1234') {
      setAuthRole('worker');
      setLoginForm({ id: '', pw: '' });
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleOpenAddService = () => {
    setEditingService({
      id: null,
      category: serviceCategory === 'all' ? 'SIM' : serviceCategory,
      title: '',
      provider: '',
      price: '',
      unit: '/월',
      badge: '',
      icon: '📦',
      sub: '',
      desc: ''
    });
    setShowServiceModal(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (authRole !== 'admin') return alert('총괄 관리자만 등록/수정이 가능합니다.');
    if (!editingService.title || !editingService.price) return alert('상품명과 가격을 입력하세요.');

    if (editingService.id) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      alert('상품 정보가 수정되었습니다.');
    } else {
      setServices([...services, { ...editingService, id: Date.now() }]);
      alert('새 상품이 등록되었습니다.');
    }
    setShowServiceModal(false);
  };

  const handleDeleteService = (id) => {
    if (authRole !== 'admin') return alert('총괄 관리자만 삭제가 가능합니다.');
    if (confirm('이 상품을 삭제하시겠습니까?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSaveStore = (e) => {
    e.preventDefault();
    if (authRole !== 'admin') return alert('총괄 관리자만 매장 관리가 가능합니다.');
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
    if (authRole !== 'admin') return alert('총괄 관리자만 삭제가 가능합니다.');
    if (confirm('이 매장을 삭제하시겠습니까?')) {
      setStores(stores.filter(s => s.id !== id));
    }
  };

  if (!authRole) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '380px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#0284c7', color: '#fff', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>B</div>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>BADA 내부 관리 시스템</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>인가된 관리자 및 직원 전용 포털입니다.</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="text" placeholder="아이디" value={loginForm.id} onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} required />
            <input type="password" placeholder="비밀번호" value={loginForm.pw} onChange={(e) => setLoginForm({ ...loginForm, pw: e.target.value })} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }} required />
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

  const filteredServices = serviceCategory === 'all' 
    ? services 
    : services.filter(s => s.category === serviceCategory);

  const roomKeys = Object.keys(chatRooms);
  const activeRoom = selectedRoomId ? chatRooms[selectedRoomId] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ backgroundColor: '#0284c7', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}>BADA</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>종합 운영 관리 센터</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '13px', color: authRole === 'admin' ? '#38bdf8' : '#34d399', fontWeight: 'bold' }}>
            {authRole === 'admin' ? '🛡️ 총괄 관리자' : '💼 현장 직원'}
          </span>
          <button onClick={() => setAuthRole(null)} style={{ backgroundColor: '#334155', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
            로그아웃
          </button>
          <a href="/" target="_blank" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none' }}>고객 화면 ↗</a>
        </div>
      </header>

      <main style={{ maxWidth: '1140px', margin: '28px auto', padding: '0 20px' }}>
        {/* 상단 탭 네비게이션 */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('users')} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'users' ? '#0284c7' : '#ffffff', color: activeTab === 'users' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            👥 전체 고객 관리 ({users.length})
          </button>
          <button onClick={() => setActiveTab('live_chat')} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'live_chat' ? '#0284c7' : '#ffffff', color: activeTab === 'live_chat' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>💬 1:1 고객 실시간 상담</span>
            <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', padding: '2px 6px', borderRadius: '10px' }}>{roomKeys.length}</span>
          </button>
          <button onClick={() => setActiveTab('services')} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'services' ? '#0284c7' : '#ffffff', color: activeTab === 'services' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            📦 전체 서비스 상품 관리 ({services.length})
          </button>
          <button onClick={() => setActiveTab('promotions')} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'promotions' ? '#0284c7' : '#ffffff', color: activeTab === 'promotions' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            📢 프로모션 & 안내 문구 설정
          </button>
          <button onClick={() => setActiveTab('stores')} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'stores' ? '#0284c7' : '#ffffff', color: activeTab === 'stores' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            🏬 매장/대리점 관리 ({stores.length})
          </button>
          <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'orders' ? '#0284c7' : '#ffffff', color: activeTab === 'orders' ? '#fff' : '#475569', fontWeight: 'bold', cursor: 'pointer' }}>
            📋 인입 접수 내역 ({orders.length})
          </button>
        </div>

        {/* [탭 1] 👥 전체 고객 관리 (아이디 볼드체 + 하단 0000_0000_0001 관리번호 작게 병기) */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록 회원 및 고객 관리 ({users.length}명)</h2>
              <span style={{ fontSize: '12px', color: '#64748b' }}>* 고객 화면에는 관리번호가 노출되지 않으며 관리자 화면에서만 조회됩니다.</span>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px' }}>고객 아이디 & 관리번호</th>
                    <th style={{ padding: '12px 16px' }}>여권상 실명</th>
                    <th style={{ padding: '12px 16px' }}>연락처</th>
                    <th style={{ padding: '12px 16px' }}>가입일</th>
                    <th style={{ padding: '12px 16px' }}>회원 상태</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>{u.username}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', marginTop: '2px' }}>{u.userCode}</div>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '600' }}>{u.name}</td>
                      <td style={{ padding: '12px 16px', color: '#475569' }}>{u.phone}</td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8' }}>{u.createdAt}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>
                          정상 활동
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* [탭 2] 1:1 실시간 고객 상담 */}
        {activeTab === 'live_chat' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', height: '650px', display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden' }}>
            <div style={{ borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '14px', color: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>상담 고객 목록 ({roomKeys.length})</span>
                <span style={{ fontSize: '11px', color: '#059669' }}>● 실시간 동기화</span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {roomKeys.length === 0 ? (
                  <div style={{ padding: '40px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
                    대기 중인 고객이 없습니다.<br/>(메인 화면 1:1 채팅 시 즉시 표시됨)
                  </div>
                ) : (
                  roomKeys.map(key => {
                    const room = chatRooms[key];
                    const isSelected = selectedRoomId === key;
                    const langBadge = room.lang === 'zh' ? '🇨🇳 中文' : room.lang === 'vi' ? '🇻🇳 Tiếng Việt' : room.lang === 'en' ? '🇺🇸 English' : '🇰🇷 한국어';
                    return (
                      <div 
                        key={key} 
                        onClick={() => setSelectedRoomId(key)} 
                        style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', backgroundColor: isSelected ? '#e0f2fe' : '#ffffff', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#0f172a' }}>{room.userName}</span>
                          <span style={{ fontSize: '10px', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>{langBadge}</span>
                        </div>
                        {room.userCode && <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'monospace', marginBottom: '4px' }}>{room.userCode}</div>}
                        <div style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {room.lastMessage || '대화 시작'}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {activeRoom ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{activeRoom.userName}</span>
                    {activeRoom.userCode && <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px', fontFamily: 'monospace' }}>[{activeRoom.userCode}]</span>}
                    <span style={{ marginLeft: '10px', fontSize: '11px', color: '#059669', fontWeight: 'bold', backgroundColor: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>
                      언어: {activeRoom.lang || 'ko'}
                    </span>
                  </div>
                </div>

                <div style={{ flex: 1, padding: '18px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' }}>
                  {activeRoom.messages.map((m, idx) => (
                    <div key={idx} style={{ alignSelf: m.sender === 'staff' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px', textAlign: m.sender === 'staff' ? 'right' : 'left' }}>
                        {m.sender === 'staff' ? '💼 본인(직원 답장)' : activeRoom.userName} · {m.time}
                      </div>
                      <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: m.sender === 'staff' ? '#0284c7' : '#ffffff', color: m.sender === 'staff' ? '#ffffff' : '#1e293b', border: m.sender === 'staff' ? 'none' : '1px solid #e2e8f0', whiteSpace: 'pre-wrap', lineHeight: '1.5', fontSize: '13px' }}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '10px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0369a1' }}>
                      ⚡ 다국어 1초 퀵 매크로 (클릭 시 자동 번역 전송)
                    </span>
                    <select value={macroTargetLang} onChange={(e) => setMacroTargetLang(e.target.value)} style={{ padding: '3px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 'bold' }}>
                      <option value="vi">🇻🇳 베트남어 (Tiếng Việt)</option>
                      <option value="zh">🇨🇳 중국어 (中文)</option>
                      <option value="en">🇺🇸 영어 (English)</option>
                      <option value="ko">🇰🇷 한국어 (Korean)</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {MACRO_TEMPLATES.map(macro => (
                      <button key={macro.id} type="button" onClick={() => handleSendMacro(macro)} style={{ padding: '6px 10px', whiteSpace: 'nowrap', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {macro.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendStaffReply} style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', backgroundColor: '#ffffff' }}>
                  <input type="text" placeholder="고객에게 직접 전달할 메시지를 입력하세요..." value={staffReplyText} onChange={(e) => setStaffReplyText(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>답변 전송</button>
                </form>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }}>
                좌측 목록에서 고객을 선택하여 1:1 대화를 시작하세요.
              </div>
            )}
          </div>
        )}

        {/* [탭 3] 서비스 상품 관리 (CRUD 100% 보존) */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { key: 'all', label: '전체' },
                  { key: 'SIM', label: '📶 유심 요금제' },
                  { key: 'INTERNET', label: '🌐 인터넷+TV' },
                  { key: 'RENTAL', label: '💧 렌탈/가전' }
                ].map(cat => (
                  <button key={cat.key} onClick={() => setServiceCategory(cat.key)} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', backgroundColor: serviceCategory === cat.key ? '#0f172a' : '#fff', color: serviceCategory === cat.key ? '#fff' : '#475569', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {cat.label}
                  </button>
                ))}
              </div>
              {authRole === 'admin' && (
                <button onClick={handleOpenAddService} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ➕ 새 상품/플랜 등록
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {filteredServices.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', backgroundColor: item.category === 'SIM' ? '#e0f2fe' : item.category === 'INTERNET' ? '#fee2e2' : '#fef3c7', color: item.category === 'SIM' ? '#0369a1' : item.category === 'INTERNET' ? '#b91c1c' : '#b45309' }}>
                      {item.category}
                    </span>
                    {item.badge && <span style={{ backgroundColor: '#0284c7', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{item.badge}</span>}
                  </div>
                  <div style={{ fontSize: '24px', margin: '4px 0' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', margin: '6px 0 2px 0', fontWeight: 'bold' }}>{item.title}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{item.provider} | {item.sub}</div>
                  <div style={{ fontSize: '19px', fontWeight: '900', color: '#0284c7', marginBottom: '12px' }}>
                    {item.price} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}>{item.unit}</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '12px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '10px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {item.desc}
                  </div>
                  {authRole === 'admin' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                      <button onClick={() => { setEditingService({ ...item }); setShowServiceModal(true); }} style={{ padding: '8px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>수정</button>
                      <button onClick={() => handleDeleteService(item.id)} style={{ padding: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [탭 4] 프로모션 관리 */}
        {activeTab === 'promotions' && (
          <div style={{ backgroundColor: '#fff', padding: '26px', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '640px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>📢 주요 프로모션 & 배너 텍스트 관리</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>한패스(HANPASS) 추천인 프로모션 코드</label>
                <input type="text" value={promotions.hanpassCode} disabled={authRole !== 'admin'} onChange={(e) => setPromotions({ ...promotions, hanpassCode: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>한패스 혜택 요약 문구</label>
                <input type="text" value={promotions.hanpassBenefit} disabled={authRole !== 'admin'} onChange={(e) => setPromotions({ ...promotions, hanpassBenefit: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>인터넷 결합 공지 배너 문구</label>
                <textarea rows={3} value={promotions.internetNotice} disabled={authRole !== 'admin'} onChange={(e) => setPromotions({ ...promotions, internetNotice: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px', boxSizing: 'border-box' }} />
              </div>
              {authRole === 'admin' && (
                <button onClick={() => alert('프로모션 및 배너 설정이 저장되었습니다.')} style={{ padding: '12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                  변경사항 저장
                </button>
              )}
            </div>
          </div>
        )}

        {/* [탭 5] 매장 관리 */}
        {activeTab === 'stores' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록된 픽업 매장/대리점</h2>
              {authRole === 'admin' && (
                <button onClick={() => { setEditingStore({ id: `store_${Date.now()}`, name: '', address: '' }); setShowStoreModal(true); }} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  ➕ 새 대리점 등록
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {stores.map((s) => (
                <div key={s.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7' }}>{s.name}</div>
                  <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>📍 {s.address}</div>
                  {authRole === 'admin' && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                      <button onClick={() => { setEditingStore({ ...s, isEditing: true }); setShowStoreModal(true); }} style={{ flex: 1, padding: '7px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>수정</button>
                      <button onClick={() => handleDeleteStore(s.id)} style={{ flex: 1, padding: '7px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [탭 6] 인입 접수 내역 */}
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
                        <span style={{ backgroundColor: ord.type === 'SIM' ? '#e0f2fe' : ord.type === 'INTERNET' ? '#fee2e2' : '#fef3c7', color: ord.type === 'SIM' ? '#0369a1' : ord.type === 'INTERNET' ? '#b91c1c' : '#b45309', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>
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

      {/* 서비스 모달 */}
      {showServiceModal && editingService && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '17px' }}>{editingService.id ? '서비스 상품 수정' : '새 서비스 상품 등록'}</h3>
            <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>카테고리</label>
                <select value={editingService.category} onChange={(e) => setEditingService({ ...editingService, category: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }}>
                  <option value="SIM">📶 유심 (선불/eSIM)</option>
                  <option value="INTERNET">🌐 인터넷 + TV (사은품 결합)</option>
                  <option value="RENTAL">💧 렌탈 (정수기/공기청정기 등)</option>
                  <option value="DEVICE">📱 단말기/중고폰</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="상품명" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                <input type="text" placeholder="제공사 (예: KT, SK)" value={editingService.provider} onChange={(e) => setEditingService({ ...editingService, provider: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="가격/사은품 (예: 39,600)" value={editingService.price} onChange={(e) => setEditingService({ ...editingService, price: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} required />
                <input type="text" placeholder="단위 (예: /월, 당일지급)" value={editingService.unit} onChange={(e) => setEditingService({ ...editingService, unit: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <textarea rows={4} placeholder="세부 혜택 (줄바꿈 구분)" value={editingService.desc} onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowServiceModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 매장 모달 */}
      {showStoreModal && editingStore && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '17px' }}>{editingStore.isEditing ? '대리점 수정' : '새 대리점 등록'}</h3>
            <form onSubmit={handleSaveStore} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="매장명" value={editingStore.name} onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              <input type="text" placeholder="주소" value={editingStore.address} onChange={(e) => setEditingStore({ ...editingStore, address: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
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
