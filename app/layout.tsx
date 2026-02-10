import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FutureLens - 전문가 지식 플랫폼',
  description: '블록체인, AI, 주식, 국제정세 전문가들의 깊이 있는 분석',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
