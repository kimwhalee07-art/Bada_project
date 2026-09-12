'use client';
import React, { useState, useEffect, useRef } from 'react';

// 다국어 표준 매크로 사전 (6종)
const MACROS = [
  { id: 'id_req', label: '📸 여권/등록증 요청', t: { ko: '개통 처리를 위해 여권 사진(또는 외국인등록증 앞뒷면)을 보내주세요.', en: 'Please send a clear photo of your Passport or ARC.', zh: '办理开通需要，请发送护照或外国人登录证照片。', vi: 'Vui lòng gửi ảnh chụp Hộ chiếu hoặc Thẻ ARC để kích hoạt SIM.' } },
  { id: 'fast_act', label: '⚡ 5분 즉시 개통', t: { ko: '서류 확인 완료! 5분 내로 즉시 개통 처리해 드립니다.', en: 'Documents verified! Activating within 5 minutes.', zh: '材料已确认！5分钟内为您快速开通。', vi: 'Giấy tờ đã xác nhận! Kích hoạt ngay trong 5 phút.' } },
  { id: 'cash_gift', label: '🎁 사은품 당일 입금', t: { ko: '인터넷+TV 설치 완료 당일, 약속드린 현금 사은품을 즉시 입금해 드립니다.', en: 'Your cash gift will be deposited directly on installation day.', zh: '宽带安装当天，承诺的现金补贴将立即转账。', vi: 'Quà tặng tiền mặt sẽ chuyển khoản ngay ngày lắp đặt.' } },
  { id: 'hanpass', label: '💸 한패스 코드', t: { ko: '한패스 앱에서 추천인 코드 [BADA2026] 입력 시 첫 송금 수수료 무료 쿠폰 지급!', en: 'Enter code [BADA2026] in HANPASS app for free transfer coupon.', zh: '在HANPASS输入 [BADA2026] 获首笔免手续费券。', vi: 'Nhập mã [BADA2026] trên HANPASS nhận coupon phí 0đ.' } },
  { id: 'store', label: '🏬 천안 본점 방문', t: { ko: '바다 천안 본점(천안역 동부광장 도보 3분)으로 실물 신분증 지참 후 방문해 주세요.', en: 'Please visit BADA Cheonan Store with your ID.', zh: '请携带证件前往BADA天安总店自提。', vi: 'Vui lòng mang theo giấy tờ đến BADA chi nhánh Cheonan.' } },
  { id: 'wait', label: '⏳ 확인 대기 요청', t: { ko: '고객님의 문의 사항을 확인 중입니다. 잠시만 기다려 주세요.', en: 'Checking your request. Please hold on a moment.', zh: '正在核实信息，请稍候片刻。', vi: 'Đang kiểm tra thông tin, vui lòng đợi trong giây lát.' } }
];

// 기본 직원 계정 DB
const DEFAULT_STAFF = [
  { id: 'worker1', pw: '1234', name: '김상담 주임', dept: '상담 1팀 (베트남 전담)' },
  { id: 'worker2', pw: '1234', name: '박민우 대리', dept: '상담 2팀 (중국/영어 전담)' },
  { id: 'worker3', pw: '1234', name: '이수진 사원', dept: '상담 3팀 (통신3사/인터넷)' }
];

// 기본 상품 목록 (알뜰폰 / 통신 3사 / 인터넷 / 렌탈)
const DEFAULT_SERVICES = [
  { id: 1, category: 'SIM_MVNO', title: '데이터 무제한 30일 (KT망)', provider: '알뜰폰 KT망', price: '39,600', unit: '/월', badge: 'BEST 알뜰', icon: '📶', sub: '데이터/통화 무제한', desc: '11GB+일2GB 후 3Mbps 무제한\n통화/문자 무제한\n여권/등록증 즉시 개통' },
  { id: 2, category: 'SIM_MVNO', title: '실속 가성비 15GB+ (LG망)', provider: '알뜰폰 LG망', price: '24,900', unit: '/월', badge: '가성비 1등', icon: '⚡', sub: '유학생 인기', desc: '15GB+3Mbps 무제한\n통화 100분/문자 100건\n무약정 플랜' },
  { id: 3, category: 'SIM_MVNO', title: '실속형 선불폰', provider: '선불 알뜰폰', price: '15,000', unit: '/부터', badge: '초기정착', icon: '📱', sub: '종량 충전형', desc: '필요한 만큼 충전\n여권 당일 개통' },
  { id: 4, category: 'SIM_MNO', title: 'KT 5G 슬림 베이직', provider: 'KT (통신3사)', price: '55,000', unit: '/월', badge: 'KT 정규망', icon: '🚀', sub: '정규 고속망', desc: 'KT 정규 회선 개통\nPASS 본인인증 100% 보장 · 은행 계좌 개설' },
  { id: 5, category: 'SIM_MNO', title: 'SKT 유학생 PASS 안심팩', provider: 'SKT (통신3사)', price: '29,700', unit: '/월', badge: '인증특화', icon: '🎓', sub: '본인인증 완벽', desc: '외국인등록증 필수\n은행/배달앱 본인확인\nT월드 공식 AS' },
  { id: 6, category: 'INTERNET', title: 'KT 기가 인터넷+TV', provider: 'KT', price: '최대 47만원', unit: '당일지급', badge: 'NO.1', icon: '🌐', sub: '대칭형 기가', desc: '사은품 전액 지급\n전국 1등 커버리지\nWiFi 공유기 무상' },
  { id: 7, category: 'INTERNET', title: 'SK 브로드밴드+TV', provider: 'SK', price: '최대 47만원', unit: '당일지급', badge: '가성비최고', icon: '🌐', sub: '다국어 채널', desc: '가족 결합 할인\n다양한 외국어 방송' },
  { id: 8, category: 'INTERNET', title: 'LG U+ 인터넷+TV', provider: 'LG', price: '최대 47만원', unit: '당일지급', badge: 'OTT특화', icon: '🌐', sub: '넷플릭스 결합', desc: 'IPTV 셋톱박스 제공\n설치 당일 현금 입금' },
  { id: 9, category: 'INTERNET', title: '알뜰인터넷 (스카이라이프)', provider: '알뜰결합', price: '최대 35만원', unit: '당일지급', badge: '월1만원대', icon: '🌐', sub: '초특가 결합', desc: '알뜰폰 결합 시 월 1만원대\n현금 사은품 당일 지급' },
  { id: 10, category: 'RENTAL', title: '쿠쿠 슬림 냉온정수기', provider: 'CUCKOO', price: '19,900', unit: '/월', badge: '인기렌탈', icon: '💧', sub: '간편 심사', desc: '등록증 하나로 당일 접수\n초기 등록비 면제\n필터 무상 교체' }
];

