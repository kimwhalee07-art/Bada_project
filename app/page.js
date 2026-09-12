'use client';
import React, { useState, useEffect } from 'react';

// 다국어 사전 (ko, en, zh, vi)
const translations = {
  ko: {
    nav: { plans: '유심 요금제', internet: '인터넷·TV', rental: '가전·렌탈', hanpass: '해외송금', stores: '수령매장', faq: 'FAQ', login: '로그인', apply: '신청하기', logout: '로그아웃' },
    hero: { badge: '⚡ 외국인을 위한 한국 생활 원스톱 통신 & 금융', t1: '선불유심부터', t2: '초고속 인터넷 & 해외송금', t3: '까지', desc: '여권/외국인등록증 5분 개통 알뜰폰·통신사 유심, 백메가 제휴 최대 현금 사은품 인터넷 설치, 한패스 우대 송금을 바다에서 한 번에 누리세요.', bP: '유심 요금제 보기 ↓', bI: '인터넷 사은품 확인 🎁', bC: '1:1 직원 상담 💬' },
    pSec: { title: 'BADA 안심 유심 요금제', sub: '알뜰폰(MVNO) 가성비 플랜부터 통신 3사(MNO) 정규 요금제까지 한눈에 비교', all: '전체', mvno: '📱 알뜰폰 (MVNO)', mno: '🏢 통신 3사 (MNO)', apply: '가입 신청' },
    iSec: { tag: '🤝 백메가 공식 제휴', title: '원룸·기숙사·가정용 초고속 인터넷 + TV', sub: '외국인 명의도 내국인과 동일하게 법정 최대 현금 사은품을 당일 지원합니다.', btn: '🎁 인터넷 사은품 상담 신청' },
    rSec: { tag: '💧 맞춤 생활 렌탈', title: '정수기 · 비데 · 공기청정기 간편 렌탈', sub: '외국인등록증(ARC) 간편 심사로 당일 접수를 지원합니다.', btn: '렌탈 무료 상담 신청' },
    hSec: { badge: '💸 해외송금 파트너', t1: '한패스(HANPASS) 해외송금', t2: '수수료 0원 혜택', desc: '은행 방문 없이 200여 개국 5분 송금! 중국, 베트남, 필리핀 등 실시간 송금 지원.', code: 'BADA 전용 할인 코드', app: '한패스 앱 설치하고 송금하기 ↗' },
    dSec: { title: '수령 방식 및 픽업 매장', sub: '방문 픽업, 전국 무료 택배 또는 eSIM 즉시 발급 중 선택하세요.' },
    faqSec: { title: '자주 묻는 질문' },
    faqs: [
      { q: "알뜰폰(MVNO)과 통신 3사(MNO)는 어떤 차이가 있나요?", a: "알뜰폰은 KT, SKT, LGU+의 동일한 통신망을 사용하여 통화 품질과 데이터 속도가 100% 동일하면서 요금은 30~50% 저렴하고 약정이 없습니다. 통신 3사는 기기 할부 구매나 멤버십 VIP 혜택에 유리합니다." },
      { q: "여권만으로도 개통이 가능한가요?", a: "네! 여권만으로 당일 5분 즉시 개통 가능한 선불 요금제를 다양하게 지원하며, 외국인등록증 발급 시 본인 명의로 손쉽게 전환할 수 있습니다." },
      { q: "인터넷 설치 시 외국인도 현금 사은품을 받나요?", a: "네! 내국인과 100% 동일하게 통신사별 법정 최대 사은품을 설치 당일 현금으로 입금해 드립니다." },
      { q: "한패스 송금 수수료 할인은 어떻게 받나요?", a: "프로모션 코드 BADA2026을 입력하고 가입하시면 첫 송금 수수료 무료 쿠폰이 즉시 발급됩니다." }
    ],
    bot: { title: 'BADA 1:1 고객센터', sub: '실시간 FAQ & 직원 대화 연결', welcome: '안녕하세요! 바다 상담 센터입니다.\n문의 항목을 선택하시거나 직원과 1:1 실시간 대화를 시작하세요.', staff: '💬 전담 직원과 1:1 실시간 대화하기', back: '↩ 이전 질문 목록으로', send: '전송', ph: '메시지를 입력하세요...' }
  },
  en: {
    nav: { plans: 'SIM Plans', internet: 'Internet·TV', rental: 'Rental', hanpass: 'Remittance', stores: 'Stores', faq: 'FAQ', login: 'Login', apply: 'Apply Now', logout: 'Logout' },
    hero: { badge: '⚡ One-stop Telecom & Finance for Foreigners in Korea', t1: 'From Prepaid SIM to', t2: 'High-speed Internet & Remittance', t3: '', desc: 'Activate Budget Phone (MVNO) or Major Carrier SIM in 5 mins with Passport/ARC, receive maximum cash gifts for internet, and get remittance discounts.', bP: 'View SIM Plans ↓', bI: 'Internet Cash Gift 🎁', bC: '1:1 Live Support 💬' },
    pSec: { title: 'BADA Safe SIM Plans', sub: 'Compare Budget Phone (MVNO) vs Major Carriers (MNO)', all: 'All Plans', mvno: '📱 Budget Phone (MVNO)', mno: '🏢 Major Carriers (MNO)', apply: 'Apply Now' },
    iSec: { tag: '🤝 Official Partner', title: 'High-speed Internet & TV for Studio & Dorm', sub: 'Foreign residents receive maximum legal cash gifts upon installation.', btn: '🎁 Free Internet Consultation' },
    rSec: { tag: '💧 Appliance Rental', title: 'Water Purifier & Air Cleaner Rental', sub: 'Simple registration with ARC without complicated paperwork.', btn: 'Consult Rental' },
    hSec: { badge: '💸 Remittance Partner', t1: 'HANPASS Remittance', t2: 'Zero Fee Offer', desc: 'Send money to 200+ countries in 5 minutes via smartphone.', code: 'BADA Promo Code', app: 'Download Hanpass App ↗' },
    dSec: { title: 'Pickup & Delivery Methods', sub: 'Choose store pickup, nationwide free delivery, or instant eSIM.' },
    faqSec: { title: 'Frequently Asked Questions' },
    faqs: [
      { q: "Difference between Budget Phone and Major Carriers?", a: "Budget phones use the exact same KT/SKT/LG networks with 100% same quality, 30-50% lower prices, and no contract locks." },
      { q: "Can I activate with just a passport?", a: "Yes! BADA provides instant 5-minute activation for prepaid MVNO plans with just your passport." },
      { q: "Can foreigners receive internet cash gifts?", a: "Yes, 100% equally! Max legal cash gifts deposited on installation day." },
      { q: "How do I get remittance discount?", a: "Enter promo code BADA2026 to get a zero-fee coupon on your first transfer." }
    ],
    bot: { title: 'BADA 1:1 Support', sub: 'Instant FAQ & Live Staff Chat', welcome: 'Hello! Choose a topic below or chat directly with our staff.', staff: '💬 Chat 1:1 with Staff Member', back: '↩ Back to Menu', send: 'Send', ph: 'Type your message...' }
  },
  zh: {
    nav: { plans: '电话卡套餐', internet: '宽带·电视', rental: '家电租赁', hanpass: '跨境汇款', stores: '自提门店', faq: '常见问题', login: '登录', apply: '立即申请', logout: '退出登录' },
    hero: { badge: '⚡ 专为在韩外国人打造的一站式通信与金融服务', t1: '从预付费电话卡到', t2: '高速宽带与海外汇款', t3: '全搞定', desc: '支持护照/登录证5分钟办理廉价卡(MVNO)与三大运营商SIM卡，宽带享最高现金补贴，汉游(HANPASS)专享汇款优惠。', bP: '查看电话卡套餐 ↓', bI: '查看宽带补贴 🎁', bC: '人工1:1在线咨询 💬' },
    pSec: { title: 'BADA 放心电话卡套餐', sub: '高性价比无合约廉价手机卡(MVNO)与三大电信正规套餐一站式对比', all: '全部套餐', mvno: '📱 廉价手机卡 (MVNO)', mno: '🏢 三大电信 (MNO)', apply: '立即申请' },
    iSec: { tag: '🤝 官方合作正规渠道', title: '单间/宿舍/家庭 高速宽带 + 电视', sub: '外国人名义同享最高法定现金补贴，开通当天直接转账。', btn: '🎁 免费宽带报价与咨询' },
    rSec: { tag: '💧 在韩生活家电租赁', title: '净水器 · 空气净化器 轻松租赁', sub: '持有外国人登录证(ARC)即可快速审核办理。', btn: '家电租赁咨询' },
    hSec: { badge: '💸 跨境汇款平台', t1: '汉游 (HANPASS) 海外汇款', t2: '0手续费专享优惠', desc: '手机随时随地汇款至全球200多个国家！微信/支付宝秒到账。', code: 'BADA 专属邀请码', app: '下载Hanpass并汇款 ↗' },
    dSec: { title: '领取方式及门店地址', sub: '支持门店自提、全韩免费快递或eSIM线上秒发。' },
    faqSec: { title: '常见问题解答' },
    faqs: [
      { q: "廉价卡(MVNO)与三大电信有什么区别？", a: "廉价卡使用完全相同的基站网络，信号与速度100%相同，但费用便宜30~50%且无合约限制。" },
      { q: "仅凭护照可以开通吗？", a: "可以！BADA提供仅需护照即可当天5分钟开通的预付费套餐。" },
      { q: "外国人装宽带也能领现金补贴吗？", a: "完全可以，金额全额一致！安装当天直接转账。" },
      { q: "如何享受Hanpass汇款优惠？", a: "输入优惠码BADA2026，首笔汇款免手续费。" }
    ],
    bot: { title: 'BADA 1:1 客户服务中心', sub: '快速问答与人工直连', welcome: '您好！请选择常见咨询，或直接与工作人员进行1:1交流。', staff: '💬 与工作人员1:1实时聊天', back: '↩ 返回问题列表', send: '发送', ph: '输入您的问题...' }
  },
  vi: {
    nav: { plans: 'Gói Cước SIM', internet: 'Internet·TV', rental: 'Thuê Thiết Bị', hanpass: 'Chuyển Tiền', stores: 'Cửa Hàng', faq: 'FAQ', login: 'Đăng Nhập', apply: 'Đăng Ký', logout: 'Đăng Xuất' },
    hero: { badge: '⚡ Dịch vụ Viễn thông & Tài chính Trọn gói tại Hàn Quốc', t1: 'Từ SIM Trả Trước đến', t2: 'Internet & Chuyển Tiền', t3: '', desc: 'Kích hoạt SIM giá rẻ (MVNO) hoặc 3 nhà mạng lớn trong 5 phút bằng Hộ chiếu/ARC, nhận tiền mặt quà tặng Internet tối đa.', bP: 'Xem Gói Cước ↓', bI: 'Quà Tặng Internet 🎁', bC: 'Tư Vấn 1:1 💬' },
    pSec: { title: 'Gói Cước SIM BADA An Tâm', sub: 'So sánh SIM giá rẻ (MVNO) không hợp đồng và 3 nhà mạng lớn (MNO)', all: 'Tất Cả', mvno: '📱 SIM Giá Rẻ (MVNO)', mno: '🏢 3 Nhà Mạng (MNO)', apply: 'Đăng Ký' },
    iSec: { tag: '🤝 Đối Tác Chính Thức', title: 'Internet Cáp Quang Tốc Độ Cao & TV', sub: 'Người nước ngoài nhận 100% quà tặng tiền mặt tối đa như người Hàn.', btn: '🎁 Tư Vấn Lắp Đặt Miễn Phí' },
    rSec: { tag: '💧 Thuê Thiết Bị', title: 'Máy Lọc Nước · Máy Lọc Không Khí', sub: 'Đăng ký nhanh chóng chỉ với Thẻ Cư Trú (ARC).', btn: 'Tư Vấn Thuê' },
    hSec: { badge: '💸 Chuyển Tiền Quốc Tế', t1: 'Chuyển Tiền HANPASS', t2: 'Ưu Đãi Phí 0 Won', desc: 'Chuyển tiền về Việt Nam 24/7 chỉ trong 5 phút qua ứng dụng.', code: 'Mã Giảm Giá BADA', app: 'Tải Ứng Dụng Hanpass ↗' },
    dSec: { title: 'Phương Thức Nhận & Cửa Hàng', sub: 'Nhận tại cửa hàng, chuyển phát miễn phí hoặc eSIM tức thì.' },
    faqSec: { title: 'Câu Hỏi Thường Gặp' },
    faqs: [
      { q: "SIM MVNO và 3 nhà mạng lớn khác nhau thế nào?", a: "SIM MVNO dùng chung sóng của KT/SK/LG tốc độ giống 100%, giá rẻ hơn 30-50% và không có hợp đồng." },
      { q: "Có thể kích hoạt chỉ bằng hộ chiếu không?", a: "Có! BADA hỗ trợ đăng ký SIM trả trước 5 phút nhận ngay chỉ với hộ chiếu." },
      { q: "Lắp internet có nhận tiền mặt không?", a: "Có, nhận 100% tiền mặt quà tặng ngay trong ngày lắp đặt!" },
      { q: "Cách nhận ưu đãi phí chuyển tiền?", a: "Nhập mã khuyến mãi BADA2026 khi đăng ký để nhận phiếu miễn phí lần đầu." }
    ],
    bot: { title: 'Trung Tâm Hỗ Trợ BADA', sub: 'Giải Đáp Nhanh & Trực Tiếp', welcome: 'Xin chào! Hãy chọn chủ đề hoặc trò chuyện trực tiếp với nhân viên.', staff: '💬 Trò chuyện 1:1 với nhân viên', back: '↩ Quay lại câu hỏi', send: 'Gửi', ph: 'Nhập câu hỏi...' }
  }
};

