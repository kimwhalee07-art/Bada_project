'use client';
import React, { useState } from 'react';

const translations = {
  ko: {
    nav: { plans: '유심 요금제', internet: '🌐 인터넷 설치 (사은품)', hanpass: '💸 해외송금 (한패스)', stores: '수령매장', faq: 'FAQ', login: '로그인', apply: '신청하기', logout: '로그아웃' },
    hero: {
      badge: '⚡ 외국인을 위한 한국 생활 원스톱 통신 & 금융',
      title1: '선불유심부터',
      title2: '초고속 인터넷 & 해외송금',
      title3: '까지',
      desc: '여권/외국인등록증 5분 개통 유심, 백메가·위드컴퍼니 제휴 최대 현금 사은품 인터넷 설치, 한패스(HANPASS) 우대 송금 혜택을 바다에서 한 번에 누리세요.',
      btnPlans: '유심 요금제 보기 ↓',
      btnInternet: '인터넷 사은품 확인 🎁',
      btnChat: '실시간 상담 💬',
      badge1Title: '5분 유심 개통', badge1Sub: '무제한 데이터 & PASS 인증',
      badge2Title: '인터넷 최대 사은품', badge2Sub: '백메가 / 위드컴퍼니 제휴',
      badge3Title: '한패스 해외송금', badge3Sub: '수수료 우대 & 5분 내 송금'
    },
    plansSec: {
      title: 'BADA 안심 유심 요금제',
      sub: '외국인 체류 목적별 맞춤 선불 SIM & eSIM',
      best: 'BEST',
      applyBtn: '가입 신청'
    },
    internetSec: {
      tag: '🤝 백메가 · 위드컴퍼니 공식 제휴 센터',
      title: '원룸·기숙사·가정용 초고속 인터넷 + TV',
      sub: '외국인 명의로도 동일하게 법정 최대 현금 사은품을 당일 지원합니다.',
      btnApply: '🎁 인터넷 사은품 무료 상담 신청',
      cashSupport: '최대 47만원 현금 지원',
      requestBtn: '견적 신청',
      banner: '💡 바다 유심 + 인터넷 동시 신청 고객 특별 혜택: 유심 첫 달 기본요금 추가 할인 지원!'
    },
    hanpassSec: {
      badge: '💸 대한민국 1등 외국인 해외송금 파트너',
      title1: '한패스(HANPASS) 해외송금',
      title2: '수수료 0원 우대 혜택',
      desc: '은행 방문 없이 스마트폰으로 200여 개국 5분 송금! 중국(Alipay, WeChat Pay, 은련카드), 베트남(계좌이체/현금수령), 필리핀, 네팔 등 전 세계 실시간 송금을 지원합니다.',
      codeLabel: '바다(BADA) 전용 수수료 할인 코드',
      copied: '✓ 복사완료!',
      copy: '코드 복사',
      btnApp: '한패스 앱 설치하고 송금하기 ↗',
      countryTitle: '🌏 주요 국가별 송금 지원 방식'
    },
    deliverySec: {
      title: '수령 방식 및 픽업 매장',
      sub: '방문 픽업, 전국 무료 택배 또는 eSIM 즉시 발급 중 선택하세요.',
      steps: [
        { num: '01', icon: '🏬', title: '매장 방문 픽업', desc: '바다 천안 본점 및 제휴 대리점 방문. (실물 여권 또는 외국인등록증 지참)' },
        { num: '02', icon: '📦', title: '전국 택배 배송', desc: '체류 숙소/원룸으로 1~2일 내 배송. 전국 무료 배송' },
        { num: '03', icon: '📲', title: 'eSIM 즉시 발급', desc: '이메일 또는 메신저로 QR코드 전송. 즉시 통신 개통' }
      ],
      storeTitle: '📍 당일 수령 매장 안내'
    },
    faqSec: {
      title: '자주 묻는 질문'
    },
    faqsData: [
      { q: "인터넷 설치 시 외국인도 현금 사은품을 받을 수 있나요?", a: "네, 전액 동일하게 지급됩니다! 바다는 백메가 및 위드컴퍼니 공식 제휴 채널로 KT, SK, LG 통신 3사 설치 시 법정 최대 현금 사은품을 개통 당일 즉시 입금해 드립니다." },
      { q: "한패스(HANPASS)로 해외 송금 시 수수료는 얼마인가요?", a: "바다 전용 프로모션 코드(BADA2026)를 입력하고 가입하시면 첫 송금 수수료 무료 쿠폰 및 우대 환율 혜택이 적용됩니다. 중국(알리페이), 베트남(계좌/현금수령) 등 5분 만에 송금됩니다." },
      { q: "여권으로 개통하면 PASS 인증이 되나요?", a: "아닙니다. 여권 개통 유심은 한국 법률상 PASS 본인인증이 불가능합니다. PASS 인증이 필요하신 경우 반드시 외국인등록증(ARC)으로 개통하셔야 합니다." },
      { q: "eSIM은 어떻게 받나요?", a: "신청 완료 즉시 이메일 또는 카카오톡/위챗/Zalo로 QR코드가 발송됩니다. 스마트폰으로 스캔하시면 실물 칩 교체 없이 즉시 개통됩니다." }
    ]
  },
  en: {
    nav: { plans: 'SIM Plans', internet: '🌐 High-speed Internet', hanpass: '💸 Remittance (Hanpass)', stores: 'Stores', faq: 'FAQ', login: 'Login', apply: 'Apply Now', logout: 'Logout' },
    hero: {
      badge: '⚡ One-stop Telecom & Finance for Foreigners in Korea',
      title1: 'From Prepaid SIM to',
      title2: 'High-speed Internet & Remittance',
      title3: '',
      desc: 'Get your SIM activated in 5 mins with Passport/ARC, receive maximum cash gifts for home internet, and enjoy special discount fees with HANPASS remittance.',
      btnPlans: 'View SIM Plans ↓',
      btnInternet: 'Internet Cash Gift 🎁',
      btnChat: 'Live Support 💬',
      badge1Title: '5-Min Activation', badge1Sub: 'Unlimited Data & PASS ID',
      badge2Title: 'Max Cash Gift', badge2Sub: 'Official 100Mega Partner',
      badge3Title: 'Fast Remittance', badge3Sub: 'Zero fee event & 5-min transfer'
    },
    plansSec: {
      title: 'BADA Safe SIM Plans',
      sub: 'Customized Prepaid SIM & eSIM for International Residents',
      best: 'BEST',
      applyBtn: 'Apply Now'
    },
    internetSec: {
      tag: '🤝 Official Partner: 100Mega & WithCompany',
      title: 'High-speed Internet & TV for Studio & Dorm',
      sub: 'Foreign residents receive the exact same maximum legal cash gifts upon installation.',
      btnApply: '🎁 Free Internet Consultation',
      cashSupport: 'Up to ₩470,000 Cash Support',
      requestBtn: 'Request Quote',
      banner: '💡 Special Bundle Offer: Combine BADA SIM + Internet for first-month SIM fee discount!'
    },
    hanpassSec: {
      badge: '💸 #1 Global Remittance Partner in Korea',
      title1: 'HANPASS Global Remittance',
      title2: 'Zero Fee & Preferred Exchange Rate',
      desc: 'Send money to 200+ countries in 5 minutes via smartphone! Direct transfers to China (Alipay/WeChat), Vietnam, Philippines, Nepal, and more.',
      codeLabel: 'BADA Exclusive Discount Code',
      copied: '✓ Copied!',
      copy: 'Copy Code',
      btnApp: 'Download Hanpass App ↗',
      countryTitle: '🌏 Supported Transfer Methods'
    },
    deliverySec: {
      title: 'Pickup & Delivery Methods',
      sub: 'Choose between in-store pickup, free nationwide delivery, or instant eSIM.',
      steps: [
        { num: '01', icon: '🏬', title: 'In-Store Pickup', desc: 'Visit Cheonan Main Store or partner branches with Passport/ARC.' },
        { num: '02', icon: '📦', title: 'Nationwide Delivery', desc: 'Free delivery to your dorm or studio in 1-2 business days.' },
        { num: '03', icon: '📲', title: 'Instant eSIM', desc: 'Receive QR code via Email or Messenger for immediate activation.' }
      ],
      storeTitle: '📍 Partner Stores for Same-day Pickup'
    },
    faqSec: {
      title: 'Frequently Asked Questions'
    },
    faqsData: [
      { q: "Can foreigners also receive the internet installation cash gift?", a: "Yes, 100% equally! BADA is an official partner with 100Mega. You receive the legal maximum cash gift directly into your account on installation day." },
      { q: "What is the fee when sending money with HANPASS?", a: "Enter promo code BADA2026 to get a zero-fee coupon on your first transfer and preferred exchange rates. Transfer takes under 5 minutes to Alipay, Vietnam banks, etc." },
      { q: "Can I use PASS verification if activated with a passport?", a: "No. Under Korean telecommunications law, passport-activated SIMs cannot be used for PASS verification. You must upgrade to an ARC-registered SIM." },
      { q: "How do I receive my eSIM?", a: "Immediately upon completion, your QR code will be sent to your email, KakaoTalk, WeChat, or Zalo. Simply scan it with your phone." }
    ]
  },
  zh: {
    nav: { plans: '电话卡套餐', internet: '🌐 宽带安装 (现金补贴)', hanpass: '💸 跨境汇款 (Hanpass)', stores: '自提门店', faq: '常见问题', login: '登录', apply: '立即申请', logout: '退出登录' },
    hero: {
      badge: '⚡ 专为在韩外国人打造的一站式通信与金融服务',
      title1: '从预付费电话卡到',
      title2: '高速宽带与海外汇款',
      title3: '全搞定',
      desc: '支持护照/外国人登录证5分钟开通SIM卡，办理家庭宽带享最高现金补贴，使用汉游(HANPASS)专享汇款优惠。',
      btnPlans: '查看电话卡套餐 ↓',
      btnInternet: '查看宽带现金补贴 🎁',
      btnChat: '实时咨询 💬',
      badge1Title: '5分钟快速开通', badge1Sub: '无限流量 & PASS实名认证',
      badge2Title: '最高现金补贴', badge2Sub: '官方合作正规渠道',
      badge3Title: '安全海外汇款', badge3Sub: '专享0手续费 & 5分钟到账'
    },
    plansSec: {
      title: 'BADA 放心电话卡套餐',
      sub: '针对留学生、务工人员定制的预付费SIM卡及eSIM',
      best: '爆款推荐',
      applyBtn: '立即申请'
    },
    internetSec: {
      tag: '🤝 韩国电信官方授权合作中心',
      title: '单间/宿舍/家庭 高速宽带 + 电视',
      sub: '外国人名义开通同享最高法定现金补贴，开通当天直接转账。',
      btnApply: '🎁 免费宽带报价与咨询',
      cashSupport: '最高 47万韩元 现金返还',
      requestBtn: '申请报价',
      banner: '💡 BADA电话卡+宽带同时申请特惠：首月电话费享折上折优惠！'
    },
    hanpassSec: {
      badge: '💸 韩国第一大外国人跨境汇款平台',
      title1: '汉游 (HANPASS) 海外汇款',
      title2: '0手续费专享优惠',
      desc: '手机随时随地汇款至全球200多个国家！支持中国支付宝(Alipay)、微信(WeChat Pay)、银联卡秒级到账。',
      codeLabel: 'BADA 专属手续费减免邀请码',
      copied: '✓ 已复制!',
      copy: '复制邀请码',
      btnApp: '下载Hanpass并汇款 ↗',
      countryTitle: '🌏 主要国家汇款支持方式'
    },
    deliverySec: {
      title: '领取方式及门店地址',
      sub: '支持门店自提、全韩免费快递或eSIM线上秒发。',
      steps: [
        { num: '01', icon: '🏬', title: '门店自提', desc: '携带护照或登录证原件至天安总店及合作门店领取。' },
        { num: '02', icon: '📦', title: '全韩免费包邮', desc: '寄送至您的住所或宿舍，1~2天内送达。' },
        { num: '03', icon: '📲', title: 'eSIM线上开通', desc: '通过邮箱或微信直接发送二维码，扫码即可激活使用。' }
      ],
      storeTitle: '📍 支持当天自提的线下门店'
    },
    faqSec: {
      title: '常见问题解答'
    },
    faqsData: [
      { q: "外国人装宽带也能领现金补贴吗？", a: "完全可以，金额全额一致！BADA是官方正规授权合作渠道，KT/SK/LG安装当天即将现金直接汇入您的银行账户。" },
      { q: "使用Hanpass汇款手续费是多少？", a: "输入BADA专属优惠码(BADA2026)，首笔汇款免手续费，并享最优质汇率。汇往中国支付宝/微信最快5分钟到账。" },
      { q: "用护照办的手机卡能做PASS认证吗？", a: "不能。根据韩国电信法规定，护照开通的电话卡无法进行PASS实名认证。若需认证，待登录证(ARC)办好后可联系我们升级。" },
      { q: "eSIM如何接收？", a: "申请完成后，二维码会立即发送至您的邮箱或微信/Zalo，使用手机相机直接扫描即可激活。" }
    ]
  },
  vi: {
    nav: { plans: 'Gói Cước SIM', internet: '🌐 Lắp Mạng Internet (Quà Tiền Mặt)', hanpass: '💸 Chuyển Tiền Quốc Tế', stores: 'Cửa Hàng', faq: 'FAQ', login: 'Đăng nhập', apply: 'Đăng Ký Ngay', logout: 'Đăng xuất' },
    hero: {
      badge: '⚡ Dịch vụ Viễn thông & Tài chính Trọn gói cho Người nước ngoài tại Hàn Quốc',
      title1: 'Từ SIM Trả Trước đến',
      title2: 'Internet Cáp Quang & Chuyển Tiền',
      title3: 'Trọn Gói',
      desc: 'Kích hoạt SIM 5 phút bằng Hộ chiếu/Thẻ cư trú (ARC), nhận quà tiền mặt tối đa khi lắp mạng Wi-Fi gia đình, ưu đãi phí chuyển tiền qua HANPASS.',
      btnPlans: 'Xem Gói SIM ↓',
      btnInternet: 'Nhận Quà Lắp Mạng 🎁',
      btnChat: 'Tư Vấn Trực Tiếp 💬',
      badge1Title: 'Kích hoạt trong 5 phút', badge1Sub: 'Dữ liệu không giới hạn & Xác thực PASS',
      badge2Title: 'Quà tiền mặt tối đa', badge2Sub: 'Đối tác chính thức 100Mega',
      badge3Title: 'Chuyển tiền Hanpass', badge3Sub: 'Miễn phí chuyển & Nhận sau 5 phút'
    },
    plansSec: {
      title: 'Gói Cước SIM BADA An Tâm',
      sub: 'SIM trả trước & eSIM chuyên dụng cho du học sinh và người lao động',
      best: 'PHỔ BIẾN',
      applyBtn: 'Đăng Ký'
    },
    internetSec: {
      tag: '🤝 Trung tâm Đối tác Chính thức 100Mega & WithCompany',
      title: 'Internet Tốc Độ Cao & TV cho Phòng Trọ / Ký Túc Xá',
      sub: 'Đăng ký bằng tên người nước ngoài nhận 100% quà tiền mặt tối đa theo quy định vào ngày lắp đặt.',
      btnApply: '🎁 Đăng Ký Tư Vấn Quà Mạng Miễn Phí',
      cashSupport: 'Hỗ trợ tiền mặt lên đến 470.000 KRW',
      requestBtn: 'Nhận Báo Giá',
      banner: '💡 Ưu đãi gói kết hợp: Đăng ký SIM BADA + Lắp mạng để nhận thêm giảm giá cước SIM tháng đầu!'
    },
    hanpassSec: {
      badge: '💸 Đối tác Chuyển tiền Quốc tế Số 1 tại Hàn Quốc',
      title1: 'Chuyển Tiền Quốc Tế HANPASS',
      title2: 'Ưu Đãi 0 Won Phí Chuyển',
      desc: 'Chuyển tiền về Việt Nam chỉ trong 5 phút qua điện thoại! Chuyển trực tiếp vào tài khoản tất cả ngân hàng Việt Nam 24/7 hoặc nhận tiền mặt.',
      codeLabel: 'Mã Giảm Phí Độc Quyền BADA',
      copied: '✓ Đã sao chép!',
      copy: 'Sao chép mã',
      btnApp: 'Tải Ứng Dụng Hanpass ↗',
      countryTitle: '🌏 Hình Thức Hỗ Trợ Chuyển Tiền'
    },
    deliverySec: {
      title: 'Hình Thức Nhận SIM & Cửa Hàng',
      sub: 'Chọn nhận trực tiếp tại cửa hàng, giao hàng miễn phí toàn quốc hoặc cấp eSIM ngay.',
      steps: [
        { num: '01', icon: '🏬', title: 'Nhận Tại Cửa Hàng', desc: 'Đến trực tiếp chi nhánh Cheonan 또는 đối tác (Mang theo Hộ chiếu/ARC).' },
        { num: '02', icon: '📦', title: 'Giao Hàng Toàn Quốc', desc: 'Giao miễn phí đến tận phòng trọ trong vòng 1-2 ngày làm việc.' },
        { num: '03', icon: '📲', title: 'Cấp eSIM Nhanh', desc: 'Nhận mã QR qua Email 또는 Zalo để quét và kích hoạt dùng ngay.' }
      ],
      storeTitle: '📍 Danh Sách Cửa Hàng Nhận Trong Ngày'
    },
    faqSec: {
      title: 'Câu Hỏi Thường Gặp'
    },
    faqsData: [
      { q: "Người nước ngoài lắp mạng có nhận được quà tiền mặt không?", a: "Có, nhận đủ 100%! BADA là đối tác chính thức của 100Mega. Tiền mặt hỗ trợ sẽ được chuyển trực tiếp vào tài khoản của bạn ngay trong ngày hoàn tất lắp đặt." },
      { q: "Phí chuyển tiền qua HANPASS là bao nhiêu?", a: "Nhập mã ưu đãi BADA2026 khi đăng ký để nhận phiếu miễn phí chuyển tiền lần đầu và tỷ giá ưu đãi nhất. Tiền về Việt Nam chỉ sau 5 phút." },
      { q: "Đăng ký SIM bằng hộ chiếu có xác thực PASS được không?", a: "Không. Theo quy định pháp luật viễn thông Hàn Quốc, SIM đăng ký bằng hộ chiếu không thể xác thực PASS. Bạn cần đổi sang Thẻ cư trú (ARC) để xác thực." },
      { q: "Nhận eSIM như thế nào?", a: "Ngay sau khi hoàn tất đăng ký, mã QR sẽ được gửi qua Email hoặc Zalo. Bạn chỉ cần dùng điện thoại quét mã là dùng được ngay." }
    ]
  }
};

