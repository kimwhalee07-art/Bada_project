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
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'services' | 'users' | 'live_chat' | 'promotions' | 'stores'
  const [serviceCategory, setServiceCategory] = useState('all');
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });

  // [전체 등록 회원 관리] (0000_0000_0001 체계)
  const [users, setUsers] = useState([]);

  // 1. 모든 서비스 상품 데이터 (알뜰폰 & 통신 3사 분리 반영)
  const [services, setServices] = useState([
    { id: 1, category: 'SIM_MVNO', title: '데이터 무제한 30일 (KT망)', provider: '알뜰폰 KT망', price: '39,600', unit: '/월', badge: 'BEST 알뜰', icon: '📶', sub: '데이터와 통화를 마음껏', desc: '무제한 데이터 (11GB + 일2GB 후 3Mbps)\n통화/문자 무제한\n여권/외국인등록증 모두 개통 가능' },
    { id: 2, category: 'SIM_MVNO', title: '실속 가성비 15GB+ (LG U+망)', provider: '알뜰폰 LG망', price: '24,900', unit: '/월', badge: '가성비 1등', icon: '⚡', sub: '유학생·원룸 거주자 인기', desc: '기본 15GB + 3Mbps 속도 무제한\n통화 100분 / 문자 100건\n위약금 없는 무약정 플랜' },
    { id: 3, category: 'SIM_MVNO', title: '실속형 알뜰 선불폰', provider: '선불 알뜰폰', price: '15,000', unit: '/부터', badge: '초기정착', icon: '📱', sub: '종량 충전형', desc: '필요한 만큼만 충전\n여권 당일 즉시 개통\n기본 요금 15,000원부터' },
    { id: 4, category: 'SIM_MNO', title: 'KT 5G 슬림 베이직', provider: 'KT (통신3사)', price: '55,000', unit: '/월', badge: 'KT 정규망', icon: '🚀', sub: '통신 3사 정규 5G 고속망', desc: 'KT 정규 회선 개통\nPASS 본인인증 100% 보장 · 계좌 개설\n스마트폰 기기 결합 및 약정 할인' },
    { id: 5, category: 'SIM_MNO', title: 'SKT 유학생 PASS 안심팩', provider: 'SKT (통신3사)', price: '29,700', unit: '/월', badge: '인증특화', icon: '🎓', sub: '본인인증 완벽 지원', desc: '외국인등록증(ARC) 필수\n은행 계좌 개설 및 배달앱 인증 지원\n전국 T월드 공식 대리점 AS' },
    { id: 6, category: 'INTERNET', title: 'KT 인터넷+TV', provider: 'KT', price: '최대 47만원', unit: '당일지급', badge: 'NO.1', icon: '🌐', sub: '대칭형 기가 인터넷', desc: '외국인 동일 법정 사은품 전액 지급\n전국 어디서나 1등 품질 커버리지\nWiFi 공유기 무상 임대' },
    { id: 7, category: 'INTERNET', title: 'SK 브로드밴드+TV', provider: 'SK', price: '최대 47만원', unit: '당일지급', badge: 'BEST VALUE', icon: '🌐', sub: 'Btv 다국어 콘텐츠 지원', desc: '외국인 전용 가족 결합 할인\n가성비 최고 요금 플랜\n다양한 외국어 방송 채널' },
    { id: 8, category: 'INTERNET', title: 'LG U+ 인터넷+TV', provider: 'LG', price: '최대 47만원', unit: '당일지급', badge: 'OTT특화', icon: '🌐', sub: '넷플릭스·디즈니 결합', desc: 'IPTV 셋톱박스 기본 제공\n글로벌 OTT 완벽 연동\n설치 당일 현금 사은품 지원' },
    { id: 9, category: 'INTERNET', title: '알뜰인터넷 (스카이라이프/헬로비전)', provider: '알뜰통신 결합', price: '최대 35만원', unit: '당일지급', badge: '알뜰초저가', icon: '🌐', sub: '알뜰폰 결합 시 1만원대', desc: '알뜰폰과 결합 시 인터넷 월 1만원대\n원룸 및 단독 거주 외국인에게 최고 인기\n설치 시 현금 사은품 즉시 지급' },
    { id: 10, category: 'RENTAL', title: '쿠쿠 슬림 정수기 (냉온정)', provider: 'CUCKOO', price: '19,900', unit: '/월', badge: '인기렌탈', icon: '💧', sub: '외국인 간편 심사 등록', desc: '외국인등록증 하나로 당일 접수\n초기 등록비/설치비 전액 면제\n4개월 주기 필터 무상 교체' }
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

  // 4. 실시간 접수 내역 (알뜰폰 / 통신 3사 / 인터넷 연동)
  const [orders, setOrders] = useState([
    { id: 1, type: 'SIM', telecomCategory: 'MVNO', carrier: '알뜰폰 KT망', subType: '신규가입', name: 'NGUYEN VAN A', phone: '010-9988-7766', email: 'alex@gmail.com', detail: '[알뜰폰 · KT망] 데이터 무제한 30일 (신규가입, 천안 본점 픽업)', time: '10분 전' },
    { id: 2, type: 'SIM', telecomCategory: 'MNO', carrier: 'SKT', subType: '신규가입', name: 'KIM MINH', phone: '010-1122-3344', email: 'minh@naver.com', detail: '[통신 3사 · SKT] SKT 유학생 PASS 안심팩 (신규가입, 택배 배송)', time: '18분 전' },
    { id: 3, type: 'INTERNET', telecomCategory: 'MNO', carrier: 'KT', subType: '인터넷+TV', name: 'ZHANG WEI', phone: '010-3322-1144', email: 'zhang@qq.com', detail: 'KT 500M 인터넷+TV 상담 신청 (천안 원룸)', time: '25분 전' },
    { id: 4, type: 'INTERNET', telecomCategory: 'MVNO', carrier: '알뜰인터넷', subType: '인터넷+TV', name: 'TRAN THI HOA', phone: '010-4455-6677', email: 'hoa@gmail.com', detail: '스카이라이프 알뜰 결합 인터넷 상담', time: '40분 전' },
    { id: 5, type: 'RENTAL', telecomCategory: 'RENTAL', carrier: 'CUCKOO', subType: '정수기 렌탈', name: 'ALI MOHAMMAD', phone: '010-5544-2233', email: 'ali@gmail.com', detail: '쿠쿠 정수기 렌탈 상담 접수', time: '1시간 전' }
  ]);

  // 5. 1:1 고객 실시간 채팅
  const [chatRooms, setChatRooms] = useState({});
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [staffReplyText, setStaffReplyText] = useState('');
  const [macroTargetLang, setMacroTargetLang] = useState('vi');
  const prevMsgCountRef = useRef({});

  // 모달 상태 (서비스 상품 추가/수정, 매장 추가/수정)
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

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
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn(e);
    }
  };

  // 회원 목록, 실시간 주문 및 채팅방 동기화
  const loadData = () => {
    try {
      const storedUsers = localStorage.getItem('bada_user_db');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (e) {
      console.error(e);
    }

    try {
      const liveOrdersStr = localStorage.getItem('bada_live_orders');
      if (liveOrdersStr) {
        const liveOrders = JSON.parse(liveOrdersStr);
        setOrders(prev => {
          const liveIds = new Set(liveOrders.map(o => o.id));
          const filteredOld = prev.filter(o => !liveIds.has(o.id));
          return [...liveOrders, ...filteredOld];
        });
      }
    } catch (e) {
      console.error(e);
    }

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

        if (hasNewMsg) {
          playNotificationSound();
        }

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
    const interval = setInterval(loadData, 2000);
    window.addEventListener('storage', loadData);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadData);
    };
  }, [selectedRoomId]);

  // 관리자 로그인
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.id === 'admin' && loginForm.pw === '1234') {
      setAuthRole('admin');
      alert('총괄 관리자로 로그인되었습니다. (전체 CRUD 및 설정 권한)');
    } else if (loginForm.id === 'worker' && loginForm.pw === '1234') {
      setAuthRole('worker');
      alert('현장 직원으로 로그인되었습니다. (1:1 상담 및 조회 권한)');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 관리자 답변 전송
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!staffReplyText.trim() || !selectedRoomId) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg = { sender: 'staff', text: staffReplyText.trim(), time: timeStr };

    const room = chatRooms[selectedRoomId];
    if (!room) return;

    const updatedMessages = [...(room.messages || []), replyMsg];
    const updatedRooms = {
      ...chatRooms,
      [selectedRoomId]: {
        ...room,
        unreadCount: 0,
        messages: updatedMessages
      }
    };

    setChatRooms(updatedRooms);
    localStorage.setItem('bada_live_chat_rooms', JSON.stringify(updatedRooms));
    prevMsgCountRef.current[selectedRoomId] = updatedMessages.length;
    setStaffReplyText('');
  };

  // 매크로 메시지 즉시 전송
  const handleSendMacro = (macroId) => {
    if (!selectedRoomId) return;
    const template = MACRO_TEMPLATES.find(m => m.id === macroId);
    if (!template) return;

    const textToSend = template.translations[macroTargetLang] || template.translations.ko;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg = { sender: 'staff', text: textToSend, time: timeStr };

    const room = chatRooms[selectedRoomId];
    if (!room) return;

    const updatedMessages = [...(room.messages || []), replyMsg];
    const updatedRooms = {
      ...chatRooms,
      [selectedRoomId]: {
        ...room,
        unreadCount: 0,
        messages: updatedMessages
      }
    };

    setChatRooms(updatedRooms);
    localStorage.setItem('bada_live_chat_rooms', JSON.stringify(updatedRooms));
    prevMsgCountRef.current[selectedRoomId] = updatedMessages.length;
  };

  // 서비스 상품 등록 / 수정
  const handleSaveService = (e) => {
    e.preventDefault();
    if (editingService.isEditing) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      alert('서비스 상품 정보가 수정되었습니다.');
    } else {
      const newId = Date.now();
      setServices([...services, { ...editingService, id: newId }]);
      alert('새로운 서비스 상품이 등록되었습니다.');
    }
    setShowServiceModal(false);
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    if (confirm('정말 이 서비스를 삭제하시겠습니까?')) {
      setServices(services.filter(s => s.id !== id));
      alert('삭제되었습니다.');
    }
  };

  // 매장 등록 / 수정
  const handleSaveStore = (e) => {
    e.preventDefault();
    if (editingStore.isEditing) {
      setStores(stores.map(s => s.id === editingStore.id ? editingStore : s));
      alert('매장 정보가 수정되었습니다.');
    } else {
      setStores([...stores, editingStore]);
      alert('새 매장이 등록되었습니다.');
    }
    setShowStoreModal(false);
    setEditingStore(null);
  };

  const handleDeleteStore = (id) => {
    if (confirm('해당 매장을 삭제하시겠습니까?')) {
      setStores(stores.filter(s => s.id !== id));
      alert('삭제되었습니다.');
    }
  };

  // 서비스 목록 필터링 (알뜰폰 / 통신 3사 / 인터넷 / 렌탈)
  const filteredServices = services.filter(s => {
    if (serviceCategory === 'all') return true;
    if (serviceCategory === 'mvno') return s.category === 'SIM_MVNO';
    if (serviceCategory === 'mno') return s.category === 'SIM_MNO';
    if (serviceCategory === 'internet') return s.category === 'INTERNET';
    if (serviceCategory === 'rental') return s.category === 'RENTAL';
    return true;
  });

  // 미인증 시 로그인 화면
  if (!authRole) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '36px', borderRadius: '20px', width: '100%', maxWidth: '380px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#0284c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '22px' }}>B</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>BADA 관리자 센터</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Admin & Staff Portal</div>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>관리자 아이디</label>
              <input
                type="text"
                value={loginForm.id}
                onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                placeholder="ID를 입력하세요"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>비밀번호</label>
              <input
                type="password"
                value={loginForm.pw}
                onChange={(e) => setLoginForm({ ...loginForm, pw: e.target.value })}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <button type="submit" style={{ padding: '13px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  const selectedRoom = chatRooms[selectedRoomId];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* 관리자 헤더 */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 28px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '34px', height: '34px', backgroundColor: '#0284c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>B</div>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>BADA 관리 포털</span>
          <span style={{ backgroundColor: authRole === 'admin' ? '#e0f2fe' : '#fef3c7', color: authRole === 'admin' ? '#0369a1' : '#b45309', fontSize: '12px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
            {authRole === 'admin' ? '👑 총괄 관리자 (Admin)' : '💼 상담 직원 (Worker)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => window.open('/', '_blank')} style={{ padding: '8px 14px', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            🌐 고객용 웹사이트 열기 ↗
          </button>
          <button onClick={() => setAuthRole(null)} style={{ padding: '8px 14px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            로그아웃
          </button>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 28px', display: 'flex', gap: '8px' }}>
        {[
          { id: 'orders', label: '📋 실시간 접수 내역', badge: orders.length },
          { id: 'live_chat', label: '💬 1:1 실시간 상담', badge: Object.keys(chatRooms).length },
          { id: 'services', label: '📶 요금제/상품 관리', badge: services.length },
          { id: 'users', label: '👥 회원 명부 (CRM)', badge: users.length },
          { id: 'promotions', label: '📢 프로모션 & 배너' },
          { id: 'stores', label: '🏬 매장 관리', badge: stores.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 18px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '800' : '600',
              color: activeTab === tab.id ? '#0284c7' : '#64748b',
              borderBottom: activeTab === tab.id ? '3px solid #0284c7' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span style={{ fontSize: '11px', backgroundColor: activeTab === tab.id ? '#e0f2fe' : '#f1f5f9', color: activeTab === tab.id ? '#0284c7' : '#64748b', padding: '2px 6px', borderRadius: '10px' }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px' }}>
        {/* [탭 1] 실시간 접수 내역 (알뜰폰 / 통신 3사 / 인터넷) */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>실시간 접수 상담 / 주문 내역</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  고객용 웹사이트에서 신청된 알뜰폰, 통신 3사, 인터넷 주문이 실시간으로 집계됩니다.
                </p>
              </div>
              <button onClick={loadData} style={{ padding: '8px 14px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                🔄 새로고침
              </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px' }}>통신 구분</th>
                    <th style={{ padding: '12px 16px' }}>통신망 / 제공사</th>
                    <th style={{ padding: '12px 16px' }}>신청자 성함</th>
                    <th style={{ padding: '12px 16px' }}>연락처 / 이메일</th>
                    <th style={{ padding: '12px 16px' }}>상세 신청 내역</th>
                    <th style={{ padding: '12px 16px' }}>접수 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          backgroundColor: ord.telecomCategory === 'MVNO' ? '#f0fdf4' : ord.telecomCategory === 'MNO' ? '#fef2f2' : '#fef3c7',
                          color: ord.telecomCategory === 'MVNO' ? '#166534' : ord.telecomCategory === 'MNO' ? '#991b1b' : '#b45309',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          fontSize: '11px'
                        }}>
                          {ord.telecomCategory === 'MVNO' ? '📱 알뜰폰 (MVNO)' : ord.telecomCategory === 'MNO' ? '🏢 통신 3사 (MNO)' : '💧 렌탈'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#0284c7' }}>
                        {ord.carrier || ord.type}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>
                        {ord.name}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div>📞 {ord.phone}</div>
                        {ord.email && ord.email !== '-' && <div style={{ fontSize: '11px', color: '#64748b' }}>✉️ {ord.email}</div>}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#334155' }}>
                        {ord.detail}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '12px' }}>
                        {ord.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* [탭 2] 1:1 실시간 상담 (차임벨 사운드 & 6종 다국어 매크로 툴바 완비) */}
        {activeTab === 'live_chat' && (
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', height: '680px' }}>
            {/* 좌측: 고객 채팅 세션 목록 */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '14px' }}>
                대화 중인 고객 ({Object.keys(chatRooms).length})
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {Object.keys(chatRooms).length === 0 ? (
                  <div style={{ padding: '30px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    현재 대화 요청 고객이 없습니다.
                  </div>
                ) : (
                  Object.keys(chatRooms).map((sid) => {
                    const room = chatRooms[sid];
                    const isSelected = selectedRoomId === sid;
                    return (
                      <div
                        key={sid}
                        onClick={() => setSelectedRoomId(sid)}
                        style={{
                          padding: '14px 16px',
                          borderBottom: '1px solid #f1f5f9',
                          backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                          borderLeft: isSelected ? '4px solid #0284c7' : '4px solid transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '14px', color: isSelected ? '#0284c7' : '#0f172a' }}>
                            {room.userName}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{room.lastTime}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {room.lastMessage || '새로운 대화가 시작되었습니다.'}
                        </div>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                          <span style={{ fontSize: '10px', backgroundColor: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                            {room.lang ? room.lang.toUpperCase() : 'KO'}
                          </span>
                          <span style={{ fontSize: '10px', backgroundColor: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                            {room.userCode || '비회원'}
                          </span>
                          {room.unreadCount > 0 && (
                            <span style={{ fontSize: '10px', backgroundColor: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                              {room.unreadCount} NEW
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 우측: 1:1 대화창 & 다국어 매크로 툴바 */}
            {selectedRoom ? (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* 대화 상대 정보 헤더 */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>{selectedRoom.userName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      회원 코드: {selectedRoom.userCode} | 언어 설정: {selectedRoom.lang ? selectedRoom.lang.toUpperCase() : 'KO'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#475569', fontWeight: 'bold' }}>매크로 언어:</span>
                    <select
                      value={macroTargetLang}
                      onChange={(e) => setMacroTargetLang(e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#fff', fontWeight: 'bold' }}
                    >
                      <option value="vi">🇻🇳 Tiếng Việt (베트남어)</option>
                      <option value="zh">🇨🇳 中文 (중국어)</option>
                      <option value="en">🇺🇸 English (영어)</option>
                      <option value="ko">🇰🇷 한국어</option>
                    </select>
                  </div>
                </div>

                {/* 6종 원터치 다국어 빠른 답변 툴바 */}
                <div style={{ padding: '10px 16px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {MACRO_TEMPLATES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSendMacro(m.id)}
                      title={m.translations[macroTargetLang]}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#0f172a',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* 메시지 로그 */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' }}>
                  {selectedRoom.messages && selectedRoom.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        alignSelf: msg.sender === 'staff' ? 'flex-end' : 'flex-start',
                        maxWidth: '70%'
                      }}
                    >
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px', textAlign: msg.sender === 'staff' ? 'right' : 'left' }}>
                        {msg.sender === 'staff' ? '💼 상담 직원 (나)' : `👤 ${selectedRoom.userName}`} · {msg.time}
                      </div>
                      <div
                        style={{
                          padding: '10px 14px',
                          borderRadius: '12px',
                          backgroundColor: msg.sender === 'staff' ? '#0284c7' : '#ffffff',
                          color: msg.sender === 'staff' ? '#ffffff' : '#1e293b',
                          border: msg.sender === 'staff' ? 'none' : '1px solid #e2e8f0',
                          fontSize: '13px',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-wrap',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 입력창 */}
                <form onSubmit={handleSendReply} style={{ padding: '14px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', backgroundColor: '#ffffff' }}>
                  <input
                    type="text"
                    placeholder="고객에게 보낼 답변을 입력하세요 (엔터로 전송)..."
                    value={staffReplyText}
                    onChange={(e) => setStaffReplyText(e.target.value)}
                    style={{ flex: 1, padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    style={{ padding: '11px 20px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    답변 전송
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                왼쪽에서 대화할 고객을 선택해 주세요.
              </div>
            )}
          </div>
        )}

        {/* [탭 3] 요금제 / 상품 관리 (알뜰폰 / 통신 3사 카테고리 분리 탑재) */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>요금제 및 서비스 상품 관리</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  알뜰폰(MVNO), 통신 3사(MNO), 인터넷, 렌탈 상품을 등록하고 수정합니다.
                </p>
              </div>
              {authRole === 'admin' && (
                <button
                  onClick={() => {
                    setEditingService({
                      id: null,
                      category: 'SIM_MVNO',
                      title: '',
                      provider: '알뜰폰 KT망',
                      price: '',
                      unit: '/월',
                      badge: '',
                      icon: '📶',
                      sub: '',
                      desc: '',
                      isEditing: false
                    });
                    setShowServiceModal(true);
                  }}
                  style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  ➕ 새 상품 등록
                </button>
              )}
            </div>

            {/* 카테고리 필터 탭 */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {[
                { id: 'all', label: '전체 상품' },
                { id: 'mvno', label: '📱 알뜰폰 (MVNO)' },
                { id: 'mno', label: '🏢 통신 3사 (MNO)' },
                { id: 'internet', label: '🌐 인터넷+TV' },
                { id: 'rental', label: '💧 가전/렌탈' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setServiceCategory(f.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: serviceCategory === f.id ? '2px solid #0284c7' : '1px solid #cbd5e1',
                    backgroundColor: serviceCategory === f.id ? '#f0f9ff' : '#ffffff',
                    color: serviceCategory === f.id ? '#0284c7' : '#475569',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 상품 그리드 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredServices.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '22px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: item.category === 'SIM_MVNO' ? '#f0fdf4' : item.category === 'SIM_MNO' ? '#fef2f2' : '#e0f2fe',
                      color: item.category === 'SIM_MVNO' ? '#166534' : item.category === 'SIM_MNO' ? '#991b1b' : '#0369a1'
                    }}>
                      {item.category === 'SIM_MVNO' ? '알뜰폰' : item.category === 'SIM_MNO' ? '통신 3사' : item.category}
                    </span>
                    {item.badge && <span style={{ fontSize: '11px', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{item.badge}</span>}
                  </div>
                  <div style={{ fontSize: '26px', margin: '4px 0' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '17px', margin: '6px 0 2px 0', fontWeight: 'bold' }}>{item.title}</h3>
                  <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold', marginBottom: '8px' }}>{item.provider} | {item.sub}</div>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>
                    ₩ {item.price} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}>{item.unit}</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '12px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '10px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {item.desc}
                  </div>
                  {authRole === 'admin' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
                      <button onClick={() => { setEditingService({ ...item, isEditing: true }); setShowServiceModal(true); }} style={{ padding: '8px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>수정</button>
                      <button onClick={() => handleDeleteService(item.id)} style={{ padding: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>삭제</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [탭 4] 회원 명부 (CRM) */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>등록 회원 명부 (CRM)</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  고유 코드(0000_0000_0001) 체계로 관리되며, 회원 탈퇴 시 영구 삭제됩니다.
                </p>
              </div>
              <button onClick={loadData} style={{ padding: '8px 14px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                🔄 새로고침
              </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 16px' }}>회원 코드</th>
                    <th style={{ padding: '12px 16px' }}>회원 아이디</th>
                    <th style={{ padding: '12px 16px' }}>성함 (Name)</th>
                    <th style={{ padding: '12px 16px' }}>등록 이메일</th>
                    <th style={{ padding: '12px 16px' }}>가입 일자</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.userCode} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748b', fontSize: '12px' }}>
                        {u.userCode}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#0284c7' }}>
                        {u.username}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>
                        {u.name}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {u.email}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '12px' }}>
                        {u.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* [탭 5] 프로모션 관리 */}
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

        {/* [탭 6] 매장 관리 */}
        {activeTab === 'stores' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록된 픽업 매장/대리점</h2>
              {authRole === 'admin' && (
                <button onClick={() => { setEditingStore({ id: `store_${Date.now()}`, name: '', address: '', isEditing: false }); setShowStoreModal(true); }} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
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
      </main>

      {/* 서비스 상품 등록/수정 모달 */}
      {showServiceModal && editingService && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '480px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>{editingService.isEditing ? '서비스 상품 수정' : '새 서비스 상품 등록'}</h3>
            <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>상품 구분 (카테고리)</label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }}
                >
                  <option value="SIM_MVNO">📱 알뜰폰 (MVNO)</option>
                  <option value="SIM_MNO">🏢 통신 3사 (MNO)</option>
                  <option value="INTERNET">🌐 인터넷+TV</option>
                  <option value="RENTAL">💧 가전/정수기 렌탈</option>
                </select>
              </div>
              <input type="text" placeholder="상품명 (예: 데이터 무제한 30일)" value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              <input type="text" placeholder="제공사 / 통신망 (예: 알뜰폰 KT망, SKT, LG U+, CUCKOO)" value={editingService.provider} onChange={(e) => setEditingService({ ...editingService, provider: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="가격 (예: 39,600)" value={editingService.price} onChange={(e) => setEditingService({ ...editingService, price: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
                <input type="text" placeholder="단위 (예: /월, 당일지급)" value={editingService.unit} onChange={(e) => setEditingService({ ...editingService, unit: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="뱃지 (예: BEST, 가성비1등)" value={editingService.badge} onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" placeholder="아이콘 이모지 (예: 📶, 📱, 🌐)" value={editingService.icon} onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <input type="text" placeholder="부제목 요약" value={editingService.sub} onChange={(e) => setEditingService({ ...editingService, sub: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <textarea rows={3} placeholder="상세 설명 (줄바꿈 구분)" value={editingService.desc} onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowServiceModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 대리점 등록/수정 모달 */}
      {showStoreModal && editingStore && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '420px', padding: '26px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>{editingStore.isEditing ? '대리점 정보 수정' : '새 대리점 등록'}</h3>
            <form onSubmit={handleSaveStore} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="매장명 (예: 바다 천안 본점)" value={editingStore.name} onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })} style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
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
