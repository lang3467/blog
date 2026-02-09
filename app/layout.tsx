import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web3 Community - 블로그 & 커뮤니티',
  description: 'Web3, AI, 블록체인 기술을 탐구하고 소통하는 커뮤니티',
  keywords: ['Web3', 'AI', '블록체인', '커뮤니티', '블로그'],
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
