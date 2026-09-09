export const metadata = {
  title: 'BADA - 외국인 유심 개통 센터',
  description: '외국인을 위한 한국 선불유심 및 eSIM 24시간 간편 신청',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