export default function AdminPage() {
  const [authRole, setAuthRole] = useState(null); // null | 'admin' | 'worker'
  const [currentStaff, setCurrentStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });

  // 직원 관리 & 모니터링
  const [staffList, setStaffList] = useState([]);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState({ id: '', pw: '', name: '', dept: '' });
  const [monitorStaffId, setMonitorStaffId] = useState(null);
  const [monitorRoomId, setMonitorRoomId] = useState(null);
  const [reassignTargetStaffId, setReassignTargetStaffId] = useState('');
  const [adminInterventionText, setAdminInterventionText] = useState('');

  // 1:1 상담 채팅
  const [chatRooms, setChatRooms] = useState({});
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [staffReplyText, setStaffReplyText] = useState('');
  const [macroTargetLang, setMacroTargetLang] = useState('vi');
  const [chatFilterStaffId, setChatFilterStaffId] = useState('all');
  const prevMsgCountRef = useRef({});

  // 상품/서비스 & 프로모션 & 매장 & 주문 & 회원
  const [serviceCategory, setServiceCategory] = useState('all');
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [promotions, setPromotions] = useState({
    hanpassCode: 'BADA2026',
    hanpassBenefit: '수수료 0원 쿠폰 + 우대 환율 100% 적용',
    internetNotice: '💡 바다 유심 + 인터넷 동시 신청 고객 특별 혜택: 유심 첫 달 기본요금 추가 할인 지원!'
  });
  const [stores, setStores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 도보 3분)' },
    { id: 'ansan', name: '바다 안산 다문화거리점', address: '경기 안산시 단원구 원곡동' },
    { id: 'suwon', name: '바다 수원역점', address: '경기 수원시 팔달구 매산로' }
  ]);
  const [orders, setOrders] = useState([
    { id: 1, type: 'SIM', telecomCategory: 'MVNO', carrier: '알뜰폰 KT망', name: 'NGUYEN VAN A', phone: '010-9988-7766', email: 'alex@gmail.com', detail: '[알뜰폰 · KT망] 데이터 무제한 30일 (천안 본점 픽업)', time: '10분 전' },
    { id: 2, type: 'SIM', telecomCategory: 'MNO', carrier: 'SKT', name: 'KIM MINH', phone: '010-1122-3344', email: 'minh@naver.com', detail: '[통신 3사 · SKT] SKT 유학생 PASS 안심팩 (택배 배송)', time: '18분 전' },
    { id: 3, type: 'INTERNET', telecomCategory: 'MNO', carrier: 'KT', name: 'ZHANG WEI', phone: '010-3322-1144', email: 'zhang@qq.com', detail: 'KT 500M 인터넷+TV 상담 신청 (천안 원룸)', time: '25분 전' }
  ]);
  const [users, setUsers] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  // 알림 사운드 (차임벨)
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
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
    } catch (e) {}
  };

  // 데이터 동기화 및 1:1 자동 균등 배정 (Least-Connections)
  const loadData = () => {
    let staffDb = DEFAULT_STAFF;
    try {
      const s = localStorage.getItem('bada_staff_db');
      if (s) staffDb = JSON.parse(s);
      else localStorage.setItem('bada_staff_db', JSON.stringify(DEFAULT_STAFF));
      setStaffList(staffDb);
      if (!monitorStaffId && staffDb.length > 0) setMonitorStaffId(staffDb[0].id);
    } catch (e) {}

    try {
      const u = localStorage.getItem('bada_user_db');
      if (u) setUsers(JSON.parse(u));
      const ordStr = localStorage.getItem('bada_live_orders');
      if (ordStr) {
        const liveOrders = JSON.parse(ordStr);
        setOrders(prev => [...liveOrders, ...prev.filter(o => !liveOrders.some(lo => lo.id === o.id))]);
      }
    } catch (e) {}

    try {
      const cStr = localStorage.getItem('bada_live_chat_rooms');
      if (cStr) {
        const parsed = JSON.parse(cStr);
        let hasNew = false;
        let needSave = false;
        const loadMap = {};
        staffDb.forEach(st => { loadMap[st.id] = 0; });
        Object.values(parsed).forEach(r => {
          if (r.assignedStaffId && loadMap[r.assignedStaffId] !== undefined) loadMap[r.assignedStaffId]++;
        });

        Object.keys(parsed).forEach(k => {
          const r = parsed[k];
          if (!r.assignedStaffId && staffDb.length > 0) {
            let least = staffDb[0];
            staffDb.forEach(st => { if ((loadMap[st.id] || 0) < (loadMap[least.id] || 0)) least = st; });
            r.assignedStaffId = least.id;
            r.assignedStaffName = least.name;
            loadMap[least.id] = (loadMap[least.id] || 0) + 1;
            needSave = true;
          }

          const prevCnt = prevMsgCountRef.current[k] || 0;
          if (r.messages && r.messages.length > prevCnt) {
            const last = r.messages[r.messages.length - 1];
            if (last && last.sender === 'customer') {
              if (authRole === 'admin' || (currentStaff && r.assignedStaffId === currentStaff.id)) hasNew = true;
            }
            prevMsgCountRef.current[k] = r.messages.length;
          }
        });

        if (needSave) localStorage.setItem('bada_live_chat_rooms', JSON.stringify(parsed));
        if (hasNew) playChime();
        setChatRooms(parsed);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 2000);
    window.addEventListener('storage', loadData);
    return () => { clearInterval(timer); window.removeEventListener('storage', loadData); };
  }, [authRole, currentStaff]);

  // 로그인 인증
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const id = loginForm.id.trim();
    const pw = loginForm.pw.trim();

    if (id === 'admin' && pw === '1234') {
      setAuthRole('admin');
      setCurrentStaff({ id: 'admin', name: '총괄 관리자 (대표)', dept: '본사 총괄' });
      setActiveTab('orders');
      alert('👑 총괄 관리자로 로그인되었습니다.\n전체 권한 및 [직원 관리 & 대화 모니터링] 탭이 활성화됩니다.');
      return;
    }

    const staffDb = JSON.parse(localStorage.getItem('bada_staff_db') || JSON.stringify(DEFAULT_STAFF));
    const matched = staffDb.find(s => s.id === id && s.pw === pw);

    if (!matched && id === 'worker' && pw === '1234') {
      const fallback = staffDb[0] || { id: 'worker1', name: '현장 상담 직원', dept: '상담 1팀' };
      setAuthRole('worker');
      setCurrentStaff(fallback);
      setActiveTab('live_chat');
      alert(`💼 직원(${fallback.name})으로 로그인되었습니다.\n자신에게 1:1 배정된 고객만 표시됩니다.`);
      return;
    }

    if (matched) {
      setAuthRole('worker');
      setCurrentStaff(matched);
      setActiveTab('live_chat');
      alert(`💼 직원(${matched.name})으로 로그인되었습니다.\n자신에게 1:1 배정된 고객만 표시됩니다.`);
      return;
    }

    alert('아이디 또는 비밀번호가 올바르지 않습니다.\n(총괄: admin / 1234, 직원: worker1 / 1234)');
  };

  // 신규 직원 등록
  const handleSaveNewStaff = (e) => {
    e.preventDefault();
    if (!editingStaff.id || !editingStaff.pw || !editingStaff.name) {
      alert('아이디, 비밀번호, 성함을 모두 입력하세요.');
      return;
    }
    const staffDb = JSON.parse(localStorage.getItem('bada_staff_db') || JSON.stringify(DEFAULT_STAFF));
    if (staffDb.some(s => s.id === editingStaff.id.trim())) {
      alert('이미 존재하는 직원 아이디입니다.');
      return;
    }
    const item = { id: editingStaff.id.trim(), pw: editingStaff.pw.trim(), name: editingStaff.name.trim(), dept: editingStaff.dept.trim() || '고객 상담팀' };
    const updated = [...staffDb, item];
    setStaffList(updated);
    localStorage.setItem('bada_staff_db', JSON.stringify(updated));
    setShowStaffModal(false);
    setEditingStaff({ id: '', pw: '', name: '', dept: '' });
    alert(`신규 직원 [${item.name} (${item.id})] 등록 완료!`);
  };

  // 직원 삭제
  const handleDeleteStaff = (staffId, staffName) => {
    if (staffList.length <= 1) { alert('최소 1명 이상의 직원이 유지되어야 합니다.'); return; }
    if (!confirm(`[${staffName}] 직원을 삭제하시겠습니까?\n배정된 상담은 다른 직원에게 자동 재배정됩니다.`)) return;
    const updated = staffList.filter(s => s.id !== staffId);
    setStaffList(updated);
    localStorage.setItem('bada_staff_db', JSON.stringify(updated));

    const fallback = updated[0];
    const chats = JSON.parse(localStorage.getItem('bada_live_chat_rooms') || '{}');
    let changed = false;
    Object.keys(chats).forEach(k => {
      if (chats[k].assignedStaffId === staffId) {
        chats[k].assignedStaffId = fallback.id;
        chats[k].assignedStaffName = fallback.name;
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem('bada_live_chat_rooms', JSON.stringify(chats));
      setChatRooms(chats);
    }
    if (monitorStaffId === staffId) setMonitorStaffId(fallback.id);
    alert(`직원 [${staffName}] 삭제 완료.`);
  };

  // 고객 1:1 담당 직원 변경 (재배정)
  const handleReassignCustomer = (roomId, targetStaffId) => {
    if (!targetStaffId) return;
    const target = staffList.find(s => s.id === targetStaffId);
    if (!target) return;
    const chats = { ...chatRooms };
    if (chats[roomId]) {
      const prev = chats[roomId].assignedStaffName || '미지정';
      chats[roomId].assignedStaffId = target.id;
      chats[roomId].assignedStaffName = target.name;
      chats[roomId].messages = [
        ...(chats[roomId].messages || []),
        { sender: 'system', text: `[안내] 상담 담당자가 [${target.name}] 님으로 변경되었습니다.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ];
      setChatRooms(chats);
      localStorage.setItem('bada_live_chat_rooms', JSON.stringify(chats));
      alert(`담당자가 [${prev}] -> [${target.name}] 님으로 변경되었습니다.`);
    }
  };

  // 1:1 답변 전송
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!staffReplyText.trim() || !selectedRoomId) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg = { sender: 'staff', staffName: currentStaff?.name || '상담원', text: staffReplyText.trim(), time: timeStr };
    const room = chatRooms[selectedRoomId];
    if (!room) return;
    const updatedMessages = [...(room.messages || []), replyMsg];
    const updatedRooms = { ...chatRooms, [selectedRoomId]: { ...room, unreadCount: 0, lastMessage: staffReplyText.trim(), lastTime: timeStr, messages: updatedMessages } };
    setChatRooms(updatedRooms);
    localStorage.setItem('bada_live_chat_rooms', JSON.stringify(updatedRooms));
    prevMsgCountRef.current[selectedRoomId] = updatedMessages.length;
    setStaffReplyText('');
  };

  // 매크로 전송
  const handleSendMacro = (macroId) => {
    if (!selectedRoomId) return;
    const tpl = MACROS.find(m => m.id === macroId);
    if (!tpl) return;
    const textToSend = tpl.t[macroTargetLang] || tpl.t.ko;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg = { sender: 'staff', staffName: currentStaff?.name || '상담원', text: textToSend, time: timeStr };
    const room = chatRooms[selectedRoomId];
    if (!room) return;
    const updatedMessages = [...(room.messages || []), replyMsg];
    const updatedRooms = { ...chatRooms, [selectedRoomId]: { ...room, unreadCount: 0, lastMessage: textToSend, lastTime: timeStr, messages: updatedMessages } };
    setChatRooms(updatedRooms);
    localStorage.setItem('bada_live_chat_rooms', JSON.stringify(updatedRooms));
    prevMsgCountRef.current[selectedRoomId] = updatedMessages.length;
  };

  // 총괄관리자 본사 개입 전송
  const handleSendAdminIntervention = (e) => {
    e.preventDefault();
    if (!adminInterventionText.trim() || !monitorRoomId) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg = { sender: 'staff', staffName: '👑 총괄관리자 (본사 개입)', text: `[총괄관리자 안내] ${adminInterventionText.trim()}`, time: timeStr };
    const room = chatRooms[monitorRoomId];
    if (!room) return;
    const updatedMessages = [...(room.messages || []), replyMsg];
    const updatedRooms = { ...chatRooms, [monitorRoomId]: { ...room, unreadCount: 0, lastMessage: replyMsg.text, lastTime: timeStr, messages: updatedMessages } };
    setChatRooms(updatedRooms);
    localStorage.setItem('bada_live_chat_rooms', JSON.stringify(updatedRooms));
    prevMsgCountRef.current[monitorRoomId] = updatedMessages.length;
    setAdminInterventionText('');
  };

  // 서비스 저장/삭제
  const handleSaveService = (e) => {
    e.preventDefault();
    if (editingService.isEditing) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      alert('수정되었습니다.');
    } else {
      setServices([...services, { ...editingService, id: Date.now() }]);
      alert('등록되었습니다.');
    }
    setShowServiceModal(false);
    setEditingService(null);
  };
  const handleDeleteService = (id) => {
    if (confirm('삭제하시겠습니까?')) {
      setServices(services.filter(s => s.id !== id));
      alert('삭제되었습니다.');
    }
  };

  // 매장 저장/삭제
  const handleSaveStore = (e) => {
    e.preventDefault();
    if (editingStore.isEditing) {
      setStores(stores.map(s => s.id === editingStore.id ? editingStore : s));
      alert('수정되었습니다.');
    } else {
      setStores([...stores, editingStore]);
      alert('등록되었습니다.');
    }
    setShowStoreModal(false);
    setEditingStore(null);
  };
  const handleDeleteStore = (id) => {
    if (confirm('삭제하시겠습니까?')) {
      setStores(stores.filter(s => s.id !== id));
      alert('삭제되었습니다.');
    }
  };

  const visibleChatSessionIds = Object.keys(chatRooms).filter(sid => {
    const r = chatRooms[sid];
    if (authRole === 'worker' && currentStaff) return r.assignedStaffId === currentStaff.id;
    if (authRole === 'admin') {
      if (chatFilterStaffId === 'all') return true;
      return r.assignedStaffId === chatFilterStaffId;
    }
    return true;
  });

  const monitoredStaffRooms = Object.keys(chatRooms).filter(sid => chatRooms[sid].assignedStaffId === monitorStaffId);
  const selectedRoom = chatRooms[selectedRoomId];
  const monitoredRoom = chatRooms[monitorRoomId];
  const activeMonitoredStaff = staffList.find(s => s.id === monitorStaffId);

  // 미인증 로그인 화면
  if (!authRole) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '36px', borderRadius: '20px', width: '100%', maxWidth: '380px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#0284c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '22px' }}>B</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>BADA 관리자 포털</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Admin & Staff Portal</div>
            </div>
          </div>
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>아이디</label>
              <input type="text" value={loginForm.id} onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} placeholder="admin 또는 worker1" required />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '4px' }}>비밀번호</label>
              <input type="password" value={loginForm.pw} onChange={(e) => setLoginForm({ ...loginForm, pw: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} placeholder="기본: 1234" required />
            </div>
            <button type="submit" style={{ padding: '13px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>로그인</button>
          </form>
          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', fontSize: '11px', color: '#64748b', lineHeight: '1.6' }}>
            <strong>💡 계정 안내:</strong><br />
            • <strong>총괄관리자:</strong> <code style={{ color: '#0284c7' }}>admin</code> / <code style={{ color: '#0284c7' }}>1234</code> (직원 관리 & 대화 모니터링 탭 열람)<br />
            • <strong>상담 직원 1:</strong> <code style={{ color: '#0284c7' }}>worker1</code> / <code style={{ color: '#0284c7' }}>1234</code> (김상담 전담 배정)<br />
            • <strong>상담 직원 2:</strong> <code style={{ color: '#0284c7' }}>worker2</code> / <code style={{ color: '#0284c7' }}>1234</code> (박민우 전담 배정)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        .btn { border:none; border-radius:6px; padding:7px 13px; font-weight:bold; cursor:pointer; font-size:13px; }
        .btn-pri { background:#0284c7; color:#fff; }
        .btn-sec { background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; }
        .card { background:#ffffff; border-radius:12px; border:1px solid #e2e8f0; padding:16px; box-shadow:0 1px 3px rgba(0,0,0,0.04); }
        .inp { width:100%; padding:8px 11px; border-radius:6px; border:1px solid #cbd5e1; font-size:13px; box-sizing:border-box; }
        .tbl { width:100%; border-collapse:collapse; font-size:13px; text-align:left; }
        .th { padding:11px 14px; background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569; font-weight:bold; }
        .td { padding:11px 14px; border-bottom:1px solid #f1f5f9; }
        .modal { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:60; display:flex; align-items:center; justify-content:center; padding:20px; }
        .modal-box { background:#ffffff; border-radius:16px; width:100%; max-width:420px; padding:22px; max-height:90vh; overflow-y:auto; }
      `}</style>

      {/* 헤더 */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 24px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '34px', height: '34px', backgroundColor: '#0284c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>B</div>
          <span style={{ fontSize: '18px', fontWeight: '800' }}>BADA 통합 관리 포털</span>
          <span style={{ backgroundColor: authRole === 'admin' ? '#e0f2fe' : '#fef3c7', color: authRole === 'admin' ? '#0369a1' : '#b45309', fontSize: '12px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
            {authRole === 'admin' ? '👑 총괄 관리자 (대표)' : `💼 ${currentStaff?.name || '상담 직원'} (${currentStaff?.dept || ''})`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => window.open('/', '_blank')} className="btn btn-sec">🌐 고객용 사이트 ↗</button>
          <button onClick={() => { setAuthRole(null); setCurrentStaff(null); }} className="btn" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>로그아웃</button>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 24px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {[
          { id: 'orders', label: '📋 접수 내역', badge: orders.length },
          { id: 'live_chat', label: '💬 1:1 실시간 상담', badge: visibleChatSessionIds.length },
          ...(authRole === 'admin' ? [{ id: 'staff_mgmt', label: '👥 직원 관리 & 대화 모니터링', badge: staffList.length, highlight: true }] : []),
          { id: 'services', label: '📶 요금제/상품', badge: services.length },
          { id: 'users', label: '👤 회원 CRM', badge: users.length },
          { id: 'promotions', label: '📢 프로모션' },
          { id: 'stores', label: '🏬 매장 관리', badge: stores.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 16px', border: 'none', background: tab.highlight && activeTab !== tab.id ? '#eff6ff' : 'none',
              fontSize: '13px', fontWeight: activeTab === tab.id ? '800' : '600',
              color: activeTab === tab.id ? '#0284c7' : tab.highlight ? '#1d4ed8' : '#64748b',
              borderBottom: activeTab === tab.id ? '3px solid #0284c7' : '3px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap'
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

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '22px' }}>
        {/* [탭 1] 실시간 접수 내역 */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>실시간 접수 상담 / 주문 내역</h2>
              <button onClick={loadData} className="btn btn-sec">🔄 새로고침</button>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th className="th">구분</th>
                    <th className="th">통신사/망</th>
                    <th className="th">신청자 성함</th>
                    <th className="th">연락처 / 이메일</th>
                    <th className="th">신청 내역</th>
                    <th className="th">접수 시간</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(ord => (
                    <tr key={ord.id}>
                      <td className="td">
                        <span style={{
                          backgroundColor: ord.telecomCategory === 'MVNO' ? '#f0fdf4' : ord.telecomCategory === 'MNO' ? '#fef2f2' : '#fef3c7',
                          color: ord.telecomCategory === 'MVNO' ? '#166534' : ord.telecomCategory === 'MNO' ? '#991b1b' : '#b45309',
                          padding: '3px 8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px'
                        }}>
                          {ord.telecomCategory === 'MVNO' ? '📱 알뜰폰' : ord.telecomCategory === 'MNO' ? '🏢 통신 3사' : '💧 렌탈'}
                        </span>
                      </td>
                      <td className="td" style={{ fontWeight: 'bold', color: '#0284c7' }}>{ord.carrier || ord.type}</td>
                      <td className="td" style={{ fontWeight: 'bold' }}>{ord.name}</td>
                      <td className="td"><div>📞 {ord.phone}</div>{ord.email && ord.email !== '-' && <div style={{ fontSize: '11px', color: '#64748b' }}>✉️ {ord.email}</div>}</td>
                      <td className="td">{ord.detail}</td>
                      <td className="td" style={{ color: '#94a3b8', fontSize: '12px' }}>{ord.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* [탭 2] 1:1 실시간 상담 */}
        {activeTab === 'live_chat' && (
          <div>
            {authRole === 'admin' ? (
              <div style={{ backgroundColor: '#ffffff', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>🔍 직원별 필터:</span>
                  <select value={chatFilterStaffId} onChange={e => setChatFilterStaffId(e.target.value)} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 'bold' }}>
                    <option value="all">전체 고객 ({Object.keys(chatRooms).length}명)</option>
                    {staffList.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.dept}) - {Object.values(chatRooms).filter(r => r.assignedStaffId === s.id).length}명</option>
                    ))}
                  </select>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>💡 <strong>총괄관리자:</strong> 대화방 상단에서 담당 직원을 즉시 변경할 수 있습니다.</div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '9px 14px', marginBottom: '12px', fontSize: '13px', color: '#1e40af' }}>
                💼 <strong>{currentStaff?.name}</strong> 님에게 1:1 배정된 상담 목록입니다. (총 {visibleChatSessionIds.length}명)
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '16px', height: '640px' }}>
              <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '11px 14px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>고객 목록 ({visibleChatSessionIds.length})</span>
                  <button onClick={loadData} style={{ border: 'none', background: 'none', color: '#0284c7', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>새로고침</button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {visibleChatSessionIds.length === 0 ? (
                    <div style={{ padding: '36px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>배정된 상담 고객이 없습니다.</div>
                  ) : (
                    visibleChatSessionIds.map(sid => {
                      const room = chatRooms[sid];
                      const isSel = selectedRoomId === sid;
                      return (
                        <div key={sid} onClick={() => setSelectedRoomId(sid)} style={{ padding: '11px 13px', borderBottom: '1px solid #f1f5f9', backgroundColor: isSel ? '#f0f9ff' : '#fff', borderLeft: isSel ? '4px solid #0284c7' : '4px solid transparent', cursor: 'pointer' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                            <strong style={{ fontSize: '13px', color: isSel ? '#0284c7' : '#0f172a' }}>{room.userName}</strong>
                            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{room.lastTime}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{room.lastMessage || '새 상담'}</div>
                          <div style={{ display: 'flex', gap: '5px', marginTop: '5px', alignItems: 'center' }}>
                            <span style={{ fontSize: '10px', backgroundColor: '#e2e8f0', padding: '1px 5px', borderRadius: '4px' }}>{room.lang ? room.lang.toUpperCase() : 'KO'}</span>
                            <span style={{ fontSize: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>👤 {room.assignedStaffName || '미배정'}</span>
                            {room.unreadCount > 0 && <span style={{ fontSize: '10px', backgroundColor: '#ef4444', color: '#fff', padding: '1px 5px', borderRadius: '10px', fontWeight: 'bold' }}>{room.unreadCount} NEW</span>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {selectedRoom ? (
                <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {selectedRoom.userName} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'normal' }}>({selectedRoom.userCode} | {selectedRoom.lang ? selectedRoom.lang.toUpperCase() : 'KO'})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>담당자:</span>
                      {authRole === 'admin' ? (
                        <select value={selectedRoom.assignedStaffId || ''} onChange={e => handleReassignCustomer(selectedRoomId, e.target.value)} style={{ padding: '3px 7px', borderRadius: '5px', border: '1px solid #0284c7', fontSize: '11px', fontWeight: 'bold', color: '#0284c7' }}>
                          {staffList.map(s => (<option key={s.id} value={s.id}>{s.name} ({s.dept})</option>))}
                        </select>
                      ) : (
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '2px 7px', borderRadius: '5px' }}>{selectedRoom.assignedStaffName || '나에게 배정'}</span>
                      )}
                      <span style={{ fontSize: '11px', color: '#cbd5e1' }}>|</span>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>매크로:</span>
                      <select value={macroTargetLang} onChange={e => setMacroTargetLang(e.target.value)} style={{ padding: '3px 7px', borderRadius: '5px', border: '1px solid #cbd5e1', fontSize: '11px' }}>
                        <option value="vi">🇻🇳 베트남어</option>
                        <option value="zh">🇨🇳 중국어</option>
                        <option value="en">🇺🇸 영어</option>
                        <option value="ko">🇰🇷 한국어</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ padding: '7px 12px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {MACROS.map(m => (
                      <button key={m.id} onClick={() => handleSendMacro(m.id)} title={m.t[macroTargetLang]} className="btn btn-sec" style={{ fontSize: '11px', padding: '4px 8px' }}>
                        {m.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '9px', backgroundColor: '#f8fafc' }}>
                    {selectedRoom.messages && selectedRoom.messages.map((m, idx) => (
                      <div key={idx} style={{ alignSelf: m.sender === 'system' ? 'center' : m.sender === 'staff' ? 'flex-end' : 'flex-start', maxWidth: m.sender === 'system' ? '90%' : '75%' }}>
                        {m.sender === 'system' ? (
                          <div style={{ fontSize: '11px', color: '#64748b', backgroundColor: '#e2e8f0', padding: '3px 10px', borderRadius: '10px' }}>{m.text}</div>
                        ) : (
                          <>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px', textAlign: m.sender === 'staff' ? 'right' : 'left' }}>
                              {m.sender === 'staff' ? `💼 ${m.staffName || '상담원'}` : `👤 ${selectedRoom.userName}`} · {m.time}
                            </div>
                            <div style={{
                              padding: '8px 12px', borderRadius: '11px',
                              backgroundColor: m.sender === 'staff' ? '#0284c7' : '#ffffff',
                              color: m.sender === 'staff' ? '#ffffff' : '#1e293b',
                              border: m.sender === 'staff' ? 'none' : '1px solid #e2e8f0',
                              fontSize: '13px', lineHeight: '1.4', whiteSpace: 'pre-wrap'
                            }}>
                              {m.text}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendReply} style={{ padding: '10px 14px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', backgroundColor: '#ffffff' }}>
                    <input type="text" placeholder="답변 입력..." value={staffReplyText} onChange={e => setStaffReplyText(e.target.value)} className="inp" />
                    <button type="submit" className="btn btn-pri" style={{ whiteSpace: 'nowrap' }}>전송</button>
                  </form>
                </div>
              ) : (
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>대화할 고객을 선택하세요.</div>
              )}
            </div>
          </div>
        )}

        {/* [탭 3] 직원 계정 관리 & 대화 모니터링 (총괄 관리자 전용) */}
        {activeTab === 'staff_mgmt' && authRole === 'admin' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>👥 직원 계정 관리 & 1:1 상담 모니터링</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>총괄 관리자 전용: 새 직원 등록, 각 직원의 실시간 대화 감청 및 고객 재배정이 가능합니다.</p>
              </div>
              <button onClick={() => { setEditingStaff({ id: `worker${staffList.length + 1}`, pw: '1234', name: '', dept: '' }); setShowStaffModal(true); }} className="btn btn-pri">
                ➕ 신규 직원 계정 등록
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              {staffList.map(st => {
                const assignedCnt = Object.values(chatRooms).filter(r => r.assignedStaffId === st.id).length;
                const isSel = monitorStaffId === st.id;
                return (
                  <div key={st.id} onClick={() => { setMonitorStaffId(st.id); setMonitorRoomId(null); }} className="card" style={{ border: isSel ? '2px solid #0284c7' : '1px solid #e2e8f0', cursor: 'pointer', backgroundColor: isSel ? '#f0f9ff' : '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ fontSize: '15px' }}>{st.name}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>ID: <code>{st.id}</code> | {st.dept}</div>
                      </div>
                      <span style={{ backgroundColor: assignedCnt > 0 ? '#e0f2fe' : '#f1f5f9', color: assignedCnt > 0 ? '#0369a1' : '#64748b', padding: '3px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                        💬 {assignedCnt}명 전담
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: isSel ? '#0284c7' : '#64748b', fontWeight: 'bold' }}>{isSel ? '👉 모니터링 중' : '클릭하여 대화 모니터링'}</span>
                      <button onClick={e => { e.stopPropagation(); handleDeleteStaff(st.id, st.name); }} style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>삭제</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {activeMonitoredStaff && (
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#0284c7' }}>
                    🔍 [{activeMonitoredStaff.name}] 전담 고객 실시간 대화 모니터링 & 재배정
                  </h3>
                  <span style={{ fontSize: '11px', backgroundColor: '#f0fdf4', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>실시간 감청 ON</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '14px', height: '460px' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
                    <div style={{ padding: '9px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px', backgroundColor: '#fff' }}>배정 고객 ({monitoredStaffRooms.length}명)</div>
                    {monitoredStaffRooms.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>배정된 고객이 없습니다.</div>
                    ) : (
                      monitoredStaffRooms.map(sid => {
                        const r = chatRooms[sid];
                        const isSel = monitorRoomId === sid;
                        return (
                          <div key={sid} onClick={() => { setMonitorRoomId(sid); setReassignTargetStaffId(''); }} style={{ padding: '9px 11px', borderBottom: '1px solid #e2e8f0', backgroundColor: isSel ? '#e0f2fe' : '#fff', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                              <strong style={{ fontSize: '12px' }}>{r.userName}</strong>
                              <span style={{ fontSize: '10px', color: '#94a3b8' }}>{r.lastTime}</span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{r.lastMessage || '대화 진행 중'}</div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {monitoredRoom ? (
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#fff' }}>
                      <div style={{ padding: '9px 13px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div><strong style={{ fontSize: '13px' }}>{monitoredRoom.userName}</strong> <span style={{ fontSize: '11px', color: '#64748b' }}>대화 내역</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>재배정:</span>
                          <select value={reassignTargetStaffId} onChange={e => setReassignTargetStaffId(e.target.value)} style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '11px' }}>
                            <option value="">직원 선택</option>
                            {staffList.filter(s => s.id !== activeMonitoredStaff.id).map(s => (
                              <option key={s.id} value={s.id}>{s.name} ({s.dept})</option>
                            ))}
                          </select>
                          <button onClick={() => { if (!reassignTargetStaffId) { alert('재배정할 직원을 선택하세요.'); return; } handleReassignCustomer(monitorRoomId, reassignTargetStaffId); setMonitorRoomId(null); }} className="btn btn-pri" style={{ padding: '3px 7px', fontSize: '11px' }}>
                            재배정
                          </button>
                        </div>
                      </div>

                      <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f8fafc' }}>
                        {monitoredRoom.messages && monitoredRoom.messages.map((m, idx) => (
                          <div key={idx} style={{ alignSelf: m.sender === 'staff' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px', textAlign: m.sender === 'staff' ? 'right' : 'left' }}>
                              {m.sender === 'staff' ? `💼 직원 (${m.staffName || activeMonitoredStaff.name})` : `👤 ${monitoredRoom.userName}`} · {m.time}
                            </div>
                            <div style={{
                              padding: '7px 11px', borderRadius: '10px',
                              backgroundColor: m.sender === 'staff' ? (m.staffName?.includes('총괄') ? '#7c3aed' : '#0284c7') : '#ffffff',
                              color: m.sender === 'staff' ? '#ffffff' : '#0f172a',
                              border: m.sender === 'staff' ? 'none' : '1px solid #e2e8f0',
                              fontSize: '12px', lineHeight: '1.4', whiteSpace: 'pre-wrap'
                            }}>
                              {m.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendAdminIntervention} style={{ padding: '8px 12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px', backgroundColor: '#fff' }}>
                        <input type="text" placeholder="👑 총괄관리자로서 직접 안내 메시지 전송..." value={adminInterventionText} onChange={e => setAdminInterventionText(e.target.value)} className="inp" style={{ fontSize: '12px', padding: '6px 9px' }} />
                        <button type="submit" className="btn" style={{ backgroundColor: '#7c3aed', color: '#fff', fontSize: '11px', padding: '6px 11px', whiteSpace: 'nowrap' }}>본사 개입 전송</button>
                      </form>
                    </div>
                  ) : (
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px' }}>
                      모니터링할 고객을 왼쪽에서 선택하세요.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* [탭 4] 요금제 / 상품 관리 */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>요금제 및 서비스 상품 관리</h2>
              {authRole === 'admin' && (
                <button onClick={() => { setEditingService({ id: null, category: 'SIM_MVNO', title: '', provider: '알뜰폰 KT망', price: '', unit: '/월', badge: '', icon: '📶', sub: '', desc: '', isEditing: false }); setShowServiceModal(true); }} className="btn btn-pri">
                  ➕ 새 상품 등록
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '6px', margin: '12px 0 16px 0' }}>
              {[{ id: 'all', label: '전체' }, { id: 'mvno', label: '📱 알뜰폰' }, { id: 'mno', label: '🏢 통신 3사' }, { id: 'internet', label: '🌐 인터넷' }, { id: 'rental', label: '💧 렌탈' }].map(f => (
                <button key={f.id} onClick={() => setServiceCategory(f.id)} className="btn" style={{ backgroundColor: serviceCategory === f.id ? '#f0f9ff' : '#fff', border: serviceCategory === f.id ? '2px solid #0284c7' : '1px solid #cbd5e1', color: serviceCategory === f.id ? '#0284c7' : '#475569' }}>
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px' }}>
              {services.filter(s => {
                if (serviceCategory === 'all') return true;
                if (serviceCategory === 'mvno') return s.category === 'SIM_MVNO';
                if (serviceCategory === 'mno') return s.category === 'SIM_MNO';
                if (serviceCategory === 'internet') return s.category === 'INTERNET';
                if (serviceCategory === 'rental') return s.category === 'RENTAL';
                return true;
              }).map(item => (
                <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', backgroundColor: item.category === 'SIM_MVNO' ? '#f0fdf4' : item.category === 'SIM_MNO' ? '#fef2f2' : '#e0f2fe', color: item.category === 'SIM_MVNO' ? '#166534' : item.category === 'SIM_MNO' ? '#991b1b' : '#0369a1' }}>
                      {item.category === 'SIM_MVNO' ? '알뜰폰' : item.category === 'SIM_MNO' ? '통신 3사' : item.category}
                    </span>
                    {item.badge && <span style={{ fontSize: '11px', backgroundColor: '#fee2e2', color: '#b91c1c', padding: '2px 5px', borderRadius: '4px', fontWeight: 'bold' }}>{item.badge}</span>}
                  </div>
                  <div style={{ fontSize: '20px' }}>{item.icon}</div>
                  <strong style={{ fontSize: '14px', marginTop: '3px' }}>{item.title}</strong>
                  <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 'bold', marginBottom: '5px' }}>{item.provider} | {item.sub}</div>
                  <div style={{ fontSize: '17px', fontWeight: '900', marginBottom: '6px' }}>₩ {item.price} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'normal' }}>{item.unit}</span></div>
                  <div style={{ flex: 1, fontSize: '11px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '6px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{item.desc}</div>
                  {authRole === 'admin' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '10px' }}>
                      <button onClick={() => { setEditingService({ ...item, isEditing: true }); setShowServiceModal(true); }} className="btn btn-sec" style={{ fontSize: '11px', padding: '5px' }}>수정</button>
                      <button onClick={() => handleDeleteService(item.id)} className="btn" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '11px', padding: '5px' }}>삭제</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [탭 5] 회원 CRM */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록 회원 명부 (CRM)</h2>
              <button onClick={loadData} className="btn btn-sec">🔄 새로고침</button>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th className="th">고유 코드</th>
                    <th className="th">아이디</th>
                    <th className="th">성함</th>
                    <th className="th">이메일</th>
                    <th className="th">가입 일자</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>등록된 회원이 없습니다.</td></tr>
                  ) : (
                    users.map(u => (
                      <tr key={u.userCode}>
                        <td className="td" style={{ fontFamily: 'monospace', color: '#64748b' }}>{u.userCode}</td>
                        <td className="td" style={{ fontWeight: 'bold', color: '#0284c7' }}>{u.username}</td>
                        <td className="td" style={{ fontWeight: 'bold' }}>{u.name}</td>
                        <td className="td">{u.email}</td>
                        <td className="td" style={{ color: '#94a3b8' }}>{u.createdAt}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* [탭 6] 프로모션 */}
        {activeTab === 'promotions' && (
          <div className="card" style={{ maxWidth: '520px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>📢 주요 프로모션 관리</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>한패스 프로모션 코드</label>
                <input type="text" value={promotions.hanpassCode} disabled={authRole !== 'admin'} onChange={e => setPromotions({ ...promotions, hanpassCode: e.target.value })} className="inp" style={{ marginTop: '3px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>한패스 혜택 요약 문구</label>
                <input type="text" value={promotions.hanpassBenefit} disabled={authRole !== 'admin'} onChange={e => setPromotions({ ...promotions, hanpassBenefit: e.target.value })} className="inp" style={{ marginTop: '3px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>인터넷 결합 공지 배너 문구</label>
                <textarea rows={3} value={promotions.internetNotice} disabled={authRole !== 'admin'} onChange={e => setPromotions({ ...promotions, internetNotice: e.target.value })} className="inp" style={{ marginTop: '3px' }} />
              </div>
              {authRole === 'admin' && (
                <button onClick={() => alert('설정이 저장되었습니다.')} className="btn btn-pri" style={{ marginTop: '5px' }}>설정 저장</button>
              )}
            </div>
          </div>
        )}

        {/* [탭 7] 매장 관리 */}
        {activeTab === 'stores' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>등록된 픽업 매장</h2>
              {authRole === 'admin' && (
                <button onClick={() => { setEditingStore({ id: `store_${Date.now()}`, name: '', address: '', isEditing: false }); setShowStoreModal(true); }} className="btn" style={{ backgroundColor: '#059669', color: '#fff' }}>➕ 새 대리점 등록</button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px' }}>
              {stores.map(s => (
                <div key={s.id} className="card">
                  <strong style={{ fontSize: '15px', color: '#0284c7' }}>{s.name}</strong>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>📍 {s.address}</div>
                  {authRole === 'admin' && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                      <button onClick={() => { setEditingStore({ ...s, isEditing: true }); setShowStoreModal(true); }} className="btn btn-sec" style={{ flex: 1, padding: '5px' }}>수정</button>
                      <button onClick={() => handleDeleteStore(s.id)} className="btn" style={{ flex: 1, padding: '5px', backgroundColor: '#fee2e2', color: '#b91c1c' }}>삭제</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* [모달 1] 신규 직원 등록 */}
      {showStaffModal && (
        <div className="modal">
          <div className="modal-box">
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>👥 신규 상담 직원 등록</h3>
            <form onSubmit={handleSaveNewStaff} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <div><label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>아이디 (ID)</label><input type="text" placeholder="예: worker4" value={editingStaff.id} onChange={e => setEditingStaff({ ...editingStaff, id: e.target.value })} className="inp" required /></div>
              <div><label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>비밀번호 (기본: 1234)</label><input type="password" value={editingStaff.pw} onChange={e => setEditingStaff({ ...editingStaff, pw: e.target.value })} className="inp" required /></div>
              <div><label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>직원 성함 / 직급</label><input type="text" placeholder="예: 최지원 대리" value={editingStaff.name} onChange={e => setEditingStaff({ ...editingStaff, name: e.target.value })} className="inp" required /></div>
              <div><label style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>부서 / 전담 언어</label><input type="text" placeholder="예: 상담 4팀 (베트남 전담)" value={editingStaff.dept} onChange={e => setEditingStaff({ ...editingStaff, dept: e.target.value })} className="inp" /></div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowStaffModal(false)} className="btn btn-sec" style={{ flex: 1 }}>취소</button>
                <button type="submit" className="btn btn-pri" style={{ flex: 1 }}>등록 완료</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* [모달 2] 서비스 상품 등록/수정 */}
      {showServiceModal && editingService && (
        <div className="modal">
          <div className="modal-box">
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>{editingService.isEditing ? '서비스 수정' : '새 서비스 등록'}</h3>
            <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold' }}>카테고리</label>
                <select value={editingService.category} onChange={e => setEditingService({ ...editingService, category: e.target.value })} className="inp">
                  <option value="SIM_MVNO">📱 알뜰폰 (MVNO)</option>
                  <option value="SIM_MNO">🏢 통신 3사 (MNO)</option>
                  <option value="INTERNET">🌐 인터넷+TV</option>
                  <option value="RENTAL">💧 정수기/가전 렌탈</option>
                </select>
              </div>
              <input type="text" placeholder="상품명" value={editingService.title} onChange={e => setEditingService({ ...editingService, title: e.target.value })} className="inp" required />
              <input type="text" placeholder="제공사 / 통신망" value={editingService.provider} onChange={e => setEditingService({ ...editingService, provider: e.target.value })} className="inp" required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="가격" value={editingService.price} onChange={e => setEditingService({ ...editingService, price: e.target.value })} className="inp" required />
                <input type="text" placeholder="단위 (예: /월)" value={editingService.unit} onChange={e => setEditingService({ ...editingService, unit: e.target.value })} className="inp" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="뱃지" value={editingService.badge} onChange={e => setEditingService({ ...editingService, badge: e.target.value })} className="inp" />
                <input type="text" placeholder="아이콘" value={editingService.icon} onChange={e => setEditingService({ ...editingService, icon: e.target.value })} className="inp" />
              </div>
              <input type="text" placeholder="요약 설명" value={editingService.sub} onChange={e => setEditingService({ ...editingService, sub: e.target.value })} className="inp" />
              <textarea rows={3} placeholder="상세 설명" value={editingService.desc} onChange={e => setEditingService({ ...editingService, desc: e.target.value })} className="inp" />
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowServiceModal(false)} className="btn btn-sec" style={{ flex: 1 }}>취소</button>
                <button type="submit" className="btn btn-pri" style={{ flex: 1 }}>저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* [모달 3] 매장 등록/수정 */}
      {showStoreModal && editingStore && (
        <div className="modal">
          <div className="modal-box" style={{ maxWidth: '380px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>{editingStore.isEditing ? '매장 수정' : '새 매장 등록'}</h3>
            <form onSubmit={handleSaveStore} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <input type="text" placeholder="매장명" value={editingStore.name} onChange={e => setEditingStore({ ...editingStore, name: e.target.value })} className="inp" required />
              <input type="text" placeholder="주소" value={editingStore.address} onChange={e => setEditingStore({ ...editingStore, address: e.target.value })} className="inp" required />
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowStoreModal(false)} className="btn btn-sec" style={{ flex: 1 }}>취소</button>
                <button type="submit" className="btn btn-pri" style={{ flex: 1 }}>저장</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