export default function BadaPage() {
  const [lang, setLang] = useState('ko');
  const t = translations[lang] || translations.ko;

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showInternetModal, setShowInternetModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('데이터 무제한 30일');

  const [openFaq, setOpenFaq] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // 순수 고객 전용 인증 상태
  const [userAuth, setUserAuth] = useState({ role: 'guest', name: '손님', provider: null });

  // 요금제 기본 데이터
  const [plans] = useState([
    { id: 1, name: '데이터 무제한 30일', sub: '데이터와 통화를 마음껏', price: '39,600', unit: '/월', isBest: true, icon: '📶', desc: ['무제한 데이터 (11GB + 일2GB 후 3Mbps)', '통화/문자 무제한', '여권/외국인등록증 모두 개통 가능', '30일 자동 연장 가능'] },
    { id: 2, name: '실속형 선불폰', sub: '종량 충전형', price: '15,000', unit: '/부터', isBest: false, icon: '📱', desc: ['필요한 만큼만 충전', '여권 개통 가능', '기본 요금 15,000원부터', '충전 금액만큼 사용'] },
    { id: 3, name: '유학생 PASS팩', sub: '본인인증 완벽 지원', price: '29,700', unit: '/월', isBest: false, icon: '🎓', desc: ['외국인등록증(ARC) 필수', '은행 계좌 개설 지원', '토스/배달앱 본인인증', '유학생 특화 요금 할인'] },
    { id: 4, name: '단기 eSIM', sub: '여행/단기 출장 전용', price: '18,000', unit: '/5일', isBest: false, icon: '✈️', desc: ['5일간 데이터 무제한', 'QR코드로 이메일/메신저 전송', '물리 유심 교체 불필요', '신청 즉시 개통'] }
  ]);

  // 대리점 데이터
  const [stores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 도보 3분)', phone: '041-555-1234' },
    { id: 'ansan', name: '바다 안산 다문화거리점', address: '경기 안산시 단원구 원곡동', phone: '031-444-5678' },
    { id: 'suwon', name: '바다 수원역점', address: '경기 수원시 팔달구 매산로', phone: '031-222-9876' }
  ]);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', plan: '데이터 무제한 30일',
    idType: 'passport', deliveryMethod: 'store', pickupStore: 'cheonan', address: ''
  });

  const [internetForm, setInternetForm] = useState({
    name: '', phone: '', carrier: 'KT', speed: '500M', address: ''
  });

  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 바다(BADA) 공식 AI 매니저입니다.\n외국인 선불유심, 인터넷 설치(백메가 제휴), 한패스 해외송금 등 무엇이든 편하게 물어보세요!' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleCopyPartnerCode = () => {
    navigator.clipboard.writeText('BADA2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 고객 소셜 로그인
  const handleSocialLogin = (platform, displayName) => {
    setUserAuth({ role: 'customer', name: displayName, provider: platform });
    setForm(prev => ({ ...prev, name: displayName }));
    setInternetForm(prev => ({ ...prev, name: displayName }));
    setShowLoginModal(false);
    alert(`${platform} 로그인 완료: ${displayName}`);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert('성함과 연락처를 입력해주세요.');
    alert('신청이 정상 접수되었습니다! 담당 직원이 곧 연락드립니다.');
    setShowApplyModal(false);
  };

  const handleInternetSubmit = (e) => {
    e.preventDefault();
    if (!internetForm.name || !internetForm.phone) return alert('성함과 연락처를 입력해주세요.');
    alert('인터넷 설치 상담이 접수되었습니다! 최대 사은품 안내를 위해 곧 전화드립니다.');
    setShowInternetModal(false);
    setInternetForm({ name: '', phone: '', carrier: 'KT', speed: '500M', address: '' });
  };

  const handleSendChat = async (e) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;
    const textToSend = inputMsg;

    if (isAiLoading) return;
    setChatMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setInputMsg('');
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
      setChatMessages(prev => [...prev, { role: 'assistant', content: '상담 서버 연결에 문제가 생겼습니다.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b' }}>

      {/* 1. 네비게이션 헤더 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: '18px' }}>
              B
            </div>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>BADA</span>
          </div>

          <nav style={{ display: 'flex', gap: '22px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
            <a href="#plans" style={{ textDecoration: 'none', color: 'inherit' }}>{t.nav.plans}</a>
            <a href="#internet" style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 'bold' }}>{t.nav.internet}</a>
            <a href="#hanpass" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>{t.nav.hanpass}</a>
            <a href="#delivery" style={{ textDecoration: 'none', color: 'inherit' }}>{t.nav.stores}</a>
            <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>{t.nav.faq}</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {userAuth.role === 'guest' ? (
              <button 
                onClick={() => setShowLoginModal(true)} 
                style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '7px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}
              >
                <span>👤</span> {t.nav.login}
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#16a34a', backgroundColor: '#dcfce7', padding: '4px 10px', borderRadius: '6px' }}>
                  {userAuth.name}
                </span>
                <button onClick={() => setUserAuth({ role: 'guest', name: '손님', provider: null })} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#ef4444', cursor: 'pointer' }}>{t.nav.logout}</button>
              </div>
            )}

            {/* 언어 선택 드롭다운 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px', backgroundColor: '#fff' }}>
              <span>🌐</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ border: 'none', background: 'transparent', fontSize: '13px', color: '#475569', outline: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>

            <button 
              onClick={() => { setSelectedPlanForModal(plans[0]?.name || ''); setShowApplyModal(true); }}
              style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 6px rgba(2,132,199,0.3)' }}
            >
              {t.nav.apply}
            </button>
          </div>
        </div>
      </header>

      {/* 2. 히어로 섹션 */}
      <section style={{ backgroundColor: '#0b1329', color: '#ffffff', padding: '70px 20px 80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '30px', padding: '6px 14px', fontSize: '13px', color: '#7dd3fc', marginBottom: '22px' }}>
            {t.hero.badge}
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1.3', margin: '0 0 18px 0', letterSpacing: '-0.5px' }}>
            {t.hero.title1} <span style={{ color: '#38bdf8' }}>{t.hero.title2}</span> {t.hero.title3}
          </h1>
          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: '1.6', margin: '0 auto 32px auto', maxWidth: '660px' }}>
            {t.hero.desc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '50px', flexWrap: 'wrap' }}>
            <a href="#plans" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#0284c7', color: '#ffffff', padding: '13px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none' }}>
              {t.hero.btnPlans}
            </a>
            <a href="#internet" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(2,132,199,0.2)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '13px 22px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none' }}>
              {t.hero.btnInternet}
            </a>
            <button onClick={() => setShowChat(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', padding: '13px 22px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.hero.btnChat}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '850px', margin: '0 auto' }}>
            {[
              { icon: '📶', title: t.hero.badge1Title, sub: t.hero.badge1Sub },
              { icon: '🌐', title: t.hero.badge2Title, sub: t.hero.badge2Sub },
              { icon: '💸', title: t.hero.badge3Title, sub: t.hero.badge3Sub }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(2,132,199,0.15)', color: '#38bdf8', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: '800' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 유심 요금제 섹션 */}
      <section id="plans" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>{t.plansSec.title}</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{t.plansSec.sub}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {plans.map((plan) => (
            <div key={plan.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: plan.isBest ? '2px solid #0284c7' : '1px solid #e2e8f0', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {plan.isBest && (
                <span style={{ position: 'absolute', top: '-11px', right: '20px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
                  {t.plansSec.best}
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

              <button 
                onClick={() => { setSelectedPlanForModal(plan.name); setShowApplyModal(true); }}
                style={{ width: '100%', padding: '12px', backgroundColor: plan.isBest ? '#0284c7' : '#f1f5f9', color: plan.isBest ? '#ffffff' : '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
              >
                {t.plansSec.applyBtn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 초고속 인터넷 설치 섹션 */}
      <section id="internet" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '70px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', marginBottom: '8px' }}>
                {t.internetSec.tag}
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>{t.internetSec.title}</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{t.internetSec.sub}</p>
            </div>
            <button 
              onClick={() => setShowInternetModal(true)}
              style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 22px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }}
            >
              {t.internetSec.btnApply}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#dc2626' }}>KT 인터넷</span>
                <span style={{ fontSize: '11px', backgroundColor: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>NO.1</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>{t.internetSec.cashSupport}</div>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 16px 0' }}>대칭형 기가 인터넷 완벽 지원. 외국인 선호도 최다.</p>
              <button onClick={() => { setInternetForm(prev => ({ ...prev, carrier: 'KT' })); setShowInternetModal(true); }} style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                KT {t.internetSec.requestBtn}
              </button>
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ea580c' }}>SK 브로드밴드</span>
                <span style={{ fontSize: '11px', backgroundColor: '#ffedd5', color: '#ea580c', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>BEST VALUE</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>{t.internetSec.cashSupport}</div>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 16px 0' }}>Btv 다국어 콘텐츠 및 가족 결합 혜택. 최적의 가성비 조합.</p>
              <button onClick={() => { setInternetForm(prev => ({ ...prev, carrier: 'SK' })); setShowInternetModal(true); }} style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                SK {t.internetSec.requestBtn}
              </button>
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#db2777' }}>LG U+</span>
                <span style={{ fontSize: '11px', backgroundColor: '#fce7f3', color: '#db2777', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>OTT / IPTV</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>{t.internetSec.cashSupport}</div>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 16px 0' }}>넷플릭스·디즈니 완벽 연동 IPTV 셋톱박스 기본 탑재.</p>
              <button onClick={() => { setInternetForm(prev => ({ ...prev, carrier: 'LG' })); setShowInternetModal(true); }} style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                LG {t.internetSec.requestBtn}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', backgroundColor: '#eff6ff', padding: '16px 20px', borderRadius: '12px' }}>
            <span style={{ fontSize: '13px', color: '#1e40af' }}>{t.internetSec.banner}</span>
          </div>
        </div>
      </section>

      {/* 5. 한패스(HANPASS) 해외송금 섹션 */}
      <section id="hanpass" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ backgroundColor: '#064e3b', color: '#ffffff', borderRadius: '24px', padding: '40px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', color: '#6ee7b7', marginBottom: '14px' }}>
                {t.hanpassSec.badge}
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.3' }}>
                {t.hanpassSec.title1}<br/>
                <span style={{ color: '#34d399' }}>{t.hanpassSec.title2}</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#a7f3d0', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                {t.hanpassSec.desc}
              </p>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px dashed #34d399', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '380px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{t.hanpassSec.codeLabel}</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px', color: '#ffffff' }}>BADA2026</div>
                </div>
                <button 
                  onClick={handleCopyPartnerCode}
                  style={{ backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {copiedCode ? t.hanpassSec.copied : t.hanpassSec.copy}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.hanpass.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  {t.hanpassSec.btnApp}
                </a>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '14px' }}>{t.hanpassSec.countryTitle}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1fae5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🇨🇳 China</span>
                  <span style={{ fontWeight: 'bold', color: '#ffffff' }}>Alipay / WeChat / UnionPay</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🇻🇳 Vietnam</span>
                  <span style={{ fontWeight: 'bold', color: '#ffffff' }}>All Banks 24/7 / Cash Pickup</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🇵🇭 Philippines</span>
                  <span style={{ fontWeight: 'bold', color: '#ffffff' }}>GCash / Banks / Pawnshop</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🌏 Global 200+</span>
                  <span style={{ fontWeight: 'bold', color: '#ffffff' }}>Western Union / Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 수령 방식 및 매장 안내 섹션 */}
      <section id="delivery" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '70px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>{t.deliverySec.title}</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{t.deliverySec.sub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '36px' }}>
            {t.deliverySec.steps.map((step) => (
              <div key={step.num} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '30px', fontWeight: '900', color: '#e2e8f0' }}>{step.num}</div>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{step.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{step.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{step.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#0f172a' }}>
              {t.deliverySec.storeTitle} ({stores.length})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {stores.map((s) => (
                <div key={s.id} style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0284c7' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.address}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>📞 {s.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" style={{ maxWidth: '780px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>❓</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{t.faqSec.title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {t.faqsData.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
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
      </section>

      {/* 8. 푸터 */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', textAlign: 'center', fontSize: '13px', lineHeight: '1.8' }}>
        <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>BADA - 바다 외국인 통신 & 생활 금융 허브</div>
        <div>충남 천안시 동남구 대흥로 (천안 본점) | 인터넷·유심 고객센터 직통: 041-555-1234</div>
        <div style={{ marginTop: '12px', color: '#64748b' }}>공식 파트너십: 백메가(인터넷) · 위드컴퍼니 · 한패스(해외송금) | © 2026 BADA. All rights reserved.</div>
      </footer>

      {/* 9. 인터넷 상담 모달 */}
      {showInternetModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '440px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowInternetModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>초고속 인터넷 사은품 견적 상담</h3>
            <form onSubmit={handleInternetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              <input type="text" placeholder="성함 (Name) *" value={internetForm.name} onChange={(e) => setInternetForm({ ...internetForm, name: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <input type="tel" placeholder="연락처 (Phone) *" value={internetForm.phone} onChange={(e) => setInternetForm({ ...internetForm, phone: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                {['KT', 'SK', 'LG'].map(carrier => (
                  <button key={carrier} type="button" onClick={() => setInternetForm({ ...internetForm, carrier })} style={{ padding: '9px', borderRadius: '6px', border: internetForm.carrier === carrier ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: internetForm.carrier === carrier ? '#f0f9ff' : '#fff', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                    {carrier}
                  </button>
                ))}
              </div>
              <input type="text" placeholder="설치 주소 (Address) *" value={internetForm.address} onChange={(e) => setInternetForm({ ...internetForm, address: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <button type="submit" style={{ padding: '13px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                사은품 견적 안내받기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 10. 유심 간편 신청서 모달 */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '460px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>유심 간편 신청서</h3>
            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <input type="text" placeholder="👤 성함 (여권 영문명 / Name) *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="email" placeholder="✉️ 이메일 (Email)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                <input type="tel" placeholder="📞 연락처 (Phone) *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>
              <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}>
                {plans.map(p => (
                  <option key={p.id} value={p.name}>{p.name} (₩ {p.price})</option>
                ))}
              </select>
              <button type="submit" style={{ width: '100%', padding: '13px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                신청 완료 (Submit)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. 순수 고객 소셜 로그인 모달 */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '360px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', textAlign: 'center' }}>간편 로그인</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="button" onClick={() => handleSocialLogin('Google', 'Google User')} style={{ width: '100%', padding: '11px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>🌐 Google 계속하기</button>
              <button type="button" onClick={() => handleSocialLogin('WeChat', '微信 客户')} style={{ width: '100%', padding: '11px', backgroundColor: '#07c160', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>💬 WeChat (微信) 登录</button>
              <button type="button" onClick={() => handleSocialLogin('Zalo', 'Khách hàng Zalo')} style={{ width: '100%', padding: '11px', backgroundColor: '#0068ff', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>📱 Zalo Đăng nhập (Việt Nam)</button>
            </div>
          </div>
        </div>
      )}

      {/* 12. 챗봇 상담창 */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        {!showChat ? (
          <button onClick={() => setShowChat(true)} style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', fontSize: '24px', boxShadow: '0 4px 16px rgba(2,132,199,0.4)', cursor: 'pointer' }}>
            💬
          </button>
        ) : (
          <div style={{ width: '350px', height: '480px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>BADA 통신 & 금융 고객센터</div>
                <div style={{ fontSize: '11px', color: '#bae6fd' }}>유심 · 초고속 인터넷 · 한패스 송금</div>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ padding: '9px 12px', borderRadius: '12px', backgroundColor: msg.role === 'user' ? '#0284c7' : '#f1f5f9', color: msg.role === 'user' ? '#ffffff' : '#1e293b', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAiLoading && <div style={{ fontSize: '12px', color: '#94a3b8' }}>바다 AI가 작성 중입니다...</div>}
            </div>

            <form onSubmit={handleSendChat} style={{ padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px' }}>
              <input type="text" placeholder="문의사항을 입력하세요..." value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }} />
              <button type="submit" style={{ padding: '9px 14px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>전송</button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
