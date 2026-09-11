'use client';
import React, { useState, useEffect } from 'react';

const translations = {
  ko: {
    nav: { plans: '유심 요금제', internet: '🌐 인터넷 설치 (사은품)', rental: '💧 가전/렌탈', hanpass: '💸 해외송금 (한패스)', stores: '수령매장', faq: 'FAQ', login: '로그인', apply: '신청하기', logout: '로그아웃' },
    hero: {
      badge: '⚡ 외국인을 위한 한국 생활 원스톱 통신 & 금융',
      title1: '선불유심부터',
      title2: '초고속 인터넷 & 해외송금',
      title3: '까지',
      desc: '여권/외국인등록증 5분 개통 유심, 백메가·위드컴퍼니 제휴 최대 현금 사은품 인터넷 설치, 한패스(HANPASS) 우대 송금 혜택을 바다에서 한 번에 누리세요.',
      btnPlans: '유심 요금제 보기 ↓',
      btnInternet: '인터넷 사은품 확인 🎁',
      btnChat: '1:1 직원 상담 💬',
      badge1Title: '5분 유심 개통', badge1Sub: '무제한 데이터 & PASS 인증',
      badge2Title: '인터넷 최대 사은품', badge2Sub: '백메가 / 위드컴퍼니 제휴',
      badge3Title: '한패스 해외송금', badge3Sub: '수수료 우대 & 5분 내 송금'
    },
    plansSec: { title: 'BADA 안심 유심 요금제', sub: '외국인 체류 목적별 맞춤 선불 SIM & eSIM', applyBtn: '가입 신청' },
    internetSec: {
      tag: '🤝 백메가 · 위드컴퍼니 공식 제휴 센터',
      title: '원룸·기숙사·가정용 초고속 인터넷 + TV',
      sub: '외국인 명의로도 동일하게 법정 최대 현금 사은품을 당일 지원합니다.',
      btnApply: '🎁 인터넷 사은품 무료 상담 신청',
      requestBtn: '견적 신청',
      banner: '💡 바다 유심 + 인터넷 동시 신청 고객 특별 혜택: 유심 첫 달 기본요금 추가 할인 지원!'
    },
    rentalSec: {
      tag: '💧 외국인 맞춤 생활 렌탈 서비스',
      title: '정수기 · 비데 · 공기청정기 간편 렌탈',
      sub: '외국인등록증(ARC) 간편 심사로 복잡한 서류 없이 당일 접수 지원합니다.',
      btnApply: '렌탈 무료 상담 신청'
    },
    hanpassSec: {
      badge: '💸 대한민국 1등 외국인 해외송금 파트너',
      title1: '한패스(HANPASS) 해외송금',
      title2: '수수료 0원 우대 혜택',
      desc: '은행 방문 없이 스마트폰으로 200여 개국 5분 송금! 중국, 베트남, 필리핀, 네팔 등 전 세계 실시간 송금을 지원합니다.',
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
    faqSec: { title: '자주 묻는 질문' },
    faqsData: [
      { q: "인터넷 설치 시 외국인도 현금 사은품을 받을 수 있나요?", a: "네, 전액 동일하게 지급됩니다! 바다는 백메가 공식 제휴로 KT, SK, LG 설치 시 법정 최대 사은품을 당일 입금해 드립니다." },
      { q: "한패스(HANPASS) 송금 수수료 할인은 어떻게 받나요?", a: "프로모션 코드 BADA2026을 입력하고 가입하시면 첫 송금 수수료 무료 쿠폰이 즉시 발급됩니다." },
      { q: "정수기 렌탈도 외국인 명의로 가능한가요?", a: "네, 외국인등록증(ARC) 소지자라면 신용카드나 통장 자동이체 등록을 통해 내국인과 동일하게 렌탈하실 수 있습니다." }
    ],
    bot: {
      title: 'BADA 1:1 고객센터',
      subtitle: '실시간 FAQ & 직원 대화 연결',
      welcome: '안녕하세요! 바다(BADA) 공식 상담 센터입니다.\n원하시는 문의 항목을 선택하시거나 직원과 직접 1:1 채팅을 시작해 보세요.',
      backToMenu: '↩ 이전 질문 목록으로',
      startStaffChat: '💬 전담 직원과 1:1 실시간 대화하기',
      chatInputPlaceholder: '직원에게 문의할 내용을 입력하세요...',
      send: '전송',
      menuSim: '📱 유심/eSIM 개통 (여권/등록증)',
      menuInternet: '🌐 인터넷 사은품 (최대 47만원)',
      menuRental: '💧 가전/정수기 렌탈 (ARC 간편심사)',
      menuHanpass: '💸 한패스 송금 0원 프로모션 코드',
      menuStore: '🏬 픽업 매장 위치 안내',
      openSimBtn: '📝 유심 신청서 바로 열기',
      openInternetBtn: '🎁 인터넷 견적 신청서 열기',
      openRentalBtn: '💧 렌탈 견적 신청서 열기',
      copyCodeBtn: '📋 송금코드 복사하기'
    }
  },
  en: {
    nav: { plans: 'SIM Plans', internet: '🌐 High-speed Internet', rental: '💧 Appliance Rental', hanpass: '💸 Remittance (Hanpass)', stores: 'Stores', faq: 'FAQ', login: 'Login', apply: 'Apply Now', logout: 'Logout' },
    hero: {
      badge: '⚡ One-stop Telecom & Finance for Foreigners in Korea',
      title1: 'From Prepaid SIM to',
      title2: 'High-speed Internet & Remittance',
      title3: '',
      desc: 'Get your SIM activated in 5 mins with Passport/ARC, receive maximum cash gifts for home internet, and enjoy special discount fees with HANPASS remittance.',
      btnPlans: 'View SIM Plans ↓',
      btnInternet: 'Internet Cash Gift 🎁',
      btnChat: '1:1 Live Support 💬',
      badge1Title: '5-Min Activation', badge1Sub: 'Unlimited Data & PASS ID',
      badge2Title: 'Max Cash Gift', badge2Sub: 'Official 100Mega Partner',
      badge3Title: 'Fast Remittance', badge3Sub: 'Zero fee event & 5-min transfer'
    },
    plansSec: { title: 'BADA Safe SIM Plans', sub: 'Customized Prepaid SIM & eSIM for International Residents', applyBtn: 'Apply Now' },
    internetSec: {
      tag: '🤝 Official Partner: 100Mega & WithCompany',
      title: 'High-speed Internet & TV for Studio & Dorm',
      sub: 'Foreign residents receive the exact same maximum legal cash gifts upon installation.',
      btnApply: '🎁 Free Internet Consultation',
      requestBtn: 'Request Quote',
      banner: '💡 Special Bundle Offer: Combine BADA SIM + Internet for first-month SIM fee discount!'
    },
    rentalSec: {
      tag: '💧 Home Appliance Rental for Foreigners',
      title: 'Water Purifier & Air Cleaner Rental',
      sub: 'Simple registration with Alien Registration Card (ARC) without complicated paperwork.',
      btnApply: 'Consult Rental'
    },
    hanpassSec: {
      badge: '💸 #1 Global Remittance Partner in Korea',
      title1: 'HANPASS Global Remittance',
      title2: 'Zero Fee & Preferred Exchange Rate',
      desc: 'Send money to 200+ countries in 5 minutes via smartphone! Direct transfers to China, Vietnam, Philippines, Nepal, and more.',
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
    faqSec: { title: 'Frequently Asked Questions' },
    faqsData: [
      { q: "Can foreigners also receive the internet installation cash gift?", a: "Yes, 100% equally! You receive the legal maximum cash gift directly into your account on installation day." },
      { q: "How do I get a remittance fee discount with HANPASS?", a: "Enter promo code BADA2026 to receive a zero-fee coupon on your first transfer." },
      { q: "Can foreigners rent a water purifier?", a: "Yes, ARC holders can rent appliances easily with bank account or credit card setup." }
    ],
    bot: {
      title: 'BADA 1:1 Support Center',
      subtitle: 'Instant FAQ & Live Staff Chat',
      welcome: 'Hello! Welcome to BADA Support.\nChoose a topic below or chat directly with our staff.',
      backToMenu: '↩ Back to Menu',
      startStaffChat: '💬 Chat 1:1 with Staff Member',
      chatInputPlaceholder: 'Type your message to staff...',
      send: 'Send',
      menuSim: '📱 SIM / eSIM Activation & Plans',
      menuInternet: '🌐 Internet Cash Gift (Up to ₩470,000)',
      menuRental: '💧 Appliance Rental (ARC Simple Check)',
      menuHanpass: '💸 Hanpass Zero-Fee Promo Code',
      menuStore: '🏬 Store Pickup Locations',
      openSimBtn: '📝 Open SIM Application',
      openInternetBtn: '🎁 Request Internet Quote',
      openRentalBtn: '💧 Request Rental Quote',
      copyCodeBtn: '📋 Copy Promo Code'
    }
  },
  zh: {
    nav: { plans: '电话卡套餐', internet: '🌐 宽带安装 (现金补贴)', rental: '💧 家电租赁', hanpass: '💸 跨境汇款 (Hanpass)', stores: '自提门店', faq: '常见问题', login: '登录', apply: '立即申请', logout: '退出登录' },
    hero: {
      badge: '⚡ 专为在韩外国人打造的一站式通信与金融服务',
      title1: '从预付费电话卡到',
      title2: '高速宽带与海外汇款',
      title3: '全搞定',
      desc: '支持护照/外国人登录证5分钟开通SIM卡，办理家庭宽带享最高现金补贴，使用汉游(HANPASS)专享汇款优惠。',
      btnPlans: '查看电话卡套餐 ↓',
      btnInternet: '查看宽带现金补贴 🎁',
      btnChat: '人工1:1在线咨询 💬',
      badge1Title: '5分钟快速开通', badge1Sub: '无限流量 & PASS实名认证',
      badge2Title: '最高现金补贴', badge2Sub: '官方合作正规渠道',
      badge3Title: '安全海外汇款', badge3Sub: '专享0手续费 & 5分钟到账'
    },
    plansSec: { title: 'BADA 放心电话卡套餐', sub: '针对留学生、务工人员定制的预付费SIM卡及eSIM', applyBtn: '立即申请' },
    internetSec: {
      tag: '🤝 韩国电信官方授权合作中心',
      title: '单间/宿舍/家庭 高速宽带 + 电视',
      sub: '外国人名义开通同享最高法定现金补贴，开通当天直接转账。',
      btnApply: '🎁 免费宽带报价与咨询',
      requestBtn: '申请报价',
      banner: '💡 BADA电话卡+宽带同时申请特惠：首月电话费享折上折优惠！'
    },
    rentalSec: {
      tag: '💧 在韩外国人生活家电租赁',
      title: '净水器 · 空气净化器 轻松租赁',
      sub: '持有外国人登录证(ARC)即可快速审核办理，免繁琐材料。',
      btnApply: '家电租赁咨询'
    },
    hanpassSec: {
      badge: '💸 韩国第一大外国人跨境汇款平台',
      title1: '汉游 (HANPASS) 海外汇款',
      title2: '0手续费专享优惠',
      desc: '手机随时随地汇款至全球200多个国家！支持中国支付宝、微信、银联卡秒级到账。',
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
    faqSec: { title: '常见问题解答' },
    faqsData: [
      { q: "外国人装宽带也能领现金补贴吗？", a: "完全可以，金额全额一致！安装当天现金直接转账。" },
      { q: "使用Hanpass汇款手续费是多少？", a: "输入BADA专属优惠码(BADA2026)，首笔汇款免手续费。" },
      { q: "外国人可以办理净水器租赁吗？", a: "持登录证即可申请，绑定银行账户自动扣款，享受免费滤芯更换。" }
    ],
    bot: {
      title: 'BADA 1:1 客户服务中心',
      subtitle: '快速问答与人工一对一直连',
      welcome: '您好！欢迎使用BADA客户支持中心。\n请点击下方快捷问题或直接与工作人员进行1:1在线交流。',
      backToMenu: '↩ 返回上一级',
      startStaffChat: '💬 与工作人员进行1:1实时聊天',
      chatInputPlaceholder: '请输入您想咨询工作人员的内容...',
      send: '发送',
      menuSim: '📱 电话卡/eSIM办理说明',
      menuInternet: '🌐 宽带+电视现金补贴 (最高47万)',
      menuRental: '💧 净水器/家电租赁快速审核',
      menuHanpass: '💸 Hanpass跨境汇款0手续费优惠码',
      menuStore: '🏬 线下自提门店地址',
      openSimBtn: '📝 立即填写电话卡申请',
      openInternetBtn: '🎁 申请宽带补贴报价',
      openRentalBtn: '💧 申请家电租赁咨询',
      copyCodeBtn: '📋 复制汇款优惠码'
    }
  },
  vi: {
    nav: { plans: 'Gói Cước SIM', internet: '🌐 Lắp Mạng Internet', rental: '💧 Thuê Thiết Bị Gia Dụng', hanpass: '💸 Chuyển Tiền Quốc Tế', stores: 'Cửa Hàng', faq: 'FAQ', login: 'Đăng nhập', apply: 'Đăng Ký Ngay', logout: 'Đăng xuất' },
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
    plansSec: { title: 'Gói Cước SIM BADA An Tâm', sub: 'SIM trả trước & eSIM chuyên dụng cho du học sinh và người lao động', applyBtn: 'Đăng Ký' },
    internetSec: {
      tag: '🤝 Trung tâm Đối tác Chính thức 100Mega & WithCompany',
      title: 'Internet Tốc Độ Cao & TV cho Phòng Trọ / Ký Túc Xá',
      sub: 'Đăng ký bằng tên người nước ngoài nhận 100% quà tiền mặt tối đa theo quy định vào ngày lắp đặt.',
      btnApply: '🎁 Đăng Ký Tư Vấn Quà Mạng Miễn Phí',
      requestBtn: 'Nhận Báo Giá',
      banner: '💡 Ưu đãi gói kết hợp: Đăng ký SIM BADA + Lắp mạng để nhận thêm giảm giá cước SIM tháng đầu!'
    },
    rentalSec: {
      tag: '💧 Dịch Vụ Cho Thuê Thiết Bị Đời Sống',
      title: 'Thuê Máy Lọc Nước & Máy Lọc Không Khí',
      sub: 'Thủ tục đơn giản chỉ cần Thẻ cư trú (ARC), xét duyệt và lắp đặt nhanh chóng.',
      btnApply: 'Tư Vấn Thuê Máy'
    },
    hanpassSec: {
      badge: '💸 Đối tác Chuyển tiền Quốc tế Số 1 tại Hàn Quốc',
      title1: 'Chuyển Tiền Quốc Tế HANPASS',
      title2: 'Ưu Đãi 0 Won Phí Chuyển',
      desc: 'Chuyển tiền về Việt Nam chỉ trong 5 phút qua điện thoại! Chuyển trực tiếp vào tài khoản ngân hàng 24/7.',
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
        { num: '01', icon: '🏬', title: 'Nhận Tại Cửa Hàng', desc: 'Đến trực tiếp chi nhánh Cheonan hoặc đối tác (Mang theo Hộ chiếu/ARC).' },
        { num: '02', icon: '📦', title: 'Giao Hàng Toàn Quốc', desc: 'Giao miễn phí đến tận phòng trọ trong vòng 1-2 ngày làm việc.' },
        { num: '03', icon: '📲', title: 'Cấp eSIM Nhanh', desc: 'Nhận mã QR qua Email hoặc Zalo để quét và kích hoạt dùng ngay.' }
      ],
      storeTitle: '📍 Danh Sách Cửa Hàng Nhận Trong Ngày'
    },
    faqSec: { title: 'Câu Hỏi Thường Gặp' },
    faqsData: [
      { q: "Người nước ngoài lắp mạng có nhận được quà tiền mặt không?", a: "Có, nhận đủ 100%! Tiền mặt chuyển thẳng vào tài khoản ngay trong ngày lắp đặt." },
      { q: "Phí chuyển tiền qua HANPASS là bao nhiêu?", a: "Nhập mã ưu đãi BADA2026 để nhận coupon miễn phí chuyển tiền lần đầu." },
      { q: "Người nước ngoài có thuê máy lọc nước được không?", a: "Có, chỉ cần Thẻ cư trú (ARC) và tài khoản ngân hàng là đăng ký được ngay." }
    ],
    bot: {
      title: 'Trung Tâm Hỗ TrỢ BADA 1:1',
      subtitle: 'Hỏi Đáp Nhanh & Trò Chuyện Trực Tuyến',
      welcome: 'Xin chào! Chào mừng bạn đến với trung tâm hỗ trợ BADA.\nHãy chọn câu hỏi bên dưới hoặc nhắn tin trực tiếp với nhân viên.',
      backToMenu: '↩ Quay lại menu',
      startStaffChat: '💬 Trò chuyện 1:1 với nhân viên tư vấn',
      chatInputPlaceholder: 'Nhập nội dung cần hỏi nhân viên...',
      send: 'Gửi',
      menuSim: '📱 Gói cước SIM/eSIM & Giấy tờ',
      menuInternet: '🌐 Quà tiền mặt lắp mạng (Tới 470.000w)',
      menuRental: '💧 Thuê máy lọc nước (Thẻ ARC)',
      menuHanpass: '💸 Mã ưu đãi 0đ chuyển tiền Hanpass',
      menuStore: '🏬 Địa chỉ các cửa hàng nhận máy',
      openSimBtn: '📝 Điền Đơn Đăng Ký SIM',
      openInternetBtn: '🎁 Nhận Báo Giá Quà Lắp Mạng',
      openRentalBtn: '💧 Đăng Ký Thuê Máy Lọc Nước',
      copyCodeBtn: '📋 Sao Chép Mã Chuyển Tiền'
    }
  }
};

export default function BadaPage() {
  const [lang, setLang] = useState('ko');
  const t = translations[lang] || translations.ko;

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showInternetModal, setShowInternetModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('');

  const [openFaq, setOpenFaq] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // [회원 시스템]: 현재 로그인된 사용자 상태 (고객 화면에는 userCode 노출 안 함)
  const [currentUser, setCurrentUser] = useState(null);

  // [회원 데이터베이스]: 로컬스토리지 bada_user_db 연동
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // 로그인/회원가입 모달 내부 탭 및 폼 상태
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [regForm, setRegForm] = useState({ username: '', password: '', name: '', phone: '' });
  const [regError, setRegError] = useState('');

  // 1:1 라이브 채팅 모드 & 상태
  const [botMode, setBotMode] = useState('faq'); // 'faq' | 'topic_detail' | 'staff_chat'
  const [currentTopic, setCurrentTopic] = useState(null);
  const [liveMessages, setLiveMessages] = useState([
    { sender: 'staff', text: '안녕하세요! BADA 전담 상담원입니다. 무엇이든 편하게 물어보세요!', time: '방금' }
  ]);
  const [customerInput, setCustomerInput] = useState('');
  const [clientSessionId, setClientSessionId] = useState('');

  // 회원 DB 로드 및 세션 초기화
  useEffect(() => {
    // 1. 회원 DB 로드 (없으면 기본 샘플 유저 세팅)
    const storedUsers = localStorage.getItem('bada_user_db');
    if (storedUsers) {
      try {
        setRegisteredUsers(JSON.parse(storedUsers));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialUsers = [
        { userCode: '0000_0000_0001', username: 'alex99', name: 'NGUYEN VAN A', phone: '010-9988-7766', createdAt: '2026-09-10' },
        { userCode: '0000_0000_0002', username: 'zhangwei', name: 'ZHANG WEI', phone: '010-3322-1144', createdAt: '2026-09-11' }
      ];
      localStorage.setItem('bada_user_db', JSON.stringify(initialUsers));
      setRegisteredUsers(initialUsers);
    }

    // 2. 현재 로그인 세션 확인
    const loggedUser = localStorage.getItem('bada_current_login');
    if (loggedUser) {
      try {
        const u = JSON.parse(loggedUser);
        setCurrentUser(u);
        setForm(prev => ({ ...prev, name: u.name, phone: u.phone }));
        setInternetForm(prev => ({ ...prev, name: u.name, phone: u.phone }));
      } catch (e) {
        console.error(e);
      }
    }

    // 3. 고유 고객 세션 ID 생성
    let sid = localStorage.getItem('bada_user_sid');
    if (!sid) {
      sid = 'customer_' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem('bada_user_sid', sid);
    }
    setClientSessionId(sid);

    // 4. 관리자 채팅 메시지 실시간 수신 리스너
    const handleStorageChange = () => {
      const allChatsStr = localStorage.getItem('bada_live_chat_rooms');
      if (allChatsStr) {
        try {
          const allChats = JSON.parse(allChatsStr);
          if (allChats[sid] && allChats[sid].messages) {
            setLiveMessages(allChats[sid].messages);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [simPlans] = useState([
    { id: 1, name: '데이터 무제한 30일', sub: '데이터와 통화를 마음껏', price: '39,600', unit: '/월', badge: 'BEST', icon: '📶', desc: ['무제한 데이터 (11GB + 일2GB 후 3Mbps)', '통화/문자 무제한', '여권/외국인등록증 모두 개통 가능'] },
    { id: 2, name: '실속형 선불폰', sub: '종량 충전형', price: '15,000', unit: '/부터', badge: '', icon: '📱', desc: ['필요한 만큼만 충전', '여권 개통 가능', '기본 요금 15,000원부터'] },
    { id: 3, name: '유학생 PASS팩', sub: '본인인증 완벽 지원', price: '29,700', unit: '/월', badge: '', icon: '🎓', desc: ['외국인등록증(ARC) 필수', '은행 계좌 개설 지원', '토스/배달앱 본인인증'] },
    { id: 4, name: '단기 eSIM', sub: '여행/단기 출장 전용', price: '18,000', unit: '/5일', badge: '', icon: '✈️', desc: ['5일간 데이터 무제한', 'QR코드로 즉시 발송', '물리 유심 교체 불필요'] }
  ]);

  const [internetPlans] = useState([
    { id: 1, carrier: 'KT', title: 'KT 인터넷+TV', badge: 'NO.1', cash: '최대 47만원 현금 지원', desc: '대칭형 기가 인터넷 완벽 지원. 외국인 선호도 최다.' },
    { id: 2, carrier: 'SK', title: 'SK 브로드밴드', badge: 'BEST VALUE', cash: '최대 47만원 현금 지원', desc: 'Btv 다국어 콘텐츠 및 가족 결합 혜택. 최적의 가성비.' },
    { id: 3, carrier: 'LG', title: 'LG U+', badge: 'OTT / IPTV', cash: '최대 47만원 현금 지원', desc: '넷플릭스·디즈니 완벽 연동 IPTV 셋톱박스 기본 탑재.' }
  ]);

  const [rentalPlans] = useState([
    { id: 1, name: '쿠쿠 슬림 정수기 (냉온정)', provider: 'CUCKOO', price: '19,900', unit: '/월', badge: 'BEST', icon: '💧', desc: ['외국인등록증(ARC) 간편 심사', '초기 설치비/등록비 0원 면제', '4개월 주기 필터 무상 교체'] },
    { id: 2, name: '쿠쿠 인앤아웃 비데', provider: 'CUCKOO', price: '13,900', unit: '/월', badge: '위생특화', icon: '🚽', desc: ['전기분해 살균 노즐 탑재', '외국인 원룸/주택 무상 방문 설치', '필터 자가교체 키트 제공'] },
    { id: 3, name: 'LG 퓨리케어 공기청정기', provider: 'LG전자', price: '24,900', unit: '/월', badge: '미세먼지 케어', icon: '🍃', desc: ['원룸/거실 360도 강력 청정', '스마트폰 ThinQ 앱 원격 제어', '정기 방문 클리닝 케어'] }
  ]);

  const [stores] = useState([
    { id: 'cheonan', name: '바다 천안 본점', address: '충남 천안시 동남구 대흥로 (천안역 도보 3분)' },
    { id: 'ansan', name: '바다 안산 다문화거리점', address: '경기 안산시 단원구 원곡동' },
    { id: 'suwon', name: '바다 수원역점', address: '경기 수원시 팔달구 매산로' }
  ]);

  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: '데이터 무제한 30일', deliveryMethod: 'store', pickupStore: 'cheonan' });
  const [internetForm, setInternetForm] = useState({ name: '', phone: '', carrier: 'KT', speed: '500M', address: '' });

  const handleCopyPartnerCode = () => {
    navigator.clipboard.writeText('BADA2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // [1] 구글/위챗 연동 핸들러 (Client ID 있으면 바로 인증 연결, 없으면 "준비 중" 안내)
  const handleSocialAuthClick = (provider) => {
    if (provider === 'google') {
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (googleClientId) {
        // 실제 Client ID가 있으면 공식 구글 로그인 창 호출
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=email%20profile`;
      } else {
        alert('구글 로그인 연동은 현재 준비 중입니다.');
      }
    } else if (provider === 'wechat') {
      const wechatAppId = process.env.NEXT_PUBLIC_WECHAT_APP_ID;
      if (wechatAppId) {
        window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${wechatAppId}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=code&scope=snsapi_login#wechat_redirect`;
      } else {
        alert('위챗 로그인 연동은 현재 준비 중입니다.');
      }
    }
  };

  // [2] 자체 회원가입 처리 (아이디 실시간 중복 체크 & 0000_0000_0001 순차 번호 부여)
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const cleanUsername = regForm.username.trim();

    if (!cleanUsername || cleanUsername.length < 3) {
      setRegError('아이디는 영문/숫자 3자 이상이어야 합니다.');
      return;
    }

    // 아이디 중복 검사
    const isDuplicate = registeredUsers.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (isDuplicate) {
      setRegError('⚠️ 이미 사용 중인 중복된 아이디입니다!');
      return;
    }

    if (!regForm.password || regForm.password.length < 4) {
      setRegError('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    if (!regForm.name.trim() || !regForm.phone.trim()) {
      setRegError('성함과 연락처를 모두 입력해 주세요.');
      return;
    }

    // 순차적 관리번호 생성: 0000_0000_0001
    const nextSeq = String(registeredUsers.length + 1).padStart(12, '0');
    const formattedUserCode = `${nextSeq.slice(0, 4)}_${nextSeq.slice(4, 8)}_${nextSeq.slice(8, 12)}`;

    const newUser = {
      userCode: formattedUserCode,
      username: cleanUsername,
      name: regForm.name.trim(),
      phone: regForm.phone.trim(),
      password: regForm.password,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem('bada_user_db', JSON.stringify(updated));

    // 로그인 처리 (고객 화면에는 아이디와 성함만 전달)
    const sessionUser = {
      userCode: newUser.userCode,
      username: newUser.username,
      name: newUser.name,
      phone: newUser.phone
    };
    setCurrentUser(sessionUser);
    localStorage.setItem('bada_current_login', JSON.stringify(sessionUser));

    // 신청서 폼 자동 완성
    setForm(prev => ({ ...prev, name: sessionUser.name, phone: sessionUser.phone }));
    setInternetForm(prev => ({ ...prev, name: sessionUser.name, phone: sessionUser.phone }));

    setRegError('');
    setShowLoginModal(false);
    alert(`회원가입이 완료되었습니다! 환영합니다, ${sessionUser.username}님.`);
  };

  // [3] 자체 로그인 처리
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanId = loginForm.username.trim().toLowerCase();
    const user = registeredUsers.find(u => u.username.toLowerCase() === cleanId && (!u.password || u.password === loginForm.password));

    if (!user) {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    const sessionUser = {
      userCode: user.userCode,
      username: user.username,
      name: user.name,
      phone: user.phone
    };
    setCurrentUser(sessionUser);
    localStorage.setItem('bada_current_login', JSON.stringify(sessionUser));

    setForm(prev => ({ ...prev, name: sessionUser.name, phone: sessionUser.phone }));
    setInternetForm(prev => ({ ...prev, name: sessionUser.name, phone: sessionUser.phone }));

    setShowLoginModal(false);
    alert(`반갑습니다, ${sessionUser.username}님!`);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bada_current_login');
    alert('로그아웃되었습니다.');
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert('성함과 연락처를 입력해주세요.');
    alert('신청이 정상 접수되었습니다! 담당 직원이 확인 후 안내드립니다.');
    setShowApplyModal(false);
  };

  const handleInternetSubmit = (e) => {
    e.preventDefault();
    if (!internetForm.name || !internetForm.phone) return alert('성함과 연락처를 입력해주세요.');
    alert('인터넷/렌탈 상담 접수가 완료되었습니다! 직원이 빠르게 1:1 상담 안내를 드립니다.');
    setShowInternetModal(false);
  };

  // 고객 메시지 전송
  const handleSendCustomerMessage = (e) => {
    e.preventDefault();
    if (!customerInput.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'customer', text: customerInput.trim(), time: timeStr };
    const updatedMessages = [...liveMessages, newMsg];
    setLiveMessages(updatedMessages);

    try {
      const allChatsStr = localStorage.getItem('bada_live_chat_rooms') || '{}';
      const allChats = JSON.parse(allChatsStr);
      
      const displayName = currentUser ? `${currentUser.username} (${currentUser.name})` : `외국인 고객 (${clientSessionId.slice(-4)})`;
      const displayCode = currentUser ? currentUser.userCode : '비회원';

      allChats[clientSessionId] = {
        sessionId: clientSessionId,
        userName: displayName,
        userCode: displayCode,
        lang: lang,
        lastMessage: customerInput.trim(),
        lastTime: timeStr,
        unreadCount: (allChats[clientSessionId]?.unreadCount || 0) + 1,
        messages: updatedMessages
      };
      localStorage.setItem('bada_live_chat_rooms', JSON.stringify(allChats));
    } catch (err) {
      console.error(err);
    }

    setCustomerInput('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: '18px' }}>B</div>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', color: '#0f172a' }}>BADA</span>
          </div>

          <nav style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>
            <a href="#plans" style={{ textDecoration: 'none', color: 'inherit' }}>{t.nav.plans}</a>
            <a href="#internet" style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 'bold' }}>{t.nav.internet}</a>
            <a href="#rental" style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 'bold' }}>{t.nav.rental}</a>
            <a href="#hanpass" style={{ textDecoration: 'none', color: '#059669', fontWeight: 'bold' }}>{t.nav.hanpass}</a>
            <a href="#delivery" style={{ textDecoration: 'none', color: 'inherit' }}>{t.nav.stores}</a>
            <a href="#faq" style={{ textDecoration: 'none', color: 'inherit' }}>{t.nav.faq}</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* 로그인 상태: 회원번호는 숨기고 [아이디 님]만 노출 */}
            {!currentUser ? (
              <button onClick={() => { setShowLoginModal(true); setAuthTab('login'); }} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '7px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                <span>👤</span> {t.nav.login}
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0369a1', backgroundColor: '#e0f2fe', padding: '5px 12px', borderRadius: '20px' }}>
                  👤 {currentUser.username} 님
                </span>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', fontSize: '12px', color: '#ef4444', cursor: 'pointer', textDecoration: 'underline' }}>{t.nav.logout}</button>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px', backgroundColor: '#fff' }}>
              <span>🌐</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ border: 'none', background: 'transparent', fontSize: '13px', color: '#475569', outline: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>

            <button onClick={() => { setSelectedPlanForModal(simPlans[0]?.name); setShowApplyModal(true); }} style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 6px rgba(2,132,199,0.3)' }}>
              {t.nav.apply}
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
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
            <button onClick={() => { setShowChat(true); setBotMode('staff_chat'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', padding: '13px 22px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.hero.btnChat}
            </button>
          </div>
        </div>
      </section>

      {/* 요금제 섹션 */}
      <section id="plans" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>{t.plansSec.title}</h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{t.plansSec.sub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {simPlans.map((plan) => (
            <div key={plan.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: plan.badge ? '2px solid #0284c7' : '1px solid #e2e8f0', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {plan.badge && (
                <span style={{ position: 'absolute', top: '-11px', right: '20px', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '20px' }}>
                  {plan.badge}
                </span>
              )}
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{plan.icon}</div>
              <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{plan.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px' }}>{plan.sub}</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284c7', marginBottom: '16px' }}>
                ₩ {plan.price} <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>{plan.unit}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
                {plan.desc.map((d, idx) => (<div key={idx}>✓ {d}</div>))}
              </div>
              <button onClick={() => { setSelectedPlanForModal(plan.name); setShowApplyModal(true); }} style={{ width: '100%', padding: '12px', backgroundColor: plan.badge ? '#0284c7' : '#f1f5f9', color: plan.badge ? '#ffffff' : '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
                {t.plansSec.applyBtn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 인터넷 섹션 */}
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
            <button onClick={() => setShowInternetModal(true)} style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 22px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }}>
              {t.internetSec.btnApply}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {internetPlans.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.title}</span>
                  <span style={{ fontSize: '11px', backgroundColor: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{item.badge}</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>{item.cash}</div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 16px 0' }}>{item.desc}</p>
                <button onClick={() => { setInternetForm(prev => ({ ...prev, carrier: item.carrier })); setShowInternetModal(true); }} style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {item.carrier} {t.internetSec.requestBtn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가전/렌탈 섹션 */}
      <section id="rental" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', marginBottom: '8px' }}>
              {t.rentalSec.tag}
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>{t.rentalSec.title}</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{t.rentalSec.sub}</p>
          </div>
          <button onClick={() => setShowInternetModal(true)} style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '12px 22px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            {t.rentalSec.btnApply}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {rentalPlans.map((r) => (
            <div key={r.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px' }}>{r.icon}</span>
                <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px' }}>{r.badge}</span>
              </div>
              <div style={{ fontSize: '17px', fontWeight: 'bold' }}>{r.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>제공사: {r.provider}</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#0284c7', marginBottom: '14px' }}>
                ₩ {r.price} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'normal' }}>{r.unit}</span>
              </div>
              <div style={{ flex: 1, fontSize: '13px', color: '#475569', lineHeight: '1.8', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '18px' }}>
                {r.desc.map((d, i) => (<div key={i}>✓ {d}</div>))}
              </div>
              <button onClick={() => setShowInternetModal(true)} style={{ width: '100%', padding: '10px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                렌탈 상담 신청
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 한패스 섹션 */}
      <section id="hanpass" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px 70px 20px' }}>
        <div style={{ backgroundColor: '#064e3b', color: '#ffffff', borderRadius: '24px', padding: '40px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', color: '#6ee7b7', marginBottom: '14px' }}>
                {t.hanpassSec.badge}
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: '1.3' }}>
                {t.hanpassSec.title1}<br/><span style={{ color: '#34d399' }}>{t.hanpassSec.title2}</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#a7f3d0', lineHeight: '1.6', margin: '0 0 24px 0' }}>{t.hanpassSec.desc}</p>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px dashed #34d399', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '380px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{t.hanpassSec.codeLabel}</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px', color: '#ffffff' }}>BADA2026</div>
                </div>
                <button onClick={handleCopyPartnerCode} style={{ backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {copiedCode ? t.hanpassSec.copied : t.hanpassSec.copy}
                </button>
              </div>
              <a href="https://www.hanpass.com" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
                {t.hanpassSec.btnApp}
              </a>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '14px' }}>{t.hanpassSec.countryTitle}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1fae5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🇨🇳 China</span><span style={{ fontWeight: 'bold', color: '#ffffff' }}>Alipay / WeChat / UnionPay</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🇻🇳 Vietnam</span><span style={{ fontWeight: 'bold', color: '#ffffff' }}>All Banks 24/7 / Cash Pickup</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span>🇵🇭 Philippines</span><span style={{ fontWeight: 'bold', color: '#ffffff' }}>GCash / Banks / Pawnshop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 수령 매장 섹션 */}
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
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#0f172a' }}>{t.deliverySec.storeTitle} ({stores.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {stores.map((s) => (
                <div key={s.id} style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#0284c7' }}>{s.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.address}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section id="faq" style={{ maxWidth: '780px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>❓</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{t.faqSec.title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {t.faqsData.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: '100%', padding: '18px 20px', backgroundColor: '#ffffff', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', fontWeight: 'bold', color: '#1e293b', cursor: 'pointer' }}>
                <span>{faq.q}</span><span style={{ fontSize: '18px', color: '#94a3b8' }}>{openFaq === idx ? '▲' : '▼'}</span>
              </button>
              {openFaq === idx && (<div style={{ padding: '0 20px 18px 20px', fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{faq.a}</div>)}
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', textAlign: 'center', fontSize: '13px', lineHeight: '1.8' }}>
        <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>BADA - 바다 외국인 통신 & 생활 금융 허브</div>
        <div>충남 천안시 동남구 대흥로 (천안 본점) | 온라인 1:1 실시간 상담 상시 지원</div>
        <div style={{ marginTop: '12px', color: '#64748b' }}>공식 파트너십: 백메가(인터넷) · 한패스(해외송금) · 쿠쿠렌탈 | © 2026 BADA. All rights reserved.</div>
      </footer>

      {/* [통합 회원가입 & 로그인 모달] */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '380px', padding: '28px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <button onClick={() => { setShowLoginModal(false); setRegError(''); }} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <button onClick={() => { setAuthTab('login'); setRegError(''); }} style={{ flex: 1, padding: '8px', border: 'none', background: 'none', fontSize: '15px', fontWeight: 'bold', color: authTab === 'login' ? '#0284c7' : '#94a3b8', borderBottom: authTab === 'login' ? '2px solid #0284c7' : 'none', cursor: 'pointer' }}>
                로그인
              </button>
              <button onClick={() => { setAuthTab('register'); setRegError(''); }} style={{ flex: 1, padding: '8px', border: 'none', background: 'none', fontSize: '15px', fontWeight: 'bold', color: authTab === 'register' ? '#0284c7' : '#94a3b8', borderBottom: authTab === 'register' ? '2px solid #0284c7' : 'none', cursor: 'pointer' }}>
                새 계정 만들기
              </button>
            </div>

            {/* 소셜 연동 버튼 (Client ID 대기 중) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              <button type="button" onClick={() => handleSocialAuthClick('google')} style={{ width: '100%', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span>🌐</span> Google로 1초 시작하기
              </button>
              <button type="button" onClick={() => handleSocialAuthClick('wechat')} style={{ width: '100%', padding: '10px', backgroundColor: '#07c160', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span>💬</span> WeChat (微信) 快速登录
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '14px 0', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>또는 자체 계정</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            {/* 탭 1: 자체 로그인 폼 */}
            {authTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="아이디" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
                <input type="password" placeholder="비밀번호" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
                <button type="submit" style={{ padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                  로그인
                </button>
              </form>
            ) : (
              /* 탭 2: 자체 회원가입 폼 (중복 체크 경고 탑재) */
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <input 
                    type="text" 
                    placeholder="사용할 아이디 (영문/숫자)" 
                    value={regForm.username} 
                    onChange={(e) => { setRegForm({ ...regForm, username: e.target.value }); setRegError(''); }} 
                    style={{ width: '100%', padding: '11px', borderRadius: '8px', border: regError.includes('아이디') ? '1.5px solid #ef4444' : '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} 
                    required 
                  />
                  {regError && <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', fontWeight: 'bold' }}>{regError}</div>}
                </div>
                <input type="password" placeholder="비밀번호" value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
                <input type="text" placeholder="여권상 영문 성함 (Name)" value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
                <input type="tel" placeholder="연락처 또는 이메일 (Phone/Email)" value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
                <button type="submit" style={{ padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                  가입 완료하고 시작하기
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 유심 신청 모달 (로그인 정보 자동 완성) */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '460px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>유심 간편 신청서</h3>
            {currentUser && <div style={{ fontSize: '12px', color: '#0284c7', marginBottom: '8px' }}>👤 {currentUser.username} 회원님 정보로 자동 완성되었습니다.</div>}
            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              <input type="text" placeholder="👤 성함 (여권 영문명 / Name) *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="email" placeholder="✉️ 이메일 (Email)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} />
                <input type="tel" placeholder="📞 연락처 (Phone) *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>
              <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}>
                {simPlans.map(p => (<option key={p.id} value={p.name}>{p.name} (₩ {p.price})</option>))}
              </select>
              <button type="submit" style={{ width: '100%', padding: '13px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                신청 완료 (Submit)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 인터넷 모달 */}
      {showInternetModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '440px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowInternetModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>인터넷 & 생활 렌탈 상담 견적</h3>
            <form onSubmit={handleInternetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
              <input type="text" placeholder="성함 (Name) *" value={internetForm.name} onChange={(e) => setInternetForm({ ...internetForm, name: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <input type="tel" placeholder="연락처 (Phone) *" value={internetForm.phone} onChange={(e) => setInternetForm({ ...internetForm, phone: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                {['KT', 'SK', 'LG'].map(carrier => (
                  <button key={carrier} type="button" onClick={() => setInternetForm({ ...internetForm, carrier })} style={{ padding: '9px', borderRadius: '6px', border: internetForm.carrier === carrier ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: internetForm.carrier === carrier ? '#f0f9ff' : '#fff', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>{carrier}</button>
                ))}
              </div>
              <input type="text" placeholder="설치 희망 주소 (Address) *" value={internetForm.address} onChange={(e) => setInternetForm({ ...internetForm, address: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <button type="submit" style={{ padding: '13px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                상담 및 사은품 견적 받기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 실시간 1:1 고객 채팅 모달 */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
        {!showChat ? (
          <button 
            onClick={() => setShowChat(true)} 
            style={{ width: '58px', height: '58px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', fontSize: '26px', boxShadow: '0 6px 20px rgba(2,132,199,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            💬
          </button>
        ) : (
          <div style={{ width: '360px', height: '520px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 12px 35px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            
            <div style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{t.bot.title}</div>
                <div style={{ fontSize: '11px', color: '#bae6fd' }}>
                  {botMode === 'staff_chat' ? (currentUser ? `👤 ${currentUser.username}님 1:1 전담 대화` : '👨‍💼 직원 1:1 실시간 대화 중') : t.bot.subtitle}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {botMode !== 'faq' && (
                  <button onClick={() => setBotMode('faq')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                    메뉴
                  </button>
                )}
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '20px', cursor: 'pointer' }}>×</button>
              </div>
            </div>

            {botMode === 'faq' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', backgroundColor: '#f8fafc' }}>
                <div style={{ padding: '12px 14px', borderRadius: '14px', backgroundColor: '#ffffff', color: '#1e293b', border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {t.bot.welcome}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                  <button onClick={() => { setCurrentTopic('sim'); setBotMode('topic_detail'); }} style={{ padding: '11px 14px', textAlign: 'left', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer' }}>{t.bot.menuSim}</button>
                  <button onClick={() => { setCurrentTopic('internet'); setBotMode('topic_detail'); }} style={{ padding: '11px 14px', textAlign: 'left', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer' }}>{t.bot.menuInternet}</button>
                  <button onClick={() => { setCurrentTopic('rental'); setBotMode('topic_detail'); }} style={{ padding: '11px 14px', textAlign: 'left', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer' }}>{t.bot.menuRental}</button>
                  <button onClick={() => { setCurrentTopic('hanpass'); setBotMode('topic_detail'); }} style={{ padding: '11px 14px', textAlign: 'left', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer' }}>{t.bot.menuHanpass}</button>
                  <button onClick={() => { setCurrentTopic('stores'); setBotMode('topic_detail'); }} style={{ padding: '11px 14px', textAlign: 'left', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer' }}>{t.bot.menuStore}</button>
                  <button onClick={() => setBotMode('staff_chat')} style={{ padding: '12px 14px', textAlign: 'left', backgroundColor: '#0284c7', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', color: '#ffffff', cursor: 'pointer' }}>{t.bot.startStaffChat}</button>
                </div>
              </div>
            )}

            {botMode === 'topic_detail' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', backgroundColor: '#f8fafc' }}>
                <div style={{ padding: '14px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', lineHeight: '1.6' }}>
                  {currentTopic === 'sim' && <div><strong>📶 유심/eSIM 개통</strong><br/><br/>• 여권 또는 외국인등록증(ARC) 5분 개통 지원.<br/>• 외국인등록증 개통 시 은행 계좌 및 PASS 본인인증 지원.</div>}
                  {currentTopic === 'internet' && <div><strong>🌐 초고속 인터넷+TV 사은품</strong><br/><br/>• 외국인 명의도 동일하게 법정 최대 현금 사은품(최대 47만원) 당일 계좌 입금.</div>}
                  {currentTopic === 'rental' && <div><strong>💧 정수기/가전 렌탈</strong><br/><br/>• 등록증 간편 심사, 등록비/설치비 전액 면제 혜택.</div>}
                  {currentTopic === 'hanpass' && <div><strong>💸 한패스 해외송금</strong><br/><br/>• 전용 코드: [BADA2026], 첫 송금 수수료 0원.</div>}
                  {currentTopic === 'stores' && <div><strong>🏬 픽업 매장</strong><br/><br/>📍 천안 본점(천안역 3분), 안산점, 수원역점.</div>}
                </div>
                <button onClick={() => setBotMode('staff_chat')} style={{ padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{t.bot.startStaffChat}</button>
                <button onClick={() => setBotMode('faq')} style={{ padding: '9px', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{t.bot.backToMenu}</button>
              </div>
            )}

            {botMode === 'staff_chat' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', backgroundColor: '#f8fafc' }}>
                  {liveMessages.map((msg, i) => (
                    <div key={i} style={{ alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px', textAlign: msg.sender === 'customer' ? 'right' : 'left' }}>
                        {msg.sender === 'customer' ? (currentUser ? `나 (${currentUser.username})` : '나 (고객)') : '💼 BADA 담당 직원'} · {msg.time}
                      </div>
                      <div style={{ padding: '9px 12px', borderRadius: '12px', backgroundColor: msg.sender === 'customer' ? '#0284c7' : '#ffffff', color: msg.sender === 'customer' ? '#ffffff' : '#1e293b', border: msg.sender === 'customer' ? 'none' : '1px solid #e2e8f0', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendCustomerMessage} style={{ padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px', backgroundColor: '#ffffff' }}>
                  <input 
                    type="text" 
                    placeholder={t.bot.chatInputPlaceholder} 
                    value={customerInput} 
                    onChange={(e) => setCustomerInput(e.target.value)} 
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }} 
                  />
                  <button type="submit" style={{ padding: '9px 14px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {t.bot.send}
                  </button>
                </form>
              </div>
            )}

            <div style={{ padding: '7px 14px', backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>
              온라인 전담 직원이 실시간으로 확인 후 직접 답변을 드립니다.
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
