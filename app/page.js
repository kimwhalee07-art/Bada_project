'use client';
import React, { useState, useEffect } from 'react';

const translations = {
  ko: {
    nav: { plans: '유심 요금제', internet: '인터넷·TV', rental: '가전 렌탈', hanpass: '해외송금', stores: '수령 매장', faq: 'FAQ', login: '로그인', apply: '신청하기', logout: '로그아웃' },
    hero: {
      badge: '⚡ 외국인을 위한 한국 생활 원스톱 통신 & 금융',
      title1: '선불유심부터',
      title2: '초고속 인터넷 & 해외송금',
      title3: '까지',
      desc: '여권/외국인등록증 5분 개통 알뜰폰·통신사 유심, 백메가·위드컴퍼니 제휴 최대 현금 사은품 인터넷 설치, 한패스(HANPASS) 우대 송금 혜택을 바다에서 한 번에 누리세요.',
      btnPlans: '유심 요금제 보기 ↓',
      btnInternet: '인터넷 사은품 확인 🎁',
      btnChat: '1:1 직원 상담 💬',
      badge1Title: '5분 유심 개통', badge1Sub: '알뜰폰 & 통신 3사 / PASS 인증',
      badge2Title: '인터넷 최대 사은품', badge2Sub: '백메가 / 위드컴퍼니 제휴',
      badge3Title: '한패스 해외송금', badge3Sub: '수수료 우대 & 5분 내 송금'
    },
    plansSec: {
      title: 'BADA 안심 유심 요금제',
      sub: '알뜰폰(MVNO) 가성비 플랜부터 통신 3사(MNO) 정규 요금제까지 한눈에 비교',
      filterAll: '전체 요금제',
      filterMvno: '📱 알뜰폰 (MVNO) · 가성비/무약정',
      filterMno: '🏢 통신 3사 (MNO) · 5G/정규망',
      applyBtn: '가입 신청',
      badgeMvno: '알뜰폰',
      badgeMno: '통신 3사'
    },
    internetSec: {
      tag: '🤝 백메가 · 위드컴퍼니 공식 제휴 센터',
      title: '원룸·기숙사·가정용 초고속 인터넷 + TV',
      sub: '통신 3사 및 알뜰 결합 인터넷까지! 외국인 명의로도 동일하게 법정 최대 현금 사은품을 당일 지원합니다.',
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
      { q: "알뜰폰(MVNO)과 통신 3사(MNO)는 어떤 차이가 있나요?", a: "알뜰폰은 통신 3사(KT, SKT, LGU+)의 동일한 통신망을 빌려 서비스하기 때문에 통화 품질과 데이터 속도는 100% 동일하면서 요금은 30~50% 훨씬 저렴합니다. 약정이 없어 외국인 분들이 언제든 부담 없이 개통 및 해지할 수 있습니다. 반면 통신 3사는 최신 휴대폰 기기 할부 구매나 멤버십 할인이 필요하신 분께 적합합니다." },
      { q: "여권만으로도 알뜰폰 개통이 가능한가요?", a: "네! 바다에서는 여권만으로도 당일 5분 즉시 개통 가능한 알뜰폰 선불 요금제와 데이터 무제한 요금제를 다양하게 지원합니다. 추후 외국인등록증이 발급되면 본인 명의로 손쉽게 전환하실 수 있습니다." },
      { q: "인터넷 설치 시 외국인도 현금 사은품을 받을 수 있나요?", a: "네, 전액 동일하게 지급됩니다! 바다는 백메가 공식 제휴로 KT, SK, LG 및 알뜰인터넷 설치 시 법정 최대 사은품을 당일 입금해 드립니다." },
      { q: "한패스(HANPASS) 송금 수수료 할인은 어떻게 받나요?", a: "프로모션 코드 BADA2026을 입력하고 가입하시면 첫 송금 수수료 무료 쿠폰이 즉시 발급됩니다." },
      { q: "정수기 렌탈도 외국인 명의로 가능한가요?", a: "네, 외국인등록증(ARC) 소지자라면 신용카드나 통장 자동이체 등록을 통해 내국인과 동일하게 렌탈하실 수 있습니다." }
    ],
    bot: {
      title: 'BADA 1:1 고객센터',
      subtitle: '실시간 FAQ & 직원 대화 연결',
      welcome: '안녕하세요! 바다(BADA) 공식 상담 센터입니다.\n알뜰폰·통신 3사 유심, 인터넷, 렌탈 등 원하시는 문의 항목을 선택하시거나 직원과 1:1 대화를 시작해 보세요.',
      backToMenu: '↩ 이전 질문 목록으로',
      startStaffChat: '💬 전담 직원과 1:1 실시간 대화하기',
      chatInputPlaceholder: '직원에게 문의할 내용을 입력하세요...',
      send: '전송',
      menuSim: '📱 알뜰폰 / 통신사 유심 (여권·등록증)',
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
    nav: { plans: 'SIM Plans', internet: 'Internet & TV', rental: 'Appliance Rental', hanpass: 'Remittance', stores: 'Stores', faq: 'FAQ', login: 'Login', apply: 'Apply Now', logout: 'Logout' },
    hero: {
      badge: '⚡ One-stop Telecom & Finance for Foreigners in Korea',
      title1: 'From Prepaid SIM to',
      title2: 'High-speed Internet & Remittance',
      title3: '',
      desc: 'Get your Budget Phone (MVNO) or Major Carrier SIM activated in 5 mins with Passport/ARC, receive maximum cash gifts for home internet, and enjoy special discount fees with HANPASS remittance.',
      btnPlans: 'View SIM Plans ↓',
      btnInternet: 'Internet Cash Gift 🎁',
      btnChat: '1:1 Live Support 💬',
      badge1Title: '5-Min Activation', badge1Sub: 'Budget SIM & Major Carriers / PASS ID',
      badge2Title: 'Max Cash Gift', badge2Sub: 'Official 100Mega Partner',
      badge3Title: 'Fast Remittance', badge3Sub: 'Zero fee event & 5-min transfer'
    },
    plansSec: {
      title: 'BADA Safe SIM Plans',
      sub: 'Compare Budget Phone (MVNO) with no contract vs Major Carriers (MNO)',
      filterAll: 'All Plans',
      filterMvno: '📱 Budget Phone (MVNO) · Low Cost/No Contract',
      filterMno: '🏢 Major Carriers (MNO) · 5G/Major Network',
      applyBtn: 'Apply Now',
      badgeMvno: 'MVNO',
      badgeMno: 'Major MNO'
    },
    internetSec: {
      tag: '🤝 Official Partner: 100Mega & WithCompany',
      title: 'High-speed Internet & TV for Studio & Dorm',
      sub: 'KT, SK, LG, and Budget Internet. Foreign residents receive maximum legal cash gifts upon installation.',
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
      { q: "What is the difference between Budget Phone (MVNO) and Major Carriers (MNO)?", a: "Budget Phone (MVNO) rents networks from KT, SKT, and LG U+, providing the exact same coverage and speed at 30-50% lower prices with NO contract locks. Major Carriers (MNO) offer smartphone installments and loyalty membership points." },
      { q: "Can I activate a Budget Phone with just a passport?", a: "Yes! BADA provides instant 5-minute activation for prepaid and unlimited data MVNO plans with just your passport." },
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
      menuSim: '📱 Budget Phone & Major Carrier SIM',
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
    nav: { plans: '电话卡套餐', internet: '宽带·电视', rental: '家电租赁', hanpass: '跨境汇款', stores: '自提门店', faq: '常见问题', login: '登录', apply: '立即申请', logout: '退出登录' },
    hero: {
      badge: '⚡ 专为在韩外国人打造的一站式通信与金融服务',
      title1: '从预付费电话卡到',
      title2: '高速宽带与海外汇款',
      title3: '全搞定',
      desc: '支持护照/登录证5分钟办理廉价卡(MVNO)与三大运营商SIM卡，办理宽带享最高现金补贴，使用汉游(HANPASS)专享汇款优惠。',
      btnPlans: '查看电话卡套餐 ↓',
      btnInternet: '查看宽带现金补贴 🎁',
      btnChat: '人工1:1在线咨询 💬',
      badge1Title: '5分钟快速开通', badge1Sub: '廉价卡/三大运营商 · PASS实名认证',
      badge2Title: '最高现金补贴', badge2Sub: '官方合作正规渠道',
      badge3Title: '安全海外汇款', badge3Sub: '专享0手续费 & 5分钟到账'
    },
    plansSec: {
      title: 'BADA 放心电话卡套餐',
      sub: '高性价比无合约廉价手机卡(MVNO)与三大电信正规套餐一站式对比',
      filterAll: '全部套餐',
      filterMvno: '📱 廉价手机卡 (MVNO) · 超高性价比/无合约',
      filterMno: '🏢 三大电信 (MNO) · 5G正规网/分期购机',
      applyBtn: '立即申请',
      badgeMvno: '廉价卡',
      badgeMno: '三大电信'
    },
    internetSec: {
      tag: '🤝 韩国电信官方授权合作中心',
      title: '单间/宿舍/家庭 高速宽带 + 电视',
      sub: '支持三大运营商及低价结合宽带。外国人名义同享最高法定现金补贴，开通当天直接转账。',
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
      { q: "廉价手机卡(MVNO)与韩国三大电信(KT/SK/LG)有什么区别？", a: "廉价卡使用的是三大电信完全相同的基站网络，信号和网络速度100%相同，但费用便宜30~50%，且无需绑定2年合约，外国人可随时开通或注销。三大电信则适合需要分期购买最新手机的用户。" },
      { q: "仅凭护照可以开通廉价手机卡吗？", a: "可以！BADA提供仅需护照即可当天5分钟开通的廉价卡预付费套餐与无限流量套餐。" },
      { q: "外国人装宽带也能领现金补贴吗？", a: "完全可以，金额全额一致！安装当天现金直接转账。" },
      { q: "使用Hanpass汇款手续费是多少？", a: "输入BADA专属优惠码(BADA2026)，首笔汇款免手续费。" },
      { q: "外国人可以办理净水器租赁吗？", a: "持登录证即可申请，绑定银行账户自动扣款，享受免费滤芯更换。" }
    ],
    bot: {
      title: 'BADA 1:1 客户服务中心',
      subtitle: '快速问答与人工一对一直连',
      welcome: '您好！欢迎使用BADA客户支持中心。\n请选择下方电话卡、宽带、租赁等常见咨询，或直接与工作人员进行1:1在线交流。',
      backToMenu: '↩ 返回上一级',
      startStaffChat: '💬 与工作人员进行1:1实时聊天',
      chatInputPlaceholder: '请输入您想咨询工作人员的内容...',
      send: '发送',
      menuSim: '📱 廉价卡/三大电信电话卡办理',
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
    nav: { plans: 'Gói Cước SIM', internet: 'Internet & TV', rental: 'Thuê Thiết Bị', hanpass: 'Chuyển Tiền', stores: 'Cửa Hàng', faq: 'FAQ', login: 'Đăng nhập', apply: 'Đăng Ký', logout: 'Đăng xuất' },
    hero: {
      badge: '⚡ Dịch vụ Viễn thông & Tài chính Trọn gói cho Người nước ngoài tại Hàn Quốc',
      title1: 'Từ SIM Trả Trước đến',
      title2: 'Internet Cáp Quang & Chuyển Tiền',
      title3: 'Trọn Gói',
      desc: 'Kích hoạt SIM giá rẻ (MVNO) & 3 nhà mạng lớn trong 5 phút bằng Hộ chiếu/ARC, nhận quà tiền mặt tối đa khi lắp Wi-Fi, ưu đãi chuyển tiền qua HANPASS.',
      btnPlans: 'Xem Gói SIM ↓',
      btnInternet: 'Nhận Quà Lắp Mạng 🎁',
      btnChat: 'Tư Vấn Trực Tiếp 💬',
      badge1Title: 'Kích hoạt trong 5 phút', badge1Sub: 'SIM Giá Rẻ & 3 Nhà Mạng / Xác thực PASS',
      badge2Title: 'Quà tiền mặt tối đa', badge2Sub: 'Đối tác chính thức 100Mega',
      badge3Title: 'Chuyển tiền Hanpass', badge3Sub: 'Miễn phí chuyển & Nhận sau 5 phút'
    },
    plansSec: {
      title: 'Gói Cước SIM BADA An Tâm',
      sub: 'So sánh SIM Giá Rẻ (MVNO) không ràng buộc cước với 3 Nhà Mạng Lớn (MNO)',
      filterAll: 'Tất cả gói',
      filterMvno: '📱 SIM Giá Rẻ (MVNO) · Tiết kiệm / Không ràng buộc',
      filterMno: '🏢 3 Nhà Mạng Lớn (MNO) · 5G / Mạng chính thức',
      applyBtn: 'Đăng Ký',
      badgeMvno: 'SIM Giá Rẻ',
      badgeMno: '3 Nhà Mạng'
    },
    internetSec: {
      tag: '🤝 Trung tâm Đối tác Chính thức 100Mega & WithCompany',
      title: 'Internet Tốc Độ Cao & TV cho Phòng Trọ / Ký Túc Xá',
      sub: 'Hỗ trợ KT, SK, LG và Internet tiết kiệm. Nhận 100% quà tiền mặt tối đa theo quy định vào ngày lắp đặt.',
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
      storeTitle: '📍 Cửa hàng nhận SIM trong ngày'
    },
    faqSec: { title: 'Câu hỏi thường gặp' },
    faqsData: [
      { q: "SIM Giá Rẻ (MVNO) khác gì so với 3 Nhà Mạng Lớn (KT/SK/LG)?", a: "SIM Giá Rẻ (MVNO) thuê lại cùng hạ tầng trạm phát sóng của 3 nhà mạng lớn nên tốc độ mạng và sóng khỏe 100% như nhau, nhưng cước phí rẻ hơn từ 30~50% và hoàn toàn KHÔNG ràng buộc hợp đồng 2 năm. 3 nhà mạng lớn phù hợp với khách hàng muốn mua máy trả góp." },
      { q: "Chỉ có Hộ chiếu có đăng ký được SIM Giá Rẻ không?", a: "Có! Tại BADA, bạn có thể đăng ký SIM trả trước hoặc không giới hạn dung lượng trong 5 phút chỉ với Hộ chiếu bản gốc." },
      { q: "Người nước ngoài lắp mạng có nhận được quà tiền mặt không?", a: "Có, hoàn toàn tương đương người Hàn! Tiền quà tặng sẽ được chuyển khoản trực tiếp vào tài khoản ngân hàng của bạn trong ngày lắp đặt." },
      { q: "Làm thế nào để nhận ưu đãi phí chuyển tiền HANPASS?", a: "Nhập mã khuyến mãi BADA2026 khi đăng ký để nhận ngay coupon miễn phí 0 won cho lần chuyển tiền đầu tiên." },
      { q: "Người nước ngoài có thuê máy lọc nước được không?", a: "Có, người có thẻ cư trú ARC chỉ cần đăng ký trừ tiền tự động qua thẻ hoặc tài khoản là có thể thuê dễ dàng." }
    ],
    bot: {
      title: 'BADA 1:1 Hỗ Trợ Khách Hàng',
      subtitle: 'Hỏi đáp tức thì & Chat trực tiếp',
      welcome: 'Xin chào! Chào mừng bạn đến với trung tâm hỗ trợ BADA.\nHãy chọn chủ đề bên dưới hoặc chat 1:1 trực tiếp với nhân viên hỗ trợ.',
      backToMenu: '↩ Quay lại danh mục',
      startStaffChat: '💬 Chat 1:1 với nhân viên tư vấn',
      chatInputPlaceholder: 'Nhập tin nhắn cho nhân viên...',
      send: 'Gửi',
      menuSim: '📱 SIM Giá Rẻ MVNO & 3 Nhà Mạng',
      menuInternet: '🌐 Quà tặng Lắp Mạng (Tối đa 470.000W)',
      menuRental: '💧 Thuê máy lọc nước (Duyệt nhanh ARC)',
      menuHanpass: '💸 Mã giảm phí 0 won Hanpass',
      menuStore: '🏬 Địa chỉ cửa hàng nhận SIM',
      openSimBtn: '📝 Mở đơn đăng ký SIM ngay',
      openInternetBtn: '🎁 Yêu cầu báo giá Lắp Mạng',
      openRentalBtn: '💧 Đăng ký tư vấn thuê máy',
      copyCodeBtn: '📋 Sao chép mã giới thiệu'
    }
  }
};

export default function BadaPage() {
  const [lang, setLang] = useState('ko');
  const t = translations[lang] || translations.ko;

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showInternetModal, setShowInternetModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenuModal, setShowUserMenuModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // 요금제 탭 필터 ('all' | 'mvno' | 'mno')
  const [planFilter, setPlanFilter] = useState('all');

  const [openFaq, setOpenFaq] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // 회원 상태
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // 로그인/회원가입 탭
  const [authTab, setAuthTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [regForm, setRegForm] = useState({ username: '', password: '', name: '', email: '' });
  const [regError, setRegError] = useState('');

  // 1:1 라이브 채팅
  const [botMode, setBotMode] = useState('faq');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [liveMessages, setLiveMessages] = useState([
    { sender: 'staff', text: '안녕하세요! BADA 전담 직원입니다. 알뜰폰 요금제, 인터넷 사은품 등 무엇이든 편하게 물어보세요!', time: '방금' }
  ]);
  const [customerInput, setCustomerInput] = useState('');
  const [clientSessionId, setClientSessionId] = useState('');

  // DB 및 세션 초기화
  useEffect(() => {
    const storedUsers = localStorage.getItem('bada_user_db');
    if (storedUsers) {
      try {
        setRegisteredUsers(JSON.parse(storedUsers));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialUsers = [
        { userCode: '0000_0000_0001', username: 'alex99', name: 'NGUYEN VAN A', email: 'alex@gmail.com', createdAt: '2026-09-10' },
        { userCode: '0000_0000_0002', username: 'zhangwei', name: 'ZHANG WEI', email: 'zhang@qq.com', createdAt: '2026-09-11' }
      ];
      localStorage.setItem('bada_user_db', JSON.stringify(initialUsers));
      setRegisteredUsers(initialUsers);
    }

    const currentLogin = localStorage.getItem('bada_current_login');
    if (currentLogin) {
      try {
        const u = JSON.parse(currentLogin);
        setCurrentUser(u);
        setForm(prev => ({ ...prev, name: u.name, email: u.email }));
        setInternetForm(prev => ({ ...prev, name: u.name }));
      } catch (e) {
        console.error(e);
      }
    }

    let sid = localStorage.getItem('bada_user_sid');
    if (!sid) {
      sid = 'customer_' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem('bada_user_sid', sid);
    }
    setClientSessionId(sid);

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

  // [확장된 요금제 목록]: 알뜰폰(MVNO) + 통신 3사(MNO)
  const [simPlans] = useState([
    {
      id: 1,
      category: 'mvno',
      telecomName: '알뜰폰 KT망',
      name: '데이터 무제한 30일 (KT망)',
      sub: '데이터와 통화를 마음껏 · 무약정',
      price: '39,600',
      unit: '/월',
      badge: 'BEST 알뜰폰',
      icon: '📶',
      desc: ['알뜰폰 KT망 / 무제한 데이터 (11GB + 일2GB 후 3Mbps)', '통화/문자 무제한 · 위약금 없는 무약정', '여권 또는 외국인등록증 당일 5분 개통']
    },
    {
      id: 2,
      category: 'mvno',
      telecomName: '알뜰폰 LG U+망',
      name: '실속 가성비 15GB+ (LG U+망)',
      sub: '유학생·원룸 거주자 강력 추천',
      price: '24,900',
      unit: '/월',
      badge: '가성비 1등',
      icon: '⚡',
      desc: ['알뜰폰 LG U+망 / 기본 15GB + 3Mbps 무제한', '통화 100분 · 문자 100건 기본 제공', '약정 없이 자유롭게 이용 및 해지 가능']
    },
    {
      id: 3,
      category: 'mvno',
      telecomName: '알뜰폰 선불',
      name: '실속형 알뜰 선불폰',
      sub: '종량 충전형 · 기본료 최저',
      price: '15,000',
      unit: '/부터',
      badge: '초기정착추천',
      icon: '📱',
      desc: ['필요한 금액만 충전해서 쓰는 실속 선불 알뜰폰', '여권만으로 5분 즉시 개통', '초기 유학/취업 입국 직후 강력 추천']
    },
    {
      id: 4,
      category: 'mno',
      telecomName: '통신 3사 KT',
      name: 'KT 5G 슬림 베이직',
      sub: '통신 3사 정규 5G 고속망',
      price: '55,000',
      unit: '/월',
      badge: 'KT 정규망',
      icon: '🚀',
      desc: ['KT 정규 5G 고속 회선 개통', 'PASS 본인인증 100% 보장 · 은행 계좌 즉시 개설', '스마트폰 기기 할부 결합 및 약정 할인 적용']
    },
    {
      id: 5,
      category: 'mno',
      telecomName: '통신 3사 SKT',
      name: 'SKT 유학생 PASS 안심팩',
      sub: '외국인등록증 본인인증 전용 회선',
      price: '29,700',
      unit: '/월',
      badge: '인증 특화',
      icon: '🎓',
      desc: ['SK Telecom 정규 회선 개통', '외국인등록증(ARC) 필수 · 토스/배달앱/금융 인증 지원', 'SKT 멤버십 혜택 및 전국 공식 대리점 AS 지원']
    },
    {
      id: 6,
      category: 'mvno',
      telecomName: '알뜰폰 eSIM',
      name: '단기 여행/출장 eSIM 5일',
      sub: '여행 / 단기 체류 전용 QR 발급',
      price: '18,000',
      unit: '/5일',
      badge: 'QR즉시발급',
      icon: '✈️',
      desc: ['5일간 매일 데이터 무제한 이용', 'QR코드로 이메일/메신저 즉시 전송', '물리 유심 교체 필요 없는 간편 eSIM']
    }
  ]);

  const [internetPlans] = useState([
    { id: 1, carrier: 'KT', title: 'KT 인터넷+TV', badge: 'NO.1', cash: '최대 47만원 현금 지원', desc: '대칭형 기가 인터넷 완벽 지원. 외국인 선호도 최다.' },
    { id: 2, carrier: 'SK', title: 'SK 브로드밴드', badge: 'BEST VALUE', cash: '최대 47만원 현금 지원', desc: 'Btv 다국어 콘텐츠 및 가족 결합 혜택. 최적의 가성비.' },
    { id: 3, carrier: 'LG', title: 'LG U+', badge: 'OTT / IPTV', cash: '최대 47만원 현금 지원', desc: '넷플릭스·디즈니 완벽 연동 IPTV 셋톱박스 기본 탑재.' },
    { id: 4, carrier: '알뜰인터넷', title: '알뜰인터넷 (스카이라이프/헬로비전)', badge: '초저가 결합', cash: '최대 35만원 현금 지원', desc: '알뜰폰과 결합 시 월 요금 1만원대! 원룸 거주 외국인에게 가장 경제적인 선택.' }
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

  // [신청 폼 상태]: 알뜰폰/통신사 선택 및 통신망, 가입방식 추가
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    telecomCategory: 'mvno', // 'mvno' (알뜰폰) | 'mno' (통신 3사)
    carrier: 'KT망 알뜰폰',
    subType: 'new', // 'new' (신규가입) | 'port_in' (번호이동)
    plan: '데이터 무제한 30일 (KT망)',
    deliveryMethod: 'store', // 'store' | 'delivery' | 'esim'
    pickupStore: 'cheonan'
  });

  const [internetForm, setInternetForm] = useState({
    name: '',
    phone: '',
    carrier: 'KT',
    speed: '500M',
    address: ''
  });

  const handleCopyPartnerCode = () => {
    navigator.clipboard.writeText('BADA2026');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 공식 메일 발송 헬퍼 함수
  const triggerAutoEmail = async (toEmail, subject, htmlContent, type) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: toEmail,
          subject: subject,
          html: htmlContent,
          type: type
        })
      });
    } catch (e) {
      console.warn('Auto email trigger failed', e);
    }
  };

  // 소셜 로그인 클릭
  const handleSocialAuthClick = (provider) => {
    if (provider === 'google') {
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (googleClientId) {
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

  // 회원가입
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = regForm.username.trim();

    if (!cleanUsername || cleanUsername.length < 3) {
      setRegError('아이디는 영문/숫자 3자 이상이어야 합니다.');
      return;
    }

    const isDuplicate = registeredUsers.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (isDuplicate) {
      setRegError('이미 사용 중인 중복된 아이디입니다. 다른 아이디를 입력해 주세요.');
      return;
    }

    const nextNumber = registeredUsers.length + 1;
    const formattedCode = `0000_0000_${String(nextNumber).padStart(4, '0')}`;

    const newUser = {
      userCode: formattedCode,
      username: cleanUsername,
      password: regForm.password,
      name: regForm.name.trim() || cleanUsername,
      email: regForm.email.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    localStorage.setItem('bada_user_db', JSON.stringify(updated));

    const sessionUser = {
      userCode: newUser.userCode,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email
    };
    setCurrentUser(sessionUser);
    localStorage.setItem('bada_current_login', JSON.stringify(sessionUser));

    setForm(prev => ({ ...prev, name: sessionUser.name, email: sessionUser.email }));
    setInternetForm(prev => ({ ...prev, name: sessionUser.name }));

    // 가입 환영 메일 발송
    triggerAutoEmail(
      newUser.email,
      `[BADA] ${newUser.name}님, 바다(BADA) 회원가입을 환영합니다!`,
      `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #1e293b;">
          <h2 style="color: #0284c7;">BADA - 외국인 원스톱 통신 & 생활금융</h2>
          <p>안녕하세요, <strong>${newUser.name}</strong>님!</p>
          <p>바다 플랫폼 회원가입이 성공적으로 완료되었습니다.</p>
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>회원 아이디:</strong> ${newUser.username}</p>
            <p style="margin: 6px 0 0 0;"><strong>등록 이메일:</strong> ${newUser.email}</p>
          </div>
          <p>🎁 <strong>회원가입 기념 특별 혜택:</strong></p>
          <p>한패스(HANPASS) 해외송금 앱에서 추천인 코드 <strong>[BADA2026]</strong>을 입력하시면 첫 송금 수수료 0원 무료 쿠폰이 지급됩니다.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">본 메일은 발신 전용 메일입니다. 문의사항은 웹사이트 실시간 1:1 상담을 이용해 주세요. | bada@badahub.co.kr</p>
        </div>
      `,
      'welcome'
    );

    setRegError('');
    setShowLoginModal(false);
    alert(`회원가입이 완료되었습니다!\n${newUser.email} 주소로 가입 환영 안내 메일이 발송되었습니다.`);
  };

  // 로그인
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
      email: user.email
    };
    setCurrentUser(sessionUser);
    localStorage.setItem('bada_current_login', JSON.stringify(sessionUser));

    setForm(prev => ({ ...prev, name: sessionUser.name, email: sessionUser.email }));
    setInternetForm(prev => ({ ...prev, name: sessionUser.name }));

    setShowLoginModal(false);
    alert(`반갑습니다, ${sessionUser.username}님!`);
  };

  // 로그아웃
  const handleLogout = () => {
    setCurrentUser(null);
    setShowUserMenuModal(false);
    localStorage.removeItem('bada_current_login');
    alert('로그아웃되었습니다.');
  };

  // 회원탈퇴
  const handleDeleteAccount = () => {
    if (!currentUser) return;
    if (confirm('정말로 회원 탈퇴를 진행하시겠습니까?\n등록된 계정 및 상담 데이터가 영구히 삭제됩니다.')) {
      const updated = registeredUsers.filter(u => u.username !== currentUser.username);
      setRegisteredUsers(updated);
      localStorage.setItem('bada_user_db', JSON.stringify(updated));

      setCurrentUser(null);
      setShowUserMenuModal(false);
      localStorage.removeItem('bada_current_login');
      alert('회원 탈퇴가 정상 처리되었습니다. 그동안 이용해 주셔서 감사합니다.');
    }
  };

  // 요금제 카드에서 가입신청 클릭 시
  const handleOpenApplyModalWithPlan = (planItem) => {
    setForm(prev => ({
      ...prev,
      telecomCategory: planItem.category || 'mvno',
      carrier: planItem.telecomName || (planItem.category === 'mvno' ? 'KT망 알뜰폰' : 'KT'),
      plan: planItem.name
    }));
    setShowApplyModal(true);
  };

  // 유심 신청 제출 (알뜰폰 / 통신사 정보 포함 이메일 발송 + 실시간 주문 저장)
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert('성함과 연락처를 입력해주세요.');

    const targetEmail = form.email || (currentUser && currentUser.email);
    const telecomTypeName = form.telecomCategory === 'mvno' ? '알뜰폰 (MVNO)' : '통신 3사 (MNO)';
    const subTypeName = form.subType === 'new' ? '신규가입' : '번호이동 (쓰던 번호 유지)';
    const deliveryMethodName = form.deliveryMethod === 'store' ? '바다 천안 본점 방문 픽업' : form.deliveryMethod === 'delivery' ? '전국 무료 택배 배송' : 'eSIM 즉시 발급 (QR 전송)';

    // 1. 주문 데이터 관리자 연동
    const newOrder = {
      id: Date.now(),
      type: 'SIM',
      telecomCategory: form.telecomCategory,
      carrier: form.carrier,
      subType: subTypeName,
      name: form.name,
      phone: form.phone,
      email: targetEmail || '-',
      detail: `[${telecomTypeName} · ${form.carrier}] ${form.plan} (${subTypeName}, ${deliveryMethodName})`,
      time: '방금 전'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bada_live_orders') || '[]');
      localStorage.setItem('bada_live_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error(err);
    }

    // 2. 확인 이메일 발송
    if (targetEmail) {
      triggerAutoEmail(
        targetEmail,
        `[BADA] ${form.name}님의 [${telecomTypeName}] 유심 신청이 정상 접수되었습니다.`,
        `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #1e293b;">
            <h2 style="color: #0284c7;">BADA 유심 신청 접수 확인서</h2>
            <p><strong>${form.name}</strong> 고객님, 신청이 정상적으로 접수되었습니다.</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>통신 구분:</strong> ${telecomTypeName}</p>
              <p style="margin: 4px 0;"><strong>선택 통신망:</strong> ${form.carrier}</p>
              <p style="margin: 4px 0;"><strong>신청 요금제:</strong> ${form.plan}</p>
              <p style="margin: 4px 0;"><strong>가입 유형:</strong> ${subTypeName}</p>
              <p style="margin: 4px 0;"><strong>연락처:</strong> ${form.phone}</p>
              <p style="margin: 4px 0;"><strong>수령 방식:</strong> ${deliveryMethodName}</p>
            </div>
            <p>📍 <strong>천안 본점 위치:</strong> 충남 천안시 동남구 대흥로 (천안역 도보 3분)</p>
            <p>매장 방문 또는 택배 수령 시 여권 또는 외국인등록증 실물을 꼭 확인해 주세요.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8;">BADA 공식 고객센터 | bada@badahub.co.kr</p>
          </div>
        `,
        'sim_order'
      );
    }

    alert(`신청이 정상 접수되었습니다!\n[${telecomTypeName} - ${form.carrier}]\n${targetEmail ? `${targetEmail} 주소로 접수 확인서가 발송되었습니다.` : '담당 직원이 곧 연락드립니다.'}`);
    setShowApplyModal(false);
  };

  // 인터넷 상담 신청
  const handleInternetSubmit = (e) => {
    e.preventDefault();
    if (!internetForm.name || !internetForm.phone) return alert('성함과 연락처를 입력해주세요.');

    const newOrder = {
      id: Date.now(),
      type: 'INTERNET',
      telecomCategory: internetForm.carrier === '알뜰인터넷' ? 'MVNO' : 'MNO',
      carrier: internetForm.carrier,
      subType: '인터넷+TV 신규설치',
      name: internetForm.name,
      phone: internetForm.phone,
      email: currentUser ? currentUser.email : '-',
      detail: `${internetForm.carrier} 인터넷+TV 상담 신청 (주소: ${internetForm.address})`,
      time: '방금 전'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bada_live_orders') || '[]');
      localStorage.setItem('bada_live_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error(err);
    }

    alert('인터넷/렌탈 상담 접수가 완료되었습니다! 직원이 최대 사은품 혜택과 함께 1:1 상담 안내를 드립니다.');
    setShowInternetModal(false);
  };

  // 1:1 채팅 메시지 전송
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

  // 메인 화면 요금제 필터링
  const displayedPlans = simPlans.filter(plan => {
    if (planFilter === 'all') return true;
    return plan.category === planFilter;
  });

  // 신청 모달용 통신 유형에 따른 요금제 목록 필터
  const modalPlans = simPlans.filter(p => p.category === form.telecomCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* 상단 네비게이션 (절대 2줄 줄바꿈 방지 & 1줄 고정) */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 40, padding: '0 24px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* 좌측 로고 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{ width: '38px', height: '38px', backgroundColor: '#0284c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '900', fontSize: '20px' }}>
              B
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#0284c7', letterSpacing: '-0.5px', lineHeight: '1.1' }}>BADA</div>
              <div style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap' }}>FOREIGNER ONE-STOP</div>
            </div>
          </div>

          {/* 중앙 네비게이션 메뉴 (whiteSpace: 'nowrap' & flexShrink: 0 고정) */}
          <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: '700', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <a href="#plans" style={{ color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.nav.plans}</a>
            <a href="#internet" style={{ color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.nav.internet}</a>
            <a href="#rental" style={{ color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.nav.rental}</a>
            <a href="#hanpass" style={{ color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.nav.hanpass}</a>
            <a href="#delivery" style={{ color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.nav.stores}</a>
            <a href="#faq" style={{ color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.nav.faq}</a>
          </nav>

          {/* 우측 언어팩 & 로그인/신청 (whiteSpace: 'nowrap' & flexShrink: 0 고정) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, whiteSpace: 'nowrap' }}>
            <div style={{ display: 'flex', gap: '3px', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px', flexShrink: 0 }}>
              {[
                { code: 'ko', label: '한국어' },
                { code: 'en', label: 'ENG' },
                { code: 'zh', label: '中文' },
                { code: 'vi', label: 'Tiếng Việt' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: lang === item.code ? '#ffffff' : 'transparent',
                    color: lang === item.code ? '#0284c7' : '#64748b',
                    fontWeight: lang === item.code ? 'bold' : 'normal',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    boxShadow: lang === item.code ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {currentUser ? (
              <button
                onClick={() => setShowUserMenuModal(true)}
                style={{ backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                <span>👤 {currentUser.username} 님</span>
                <span style={{ fontSize: '10px', color: '#16a34a' }}>▾</span>
              </button>
            ) : (
              <button
                onClick={() => { setAuthTab('login'); setShowLoginModal(true); }}
                style={{ backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                👤 {t.nav.login}
              </button>
            )}

            <button
              onClick={() => {
                setForm(prev => ({ ...prev, telecomCategory: 'mvno', carrier: 'KT망 알뜰폰', plan: '데이터 무제한 30일 (KT망)' }));
                setShowApplyModal(true);
              }}
              style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              {t.nav.apply}
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section style={{ background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)', padding: '70px 20px 60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            {t.hero.badge}
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: '900', lineHeight: '1.25', margin: '0 0 16px 0', color: '#0f172a', letterSpacing: '-1px' }}>
            {t.hero.title1} <span style={{ color: '#0284c7' }}>{t.hero.title2}</span>{t.hero.title3}
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            {t.hero.desc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#plans" style={{ backgroundColor: '#0284c7', color: '#ffffff', padding: '14px 26px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 14px rgba(2,132,199,0.3)' }}>
              {t.hero.btnPlans}
            </a>
            <a href="#internet" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '14px 26px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none' }}>
              {t.hero.btnInternet}
            </a>
            <button onClick={() => setShowChat(true)} style={{ backgroundColor: '#ffffff', color: '#0284c7', border: '1px solid #bae6fd', padding: '14px 24px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.hero.btnChat}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '48px', textAlign: 'left' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>{t.hero.badge1Title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{t.hero.badge1Sub}</div>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎁</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>{t.hero.badge2Title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{t.hero.badge2Sub}</div>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>💸</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>{t.hero.badge3Title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{t.hero.badge3Sub}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 요금제 섹션 (알뜰폰 / 통신 3사 탭 필터링 탑재) */}
      <section id="plans" style={{ maxWidth: '1140px', margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '30px', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>{t.plansSec.title}</h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>{t.plansSec.sub}</p>
          </div>
          <button
            onClick={() => {
              setForm(prev => ({ ...prev, telecomCategory: 'mvno', carrier: 'KT망 알뜰폰', plan: '데이터 무제한 30일 (KT망)' }));
              setShowApplyModal(true);
            }}
            style={{ backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ✍️ {t.nav.apply}
          </button>
        </div>

        {/* 요금제 카테고리 필터 탭 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPlanFilter('all')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: planFilter === 'all' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              backgroundColor: planFilter === 'all' ? '#f0f9ff' : '#ffffff',
              color: planFilter === 'all' ? '#0284c7' : '#475569',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {t.plansSec.filterAll}
          </button>
          <button
            onClick={() => setPlanFilter('mvno')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: planFilter === 'mvno' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              backgroundColor: planFilter === 'mvno' ? '#f0f9ff' : '#ffffff',
              color: planFilter === 'mvno' ? '#0284c7' : '#475569',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {t.plansSec.filterMvno}
          </button>
          <button
            onClick={() => setPlanFilter('mno')}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: planFilter === 'mno' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              backgroundColor: planFilter === 'mno' ? '#f0f9ff' : '#ffffff',
              color: planFilter === 'mno' ? '#0284c7' : '#475569',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {t.plansSec.filterMno}
          </button>
        </div>

        {/* 요금제 카드 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px' }}>
          {displayedPlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                border: plan.badge ? '2px solid #0284c7' : '1px solid #e2e8f0',
                padding: '26px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: plan.badge ? '0 8px 24px rgba(2,132,199,0.12)' : '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px' }}>{plan.icon}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', backgroundColor: plan.category === 'mvno' ? '#f0fdf4' : '#fef2f2', color: plan.category === 'mvno' ? '#166534' : '#991b1b' }}>
                    {plan.category === 'mvno' ? t.plansSec.badgeMvno : t.plansSec.badgeMno}
                  </span>
                  {plan.badge && (
                    <span style={{ backgroundColor: '#0284c7', color: '#ffffff', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px' }}>
                      {plan.badge}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 'bold', marginBottom: '4px' }}>
                {plan.telecomName}
              </div>
              <div style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a' }}>{plan.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>{plan.sub}</div>

              <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284c7', marginBottom: '16px' }}>
                ₩ {plan.price} <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>{plan.unit}</span>
              </div>

              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginBottom: '20px' }}>
                {plan.desc.map((d, idx) => (
                  <div key={idx} style={{ marginBottom: '4px' }}>✓ {d}</div>
                ))}
              </div>

              <button
                onClick={() => handleOpenApplyModalWithPlan(plan)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: plan.badge ? '#0284c7' : '#f1f5f9',
                  color: plan.badge ? '#ffffff' : '#334155',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {t.plansSec.applyBtn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 인터넷 섹션 (알뜰인터넷 결합 포함) */}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))\', gap: '20px' }}>
            {internetPlans.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '17px', fontWeight: 'bold' }}>{item.title}</span>
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
              {openFaq === idx && (
                <div style={{ padding: '18px 20px', borderTop: '1px solid #f1f5f9', fontSize: '14px', color: '#475569', lineHeight: '1.7', backgroundColor: '#f8fafc' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '40px 20px', borderTop: '1px solid #1e293b', fontSize: '12px', lineHeight: '1.8' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>바다 (BADA)</div>
            <div>외국인 맞춤 원스톱 통신 & 생활금융 솔루션</div>
            <div>천안 본점: 충남 천안시 동남구 대흥로 (천안역 도보 3분) | 고객지원: 1:1 온라인 전담 상담</div>
            <div>공식 이메일: bada@badahub.co.kr</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>© 2026 BADA Platform. All rights reserved.</div>
            <div>안전한 통신 가입 및 정식 라이선스 제휴를 준수합니다.</div>
          </div>
        </div>
      </footer>

      {/* 로그인 / 회원가입 모달 */}
      {showLoginModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '420px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              <button
                onClick={() => { setAuthTab('login'); setRegError(''); }}
                style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: authTab === 'login' ? 'bold' : 'normal', color: authTab === 'login' ? '#0284c7' : '#64748b', cursor: 'pointer', paddingBottom: '6px', borderBottom: authTab === 'login' ? '2px solid #0284c7' : 'none' }}
              >
                로그인
              </button>
              <button
                onClick={() => { setAuthTab('register'); setRegError(''); }}
                style={{ background: 'none', border: 'none', fontSize: '16px', fontWeight: authTab === 'register' ? 'bold' : 'normal', color: authTab === 'register' ? '#0284c7' : '#64748b', cursor: 'pointer', paddingBottom: '6px', borderBottom: authTab === 'register' ? '2px solid #0284c7' : 'none' }}
              >
                새 계정 만들기
              </button>
            </div>

            {authTab === 'login' ? (
              <div>
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="아이디 (Username)"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    required
                  />
                  <input
                    type="password"
                    placeholder="비밀번호 (Password)"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    required
                  />
                  <button type="submit" style={{ padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                    로그인
                  </button>
                </form>

                <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>간편 SNS 로그인</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleSocialAuthClick('google')}
                      style={{ flex: 1, padding: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                    >
                      <span>🌐</span> Google 연동
                    </button>
                    <button
                      onClick={() => handleSocialAuthClick('wechat')}
                      style={{ flex: 1, padding: '10px', backgroundColor: '#07c160', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                    >
                      <span>💬</span> WeChat 연동
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="희망 아이디 (Username - 영문/숫자 3자 이상) *"
                    value={regForm.username}
                    onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                    style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    required
                  />
                  <input
                    type="password"
                    placeholder="비밀번호 (Password) *"
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                    style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="성함 (Name / 여권 영문명) *"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="이메일 (Email - 환영안내 및 접수증 수신) *"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    required
                  />

                  {regError && (
                    <div style={{ padding: '8px 12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '12px' }}>
                      {regError}
                    </div>
                  )}

                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                    * 가입 즉시 공식 메일(bada@badahub.co.kr)로 가입 확인 및 한패스 수수료 0원 코드가 자동 발송됩니다.
                  </div>

                  <button type="submit" style={{ padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                    회원가입 완료
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 내 정보 & 회원탈퇴 모달 */}
      {showUserMenuModal && currentUser && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '400px', padding: '26px', position: 'relative' }}>
            <button onClick={() => setShowUserMenuModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>내 계정 정보</h3>
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: '20px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>아이디:</strong> {currentUser.username}</div>
              <div><strong>성함:</strong> {currentUser.name}</div>
              <div><strong>이메일:</strong> {currentUser.email}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={handleLogout} style={{ width: '100%', padding: '11px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                로그아웃
              </button>
              <button onClick={handleDeleteAccount} style={{ width: '100%', padding: '11px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                회원 탈퇴 (계정 및 정보 영구 삭제)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* [업그레이드된 유심 간편 신청서 모달]: 알뜰폰 & 통신 3사 선택 완비 */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '22px', color: '#94a3b8', cursor: 'pointer' }}>×</button>

            <h3 style={{ fontSize: '21px', fontWeight: '800', margin: '0 0 4px 0' }}>유심 간편 신청서</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
              알뜰폰(MVNO) 및 통신 3사 중 원하시는 방식을 선택하여 신청하세요.
            </p>

            {currentUser && (
              <div style={{ fontSize: '12px', color: '#0284c7', backgroundColor: '#f0f9ff', padding: '8px 12px', borderRadius: '8px', marginBottom: '14px' }}>
                👤 {currentUser.username} 회원님 정보가 자동 입력되었습니다.
              </div>
            )}

            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 1단계: 통신 구분 (알뜰폰 vs 통신 3사) */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  1. 통신 구분 선택 *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, telecomCategory: 'mvno', carrier: 'KT망 알뜰폰', plan: '데이터 무제한 30일 (KT망)' }))}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '10px',
                      border: form.telecomCategory === 'mvno' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.telecomCategory === 'mvno' ? '#f0f9ff' : '#ffffff',
                      color: form.telecomCategory === 'mvno' ? '#0284c7' : '#334155',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>📱 알뜰폰 (MVNO)</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>초저가 · 무약정 · 여권개통</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, telecomCategory: 'mno', carrier: 'KT', plan: 'KT 5G 슬림 베이직' }))}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '10px',
                      border: form.telecomCategory === 'mno' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.telecomCategory === 'mno' ? '#f0f9ff' : '#ffffff',
                      color: form.telecomCategory === 'mno' ? '#0284c7' : '#334155',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>🏢 통신 3사 (MNO)</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>정규 5G · 멤버십 · 기기할부</div>
                  </button>
                </div>
              </div>

              {/* 2단계: 통신망 선택 */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  2. 희망 통신망 선택 *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {form.telecomCategory === 'mvno' ? (
                    ['KT망 알뜰폰', 'LG U+망 알뜰폰', 'SKT망 알뜰폰'].map(net => (
                      <button
                        key={net}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, carrier: net }))}
                        style={{
                          padding: '9px 6px',
                          borderRadius: '8px',
                          border: form.carrier === net ? '2px solid #0284c7' : '1px solid #cbd5e1',
                          backgroundColor: form.carrier === net ? '#f0f9ff' : '#ffffff',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {net}
                      </button>
                    ))
                  ) : (
                    ['KT', 'SKT', 'LG U+'].map(net => (
                      <button
                        key={net}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, carrier: net }))}
                        style={{
                          padding: '9px 6px',
                          borderRadius: '8px',
                          border: form.carrier === net ? '2px solid #0284c7' : '1px solid #cbd5e1',
                          backgroundColor: form.carrier === net ? '#f0f9ff' : '#ffffff',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {net}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* 3단계: 가입 유형 (신규 vs 번호이동) */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  3. 가입 방식 *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, subType: 'new' }))}
                    style={{
                      padding: '9px',
                      borderRadius: '8px',
                      border: form.subType === 'new' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.subType === 'new' ? '#f0f9ff' : '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    ✨ 신규 가입 (새 번호 발급)
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, subType: 'port_in' }))}
                    style={{
                      padding: '9px',
                      borderRadius: '8px',
                      border: form.subType === 'port_in' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.subType === 'port_in' ? '#f0f9ff' : '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 번호 이동 (쓰던 번호 유지)
                  </button>
                </div>
              </div>

              {/* 4단계: 요금제 선택 */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  4. 신청 요금제 선택 *
                </label>
                <select
                  value={form.plan}
                  onChange={(e) => setForm({ ...form, plan: e.target.value })}
                  style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}
                >
                  {modalPlans.map(p => (
                    <option key={p.id} value={p.name}>
                      [{p.telecomName}] {p.name} (₩ {p.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* 5단계: 신청자 성함, 이메일, 연락처 */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  5. 고객 인적사항 *
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="👤 성함 (여권 영문명 / Name) *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                    required
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="email"
                      placeholder="✉️ 접수증 받을 이메일 *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="📞 연락처 (Phone) *"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 6단계: 수령 방식 */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  6. 수령 방식 선택 *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, deliveryMethod: 'store' }))}
                    style={{
                      padding: '9px',
                      borderRadius: '8px',
                      border: form.deliveryMethod === 'store' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.deliveryMethod === 'store' ? '#f0f9ff' : '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    🏬 매장 픽업
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, deliveryMethod: 'delivery' }))}
                    style={{
                      padding: '9px',
                      borderRadius: '8px',
                      border: form.deliveryMethod === 'delivery' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.deliveryMethod === 'delivery' ? '#f0f9ff' : '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    📦 택배 배송
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, deliveryMethod: 'esim' }))}
                    style={{
                      padding: '9px',
                      borderRadius: '8px',
                      border: form.deliveryMethod === 'esim' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      backgroundColor: form.deliveryMethod === 'esim' ? '#f0f9ff' : '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    📲 eSIM 발급
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                * 신청 완료 시 bada@badahub.co.kr에서 선택하신 통신사/알뜰폰 공식 접수 안내 메일이 즉시 발송됩니다.
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '14px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}
              >
                신청 완료 및 확인 메일 받기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 인터넷 모달 (알뜰인터넷 버튼 포함) */}
      {showInternetModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '460px', padding: '28px', position: 'relative' }}>
            <button onClick={() => setShowInternetModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#94a3b8', cursor: 'pointer' }}>×</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>인터넷 & 생활 렌탈 상담 견적</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
              통신 3사 및 알뜰 결합 인터넷 최대 현금 사은품 견적을 제공합니다.
            </p>
            <form onSubmit={handleInternetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="성함 (Name) *" value={internetForm.name} onChange={(e) => setInternetForm({ ...internetForm, name: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <input type="tel" placeholder="연락처 (Phone) *" value={internetForm.phone} onChange={(e) => setInternetForm({ ...internetForm, phone: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', display: 'block', marginBottom: '6px' }}>통신사 / 알뜰인터넷 선택</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {['KT', 'SK', 'LG', '알뜰인터넷'].map(carrier => (
                    <button key={carrier} type="button" onClick={() => setInternetForm({ ...internetForm, carrier })} style={{ padding: '9px 4px', borderRadius: '6px', border: internetForm.carrier === carrier ? '2px solid #0284c7' : '1px solid #cbd5e1', backgroundColor: internetForm.carrier === carrier ? '#f0f9ff' : '#fff', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>{carrier}</button>
                  ))}
                </div>
              </div>
              <input type="text" placeholder="설치 희망 주소 (Address) *" value={internetForm.address} onChange={(e) => setInternetForm({ ...internetForm, address: e.target.value })} style={{ padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} required />
              <button type="submit" style={{ padding: '13px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>
                상담 및 최대 사은품 견적 받기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1:1 실시간 상담 위젯 */}
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
                  {currentTopic === 'sim' && <div><strong>📶 알뜰폰 & 통신사 유심/eSIM 개통</strong><br/><br/>• 알뜰폰(KT망, LG망, SK망) 30~50% 초저가 무약정 요금제.<br/>• 통신 3사 정규 5G 및 PASS 본인인증 100% 보장.<br/>• 여권 또는 외국인등록증 당일 5분 개통.</div>}
                  {currentTopic === 'internet' && <div><strong>🌐 초고속 인터넷+TV 사은품</strong><br/><br/>• 통신 3사 및 알뜰 결합 인터넷 최대 현금 사은품 당일 입금.</div>}
                  {currentTopic === 'rental' && <div><strong>💧 정수기/가전 렌탈</strong><br/><br/>• 외국인등록증 간편 심사, 등록비/설치비 전액 면제 혜택.</div>}
                  {currentTopic === 'hanpass' && <div><strong>💸 한패스 해외송금</strong><br/><br/>• 전용 코드: [BADA2026], 첫 송금 수수료 0원 쿠폰 증정.</div>}
                  {currentTopic === 'stores' && <div><strong>🏬 픽업 매장</strong><br/><br/>📍 천안 본점(천안역 3분), 안산점, 수원점.</div>}
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