export default function BadaPage() {
  const [lang, setLang] = useState('ko');
  const t = translations[lang] || translations.ko;

  // 인증 / 세션 상태
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenuModal, setShowUserMenuModal] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [regForm, setRegForm] = useState({ username: '', password: '', name: '', email: '' });
  const [registeredUsers, setRegisteredUsers] = useState([
    { userCode: '0000_0000_0001', username: 'mimimimi', name: '외국인 고객', email: 'test@badahub.co.kr', password: '123' }
  ]);

  // 모달 및 필터 상태
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showInternetModal, setShowInternetModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [planFilter, setPlanFilter] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // 채팅 위젯 상태
  const [showChat, setShowChat] = useState(false);
  const [chatMode, setChatMode] = useState('menu');
  const [activeFaq, setActiveFaq] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [sessionId, setSessionId] = useState('');

  // 요금제 기본 데이터 (알뜰폰 3개 + 통신 3사 3개)
  const [simPlans] = useState([
    { id: 1, telecomCategory: 'mvno', carrier: 'KT망 알뜰폰', name: '데이터 무제한 30일 (알뜰폰)', price: '36,300', data: '11GB + 일 2GB + 3Mbps', call: '기본제공 (무제한)', sms: '기본제공', tag: '외국인 1위', isPopular: true },
    { id: 2, telecomCategory: 'mvno', carrier: 'LG U+망 알뜰폰', name: '초저가 실속 7GB (알뜰폰)', price: '17,900', data: '7GB + 1Mbps 무제한', call: '기본제공', sms: '기본제공', tag: '가성비 추천', isPopular: false },
    { id: 3, telecomCategory: 'mvno', carrier: 'SKT망 알뜰폰', name: '단기 선불 15GB (알뜰폰)', price: '25,000', data: '15GB (소진 시 정지)', call: '100분', sms: '100건', tag: '여권 즉시개통', isPopular: false },
    { id: 4, telecomCategory: 'mno', carrier: 'KT', name: 'KT 5G 슬림 베이직 (통신 3사)', price: '55,000', data: '21GB + 1Mbps 속도제어', call: '무제한', sms: '무제한', tag: 'KT 공식 회선', isPopular: false },
    { id: 5, telecomCategory: 'mno', carrier: 'SKT', name: 'SKT 5GX 레귤러 (통신 3사)', price: '69,000', data: '110GB + 5Mbps 무제한', call: '무제한', sms: '무제한', tag: 'PASS 본인인증', isPopular: true },
    { id: 6, telecomCategory: 'mno', carrier: 'LG U+', name: 'LG U+ 5G 프리미어 (통신 3사)', price: '75,000', data: '완전 무제한', call: '무제한', sms: '무제한', tag: '외국인 프리미엄', isPopular: false }
  ]);

  // 신청 폼 상태
  const [applyForm, setApplyForm] = useState({
    telecomCategory: 'mvno', carrier: 'KT망 알뜰폰', subType: 'new',
    plan: '데이터 무제한 30일 (알뜰폰)', name: '', email: '', phone: '', deliveryMethod: 'store'
  });

  const [internetForm, setInternetForm] = useState({ name: '', phone: '', carrier: 'KT', address: '' });

  // 세션 및 크로스 탭 동기화
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('bada_user_db');
      if (savedUsers) setRegisteredUsers(JSON.parse(savedUsers));
      const sess = localStorage.getItem('bada_current_login');
      if (sess) {
        const u = JSON.parse(sess);
        setCurrentUser(u);
        setApplyForm(prev => ({ ...prev, name: u.name || u.username, email: u.email }));
      }
    } catch (e) { console.error(e); }

    let sid = localStorage.getItem('bada_chat_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('bada_chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'bada_live_chat_rooms' && sessionId) {
        try {
          const rooms = JSON.parse(e.newValue || '{}');
          if (rooms[sessionId]?.messages) setChatMessages(rooms[sessionId].messages);
        } catch (err) { console.error(err); }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [sessionId]);

  const triggerAutoEmail = async (toEmail, subject, htmlContent, type) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: toEmail, subject, html: htmlContent, type })
      });
    } catch (e) { console.warn('Email trigger failed', e); }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanId = loginForm.username.trim().toLowerCase();
    const found = registeredUsers.find(u => u.username.toLowerCase() === cleanId && (!u.password || u.password === loginForm.password));
    if (!found) return alert('아이디 또는 비밀번호가 올바르지 않습니다.');

    const sessionUser = { userCode: found.userCode, username: found.username, name: found.name, email: found.email };
    setCurrentUser(sessionUser);
    localStorage.setItem('bada_current_login', JSON.stringify(sessionUser));
    setApplyForm(prev => ({ ...prev, name: sessionUser.name, email: sessionUser.email }));
    setShowLoginModal(false);
    alert(`반갑습니다, ${sessionUser.username}님!`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const cleanId = regForm.username.trim();
    if (cleanId.length < 3) return alert('아이디는 3글자 이상이어야 합니다.');
    if (registeredUsers.some(u => u.username.toLowerCase() === cleanId.toLowerCase())) return alert('이미 존재하는 아이디입니다.');

    const newUser = {
      userCode: `0000_0000_${String(registeredUsers.length + 1).padStart(4, '0')}`,
      username: cleanId, password: regForm.password, name: regForm.name || cleanId, email: regForm.email || ''
    };
    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem('bada_user_db', JSON.stringify(updated));

    setCurrentUser(newUser);
    localStorage.setItem('bada_current_login', JSON.stringify(newUser));
    setApplyForm(prev => ({ ...prev, name: newUser.name, email: newUser.email }));
    setShowLoginModal(false);
    alert(`회원가입이 완료되었습니다! 반갑습니다, ${newUser.username}님.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowUserMenuModal(false);
    localStorage.removeItem('bada_current_login');
    alert('로그아웃되었습니다.');
  };

  const handleDeleteAccount = () => {
    if (!currentUser) return;
    if (confirm('정말로 회원 탈퇴를 진행하시겠습니까?\n계정 및 모든 이용 데이터가 영구히 삭제됩니다.')) {
      const updated = registeredUsers.filter(u => u.username !== currentUser.username);
      setRegisteredUsers(updated);
      localStorage.setItem('bada_user_db', JSON.stringify(updated));
      handleLogout();
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone) return alert('성함과 연락처를 입력해 주세요.');

    const newOrder = {
      id: Date.now(),
      type: 'SIM',
      telecomCategory: applyForm.telecomCategory === 'mvno' ? 'MVNO' : 'MNO',
      carrier: applyForm.carrier,
      subType: applyForm.subType === 'new' ? '신규가입' : '번호이동',
      name: applyForm.name,
      phone: applyForm.phone,
      email: applyForm.email || '-',
      detail: `[${applyForm.telecomCategory === 'mvno' ? '알뜰폰' : '통신 3사'} · ${applyForm.carrier}] ${applyForm.plan} (${applyForm.deliveryMethod === 'store' ? '매장 픽업' : applyForm.deliveryMethod === 'delivery' ? '택배 배송' : 'eSIM 발급'})`,
      time: '방금 전'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bada_live_orders') || '[]');
      localStorage.setItem('bada_live_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) { console.error(err); }

    if (applyForm.email) {
      triggerAutoEmail(
        applyForm.email,
        `[BADA] ${applyForm.name}님의 유심 신청이 정상 접수되었습니다.`,
        `<div style="font-family: sans-serif; padding: 20px;"><h2>BADA 유심 접수 확인서</h2><p>${applyForm.name} 고객님, [${newOrder.detail}] 신청이 정상 접수되었습니다.</p><p>매장 방문 시 여권 또는 외국인등록증을 지참해 주세요.</p></div>`,
        'sim_order'
      );
    }

    alert('신청이 성공적으로 접수되었습니다! 담당 직원이 확인 후 안내드립니다.');
    setShowApplyModal(false);
  };

  const handleInternetSubmit = (e) => {
    e.preventDefault();
    if (!internetForm.name || !internetForm.phone) return alert('성함과 연락처를 입력해 주세요.');

    const newOrder = {
      id: Date.now(),
      type: 'INTERNET',
      telecomCategory: internetForm.carrier === '알뜰인터넷' ? 'MVNO' : 'MNO',
      carrier: internetForm.carrier,
      subType: '인터넷+TV 신규설치',
      name: internetForm.name,
      phone: internetForm.phone,
      email: currentUser?.email || '-',
      detail: `${internetForm.carrier} 인터넷 상담 신청 (주소: ${internetForm.address || '미입력'})`,
      time: '방금 전'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bada_live_orders') || '[]');
      localStorage.setItem('bada_live_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) { console.error(err); }

    alert('상담 신청이 접수되었습니다! 최대 현금 사은품 혜택과 함께 직원이 연락드립니다.');
    setShowInternetModal(false);
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !sessionId) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'customer', text: chatInput.trim(), time: timeStr };
    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);

    try {
      const all = JSON.parse(localStorage.getItem('bada_live_chat_rooms') || '{}');
      all[sessionId] = {
        sessionId,
        userName: currentUser ? `${currentUser.username} (${currentUser.name})` : `외국인 고객 (${sessionId.slice(-4)})`,
        userCode: currentUser ? currentUser.userCode : '비회원',
        lang,
        lastMessage: chatInput.trim(),
        lastTime: timeStr,
        unreadCount: (all[sessionId]?.unreadCount || 0) + 1,
        messages: updated
      };
      localStorage.setItem('bada_live_chat_rooms', JSON.stringify(all));
    } catch (err) { console.error(err); }

    setChatInput('');
  };

  const copyPartnerCode = () => {
    navigator.clipboard.writeText('BADA2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const displayedPlans = simPlans.filter(p => planFilter === 'all' || p.telecomCategory === planFilter);
  const modalPlans = simPlans.filter(p => p.telecomCategory === applyForm.telecomCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* 글로벌 CSS 스타일 */}
      <style>{`
        .bada-sec { max-width: 1140px; margin: 0 auto; padding: 50px 20px; }
        .bada-h2 { font-size: 26px; font-weight: 800; margin: 0 0 8px 0; text-align: center; }
        .bada-sub { font-size: 14px; color: #64748b; margin: 0 0 28px 0; text-align: center; }
        .bada-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
        .btn-pri { background: #0284c7; color: #ffffff; border: none; border-radius: 8px; padding: 10px 18px; font-weight: bold; font-size: 13px; cursor: pointer; white-space: nowrap; text-decoration: none; display: inline-block; }
        .btn-sec { background: #f1f5f9; color: #334155; border: none; border-radius: 8px; padding: 10px 16px; font-weight: bold; font-size: 13px; cursor: pointer; white-space: nowrap; text-decoration: none; display: inline-block; }
        .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal-box { background: #ffffff; border-radius: 16px; width: 100%; max-width: 440px; max-height: 90vh; overflow-y: auto; padding: 22px; box-sizing: border-box; }
        .bada-inp { width: 100%; margin-top: 5px; padding: 9px 12px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 13px; box-sizing: border-box; outline: none; }
        .bada-lbl { font-size: 12px; font-weight: bold; color: #334155; }
      `}</style>

      {/* 1. 상단 네비게이션 헤더 (어떤 해상도에서도 무조건 1줄 완벽 고정) */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', width: '100%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'nowrap' }}>
          
          {/* 로고 */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: '18px' }}>B</div>
            <span style={{ fontSize: '19px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>BADA</span>
          </div>

          {/* 중앙 메뉴 (1줄 고정 & 줄바꿈 금지) */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.4vw, 20px)', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <a href="#plans" style={{ textDecoration: 'none', color: '#334155', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.nav.plans}</a>
            <a href="#internet" style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 'bold', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.nav.internet}</a>
            <a href="#rental" style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 'bold', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.nav.rental}</a>
            <a href="#hanpass" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.nav.hanpass}</a>
            <a href="#delivery" style={{ textDecoration: 'none', color: '#334155', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.nav.stores}</a>
            <a href="#faq" style={{ textDecoration: 'none', color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.nav.faq}</a>
          </nav>

          {/* 우측 컨트롤 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, whiteSpace: 'nowrap' }}>
            {/* 언어 드롭다운 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 6px', backgroundColor: '#f8fafc', flexShrink: 0 }}>
              <span style={{ fontSize: '12px' }}>🌐</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 'bold', color: '#334155', outline: 'none', cursor: 'pointer' }}>
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>

            {/* 로그인 / 사용자 계정 */}
            {!currentUser ? (
              <button onClick={() => { setShowLoginModal(true); setAuthTab('login'); }} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <span>👤</span> {t.nav.login}
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <button onClick={() => setShowUserMenuModal(true)} style={{ background: '#e0f2fe', border: '1px solid #bae6fd', padding: '5px 10px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', color: '#0369a1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  <span>👤</span> {currentUser.username} 님 ▾
                </button>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', fontSize: '11px', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline', padding: '2px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {t.nav.logout}
                </button>
              </div>
            )}

            {/* 신청하기 버튼 */}
            <button onClick={() => setShowApplyModal(true)} className="btn-pri">
              {t.nav.apply}
            </button>
          </div>
        </div>
      </header>

      {/* 2. 히어로 섹션 */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '60px 20px 70px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '30px', padding: '6px 14px', fontSize: '13px', color: '#7dd3fc', marginBottom: '20px' }}>
            {t.hero.badge}
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.3', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            {t.hero.t1} <span style={{ color: '#38bdf8' }}>{t.hero.t2}</span> {t.hero.t3}
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', margin: '0 auto 28px auto', maxWidth: '640px' }}>
            {t.hero.desc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <a href="#plans" className="btn-pri">{t.hero.bP}</a>
            <a href="#internet" className="btn-pri" style={{ backgroundColor: 'rgba(2,132,199,0.2)', border: '1px solid #38bdf8', color: '#38bdf8' }}>{t.hero.bI}</a>
            <button onClick={() => { setShowChat(true); setChatMode('staff_chat'); }} className="btn-sec" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff' }}>{t.hero.bC}</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', textAlign: 'left' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>⚡</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>5분 유심 개통</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>알뜰폰 & 통신 3사 / PASS 인증</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>🎁</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>인터넷 최대 사은품</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>백메가 / 위드컴퍼니 제휴</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '18px', marginBottom: '6px' }}>💸</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#f8fafc' }}>한패스 해외송금</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>수수료 우대 & 5분 내 송금</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 유심 요금제 섹션 */}
      <section id="plans" className="bada-sec">
        <h2 className="bada-h2">{t.pSec.title}</h2>
        <p className="bada-sub">{t.pSec.sub}</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '10px', gap: '4px' }}>
            {[
              { id: 'all', label: t.pSec.all },
              { id: 'mvno', label: t.pSec.mvno },
              { id: 'mno', label: t.pSec.mno }
            ].map(f => (
              <button key={f.id} onClick={() => setPlanFilter(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: planFilter === f.id ? '#ffffff' : 'transparent', color: planFilter === f.id ? '#0284c7' : '#64748b' }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {displayedPlans.map(plan => (
            <div key={plan.id} className="bada-card" style={{ border: plan.isPopular ? '2px solid #0284c7' : '1px solid #e2e8f0', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {plan.tag && (
                <div style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: plan.telecomCategory === 'mvno' ? '#eff6ff' : '#f0fdf4', color: plan.telecomCategory === 'mvno' ? '#1d4ed8' : '#15803d', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px' }}>
                  {plan.tag}
                </div>
              )}
              <div>
                <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold', marginBottom: '4px' }}>{plan.carrier}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>{plan.name}</h3>
                <div style={{ fontSize: '22px', fontWeight: '900', marginBottom: '12px' }}>
                  ₩{plan.price}<span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}> /월</span>
                </div>
                <div style={{ fontSize: '13px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div>📊 데이터: <strong>{plan.data}</strong></div>
                  <div>📞 음성통화: <strong>{plan.call}</strong></div>
                  <div>💬 문자: <strong>{plan.sms}</strong></div>
                </div>
              </div>
              <button onClick={() => { setApplyForm(prev => ({ ...prev, telecomCategory: plan.telecomCategory, carrier: plan.carrier, plan: plan.name })); setShowApplyModal(true); }} className="btn-pri" style={{ marginTop: '18px', width: '100%', textAlign: 'center' }}>
                {t.pSec.apply}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 초고속 인터넷 & TV 섹션 */}
      <section id="internet" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#eff6ff', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
            {t.iSec.tag}
          </div>
          <h2 className="bada-h2">{t.iSec.title}</h2>
          <p className="bada-sub">{t.iSec.sub}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px', marginBottom: '25px' }}>
            {['KT 인터넷+TV (최대 47만원)', 'SK 브로드밴드 (최대 47만원)', 'LG U+ 인터넷 (최대 47만원)', '알뜰인터넷 결합 (최대 35만원)'].map((it, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontWeight: 'bold', fontSize: '13px' }}>
                🎁 {it}
              </div>
            ))}
          </div>
          <button onClick={() => setShowInternetModal(true)} className="btn-pri">
            {t.iSec.btn}
          </button>
        </div>
      </section>

      {/* 5. 생활 가전 / 정수기 렌탈 섹션 */}
      <section id="rental" className="bada-sec" style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>
          {t.rSec.tag}
        </div>
        <h2 className="bada-h2">{t.rSec.title}</h2>
        <p className="bada-sub">{t.rSec.sub}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '25px' }}>
          {[
            { name: '쿠쿠 슬림 냉온정수기', price: '19,900원/월', icon: '💧' },
            { name: '쿠쿠 클린 비데', price: '13,900원/월', icon: '🚽' },
            { name: 'LG 퓨리케어 공기청정기', price: '24,900원/월', icon: '🍃' }
          ].map((r, i) => (
            <div key={i} className="bada-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '30px', marginBottom: '6px' }}>{r.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{r.name}</div>
              <div style={{ color: '#0284c7', fontWeight: '900', fontSize: '16px', marginTop: '6px' }}>{r.price}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowInternetModal(true)} className="btn-pri" style={{ backgroundColor: '#059669' }}>
          {t.rSec.btn}
        </button>
      </section>

      {/* 6. 한패스 해외송금 제휴 섹션 */}
      <section id="hanpass" style={{ backgroundColor: '#064e3b', color: '#ffffff', padding: '50px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#6ee7b7', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', marginBottom: '12px' }}>
            {t.hSec.badge}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0' }}>
            {t.hSec.t1} <span style={{ color: '#34d399' }}>{t.hSec.t2}</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#a7f3d0', margin: '0 0 20px 0' }}>{t.hSec.desc}</p>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px dashed #34d399', borderRadius: '10px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{t.hSec.code}</div>
              <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px' }}>BADA2026</div>
            </div>
            <button onClick={copyPartnerCode} style={{ backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              {copiedCode ? '✓ 복사완료!' : '코드 복사'}
            </button>
          </div>
          <a href="https://www.hanpass.com" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
            {t.hSec.app}
          </a>
        </div>
      </section>

      {/* 7. 수령 방식 및 매장 안내 */}
      <section id="delivery" className="bada-sec">
        <h2 className="bada-h2">{t.dSec.title}</h2>
        <p className="bada-sub">{t.dSec.sub}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '25px' }}>
          <div className="bada-card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏬</div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>매장 방문 픽업</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>바다 천안 본점 및 제휴 대리점 방문 (여권 또는 등록증 지참)</p>
          </div>
          <div className="bada-card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>전국 무료 택배</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>체류 숙소/원룸으로 1~2일 내 안전 무료 배송</p>
          </div>
          <div className="bada-card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📲</div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0' }}>eSIM 즉시 발급</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>이메일 또는 메신저로 QR코드 즉시 전송</p>
          </div>
        </div>
        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#475569' }}>
          <strong>📍 주요 픽업 매장:</strong> 바다 천안 본점 (천안역 도보 3분) | 바다 안산 다문화거리점 | 바다 수원역점
        </div>
      </section>

      {/* 8. FAQ 섹션 */}
      <section id="faq" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 60px 20px' }}>
        <h2 className="bada-h2">{t.faqSec.title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {t.faqs.map((faq, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <button onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} style={{ width: '100%', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', color: '#0f172a' }}>
                <span>Q. {faq.q}</span>
                <span style={{ color: '#0284c7' }}>{openFaqIndex === idx ? '▲' : '▼'}</span>
              </button>
              {openFaqIndex === idx && (
                <div style={{ padding: '0 18px 14px 18px', fontSize: '13px', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. 푸터 */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '35px 20px', fontSize: '12px', borderTop: '1px solid #334155' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '15px', marginBottom: '3px' }}>BADA Hub Inc.</div>
            <div>외국인을 위한 한국 생활 원스톱 통신 & 금융 포털 | 공식 문의: bada@badahub.co.kr</div>
          </div>
          <div>© 2026 BADA Hub Inc. All rights reserved.</div>
        </div>
      </footer>

      {/* 10. 유심 신청 모달 (알뜰폰 & 통신 3사 지원) */}
      {showApplyModal && (
        <div className="modal-bg">
          <div className="modal-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold' }}>BADA 유심 신청서</h3>
              <button onClick={() => setShowApplyModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="bada-lbl">통신 서비스 구분</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button type="button" onClick={() => setApplyForm(p => ({ ...p, telecomCategory: 'mvno', carrier: 'KT망 알뜰폰', plan: '데이터 무제한 30일 (알뜰폰)' }))} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: applyForm.telecomCategory === 'mvno' ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: applyForm.telecomCategory === 'mvno' ? '#f0f9ff' : '#ffffff', fontWeight: 'bold', fontSize: '12px', color: applyForm.telecomCategory === 'mvno' ? '#0284c7' : '#64748b', cursor: 'pointer' }}>
                    📱 알뜰폰 (MVNO)
                  </button>
                  <button type="button" onClick={() => setApplyForm(p => ({ ...p, telecomCategory: 'mno', carrier: 'KT', plan: 'KT 5G 슬림 베이직 (통신 3사)' }))} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: applyForm.telecomCategory === 'mno' ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: applyForm.telecomCategory === 'mno' ? '#f0f9ff' : '#ffffff', fontWeight: 'bold', fontSize: '12px', color: applyForm.telecomCategory === 'mno' ? '#0284c7' : '#64748b', cursor: 'pointer' }}>
                    🏢 통신 3사 (MNO)
                  </button>
                </div>
              </div>

              <div>
                <label className="bada-lbl">통신망 / 통신사</label>
                <select value={applyForm.carrier} onChange={(e) => setApplyForm(p => ({ ...p, carrier: e.target.value }))} className="bada-inp">
                  {applyForm.telecomCategory === 'mvno' ? (
                    <>
                      <option value="KT망 알뜰폰">KT망 알뜰폰</option>
                      <option value="LG U+망 알뜰폰">LG U+망 알뜰폰</option>
                      <option value="SKT망 알뜰폰">SKT망 알뜰폰</option>
                    </>
                  ) : (
                    <>
                      <option value="KT">KT 공식 회선</option>
                      <option value="SKT">SKT 공식 회선</option>
                      <option value="LG U+">LG U+ 공식 회선</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="bada-lbl">요금제 선택</label>
                <select value={applyForm.plan} onChange={(e) => setApplyForm(p => ({ ...p, plan: e.target.value }))} className="bada-inp">
                  {modalPlans.map(pl => (
                    <option key={pl.id} value={pl.name}>{pl.name} (₩{pl.price}/월)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="bada-lbl">성함 (여권상 영문 이름)</label>
                <input type="text" required value={applyForm.name} onChange={(e) => setApplyForm(p => ({ ...p, name: e.target.value }))} placeholder="예: HONG GILDONG" className="bada-inp" />
              </div>

              <div>
                <label className="bada-lbl">연락처 (휴대폰 번호)</label>
                <input type="tel" required value={applyForm.phone} onChange={(e) => setApplyForm(p => ({ ...p, phone: e.target.value }))} placeholder="010-0000-0000" className="bada-inp" />
              </div>

              <div>
                <label className="bada-lbl">접수 확인 이메일 주소</label>
                <input type="email" value={applyForm.email} onChange={(e) => setApplyForm(p => ({ ...p, email: e.target.value }))} placeholder="example@email.com" className="bada-inp" />
              </div>

              <div>
                <label className="bada-lbl">수령 방식</label>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  {[
                    { id: 'store', label: '🏬 매장 픽업' },
                    { id: 'delivery', label: '📦 전국 택배' },
                    { id: 'esim', label: '📲 eSIM 즉시' }
                  ].map(d => (
                    <button type="button" key={d.id} onClick={() => setApplyForm(p => ({ ...p, deliveryMethod: d.id }))} style={{ flex: 1, padding: '7px', borderRadius: '6px', border: applyForm.deliveryMethod === d.id ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: applyForm.deliveryMethod === d.id ? '#f0f9ff' : '#ffffff', fontSize: '11px', fontWeight: 'bold', color: applyForm.deliveryMethod === d.id ? '#0284c7' : '#64748b', cursor: 'pointer' }}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-pri" style={{ marginTop: '8px', padding: '12px' }}>
                신청서 제출하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. 인터넷/렌탈 견적 모달 */}
      {showInternetModal && (
        <div className="modal-bg">
          <div className="modal-box" style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold' }}>인터넷·렌탈 사은품 견적</h3>
              <button onClick={() => setShowInternetModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <form onSubmit={handleInternetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="bada-lbl">성함</label>
                <input type="text" required value={internetForm.name} onChange={(e) => setInternetForm(p => ({ ...p, name: e.target.value }))} className="bada-inp" />
              </div>
              <div>
                <label className="bada-lbl">연락처</label>
                <input type="tel" required value={internetForm.phone} onChange={(e) => setInternetForm(p => ({ ...p, phone: e.target.value }))} placeholder="010-0000-0000" className="bada-inp" />
              </div>
              <div>
                <label className="bada-lbl">관심 통신사</label>
                <select value={internetForm.carrier} onChange={(e) => setInternetForm(p => ({ ...p, carrier: e.target.value }))} className="bada-inp">
                  <option value="KT">KT 인터넷+TV (최대 47만원)</option>
                  <option value="SK">SK 브로드밴드 (최대 47만원)</option>
                  <option value="LG U+">LG U+ 인터넷 (최대 47만원)</option>
                  <option value="알뜰인터넷">알뜰인터넷 결합 (최대 35만원)</option>
                </select>
              </div>
              <div>
                <label className="bada-lbl">설치 희망 주소</label>
                <input type="text" value={internetForm.address} onChange={(e) => setInternetForm(p => ({ ...p, address: e.target.value }))} placeholder="충남 천안시 동남구..." className="bada-inp" />
              </div>
              <button type="submit" className="btn-pri" style={{ marginTop: '8px', padding: '11px' }}>
                무료 견적 신청 완료
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 12. 로그인 / 회원가입 모달 */}
      {showLoginModal && (
        <div className="modal-bg">
          <div className="modal-box" style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setAuthTab('login')} style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: authTab === 'login' ? 'bold' : 'normal', color: authTab === 'login' ? '#0284c7' : '#94a3b8', cursor: 'pointer' }}>로그인</button>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <button onClick={() => setAuthTab('register')} style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: authTab === 'register' ? 'bold' : 'normal', color: authTab === 'register' ? '#0284c7' : '#94a3b8', cursor: 'pointer' }}>회원가입</button>
              </div>
              <button onClick={() => setShowLoginModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>

            {authTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" required placeholder="아이디 (예: mimimimi)" value={loginForm.username} onChange={(e) => setLoginForm(p => ({ ...p, username: e.target.value }))} className="bada-inp" />
                <input type="password" required placeholder="비밀번호 (기본: 123)" value={loginForm.password} onChange={(e) => setLoginForm(p => ({ ...p, password: e.target.value }))} className="bada-inp" />
                <button type="submit" className="btn-pri" style={{ marginTop: '4px', padding: '11px' }}>로그인</button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" required placeholder="아이디 (영문/숫자)" value={regForm.username} onChange={(e) => setRegForm(p => ({ ...p, username: e.target.value }))} className="bada-inp" />
                <input type="password" required placeholder="비밀번호" value={regForm.password} onChange={(e) => setRegForm(p => ({ ...p, password: e.target.value }))} className="bada-inp" />
                <input type="text" required placeholder="성함 (Name)" value={regForm.name} onChange={(e) => setRegForm(p => ({ ...p, name: e.target.value }))} className="bada-inp" />
                <input type="email" placeholder="이메일 (선택)" value={regForm.email} onChange={(e) => setRegForm(p => ({ ...p, email: e.target.value }))} className="bada-inp" />
                <button type="submit" className="btn-pri" style={{ marginTop: '4px', padding: '11px' }}>가입 완료</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 13. 내 계정 정보 & 회원탈퇴 모달 */}
      {showUserMenuModal && currentUser && (
        <div className="modal-bg">
          <div className="modal-box" style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>내 계정 정보</h3>
              <button onClick={() => setShowUserMenuModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
            </div>
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
              <div><strong>아이디:</strong> {currentUser.username}</div>
              <div><strong>성함:</strong> {currentUser.name}</div>
              <div><strong>이메일:</strong> {currentUser.email || '-'}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={handleLogout} className="btn-sec">로그아웃</button>
              <button onClick={handleDeleteAccount} className="btn-sec" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                회원 탈퇴 (계정 및 데이터 영구 삭제)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 14. 우측 하단 1:1 실시간 상담창 & FAQ 챗봇 */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 90 }}>
        {!showChat ? (
          <button onClick={() => setShowChat(true)} style={{ width: '56px', height: '56px', borderRadius: '28px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(2,132,199,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            💬
          </button>
        ) : (
          <div style={{ width: '330px', height: '460px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{t.bot.title}</div>
                <div style={{ fontSize: '11px', opacity: 0.85 }}>{t.bot.sub}</div>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            {chatMode === 'menu' && (
              <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', color: '#334155', backgroundColor: '#f0f9ff', padding: '9px 11px', borderRadius: '8px', lineHeight: '1.4', whiteSpace: 'pre-line' }}>
                  {t.bot.welcome}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', marginTop: '4px' }}>자주 묻는 질문</div>
                {t.faqs.map((f, i) => (
                  <button key={i} onClick={() => { setActiveFaq(f); setChatMode('answer'); }} style={{ padding: '7px 9px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', color: '#1e293b', cursor: 'pointer' }}>
                    🔹 {f.q}
                  </button>
                ))}
                <button onClick={() => setChatMode('staff_chat')} className="btn-pri" style={{ marginTop: 'auto', padding: '9px', fontSize: '12px', textAlign: 'center' }}>
                  {t.bot.staff}
                </button>
              </div>
            )}

            {chatMode === 'answer' && activeFaq && (
              <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                <button onClick={() => setChatMode('menu')} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#0284c7', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                  {t.bot.back}
                </button>
                <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#0f172a' }}>Q. {activeFaq.q}</div>
                <div style={{ fontSize: '12px', color: '#475569', backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px', lineHeight: '1.5' }}>
                  {activeFaq.a}
                </div>
                <button onClick={() => setChatMode('staff_chat')} className="btn-pri" style={{ marginTop: 'auto', padding: '9px', fontSize: '12px', textAlign: 'center' }}>
                  {t.bot.staff}
                </button>
              </div>
            )}

            {chatMode === 'staff_chat' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 'bold' }}>● 실시간 직원 상담 연결됨</span>
                  <button onClick={() => setChatMode('menu')} style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '11px', cursor: 'pointer' }}>메뉴로</button>
                </div>
                <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {chatMessages.length === 0 && (
                    <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '20px' }}>
                      문의 내용을 입력하시면 담당 직원이 실시간으로 확인 후 답변드립니다.
                    </div>
                  )}
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} style={{ alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                      <div style={{ padding: '8px 12px', borderRadius: '10px', backgroundColor: msg.sender === 'customer' ? '#0284c7' : '#f1f5f9', color: msg.sender === 'customer' ? '#ffffff' : '#0f172a', fontSize: '12px', lineHeight: '1.4' }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: msg.sender === 'customer' ? 'right' : 'left', marginTop: '2px' }}>
                        {msg.time}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendChatMessage} style={{ padding: '8px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px' }}>
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={t.bot.ph} style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' }} />
                  <button type="submit" className="btn-pri" style={{ padding: '8px 12px', fontSize: '12px' }}>
                    {t.bot.send}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
