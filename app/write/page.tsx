'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { Save, ArrowLeft } from 'lucide-react'

const CATEGORIES = [
  '블록체인',
  'AI & 머신러닝',
  '양자컴퓨터',
  '국제정세',
  'Web3',
  '암호화폐',
  '기술 분석',
  '기타'
]

export default function WritePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // 로그인 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 요약문 자동 생성 (첫 150자)
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '')

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            author_id: user.id,
            title,
            content,
            excerpt,
            category,
            views: 0,
            likes: 0
          }
        ])
        .select()

      if (error) throw error

      // 성공! 메인 페이지로 이동
      router.push('/')
      router.refresh()
    } catch (error: any) {
      setError(error.message || '글 작성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0c0f] text-white flex items-center justify-center">
        <p>로그인이 필요합니다...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>돌아가기</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center text-xl font-bold">
              FL
            </div>
            <div>
              <h1 className="text-lg font-bold">FutureLens</h1>
              <p className="text-xs text-gray-400">{user.email?.split('@')[0]}</p>
            </div>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* 글쓰기 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1c22] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1c22] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors text-lg"
              placeholder="글 제목을 입력하세요"
            />
          </div>

          {/* 본문 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">본문</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={20}
              className="w-full px-4 py-3 bg-[#1a1c22] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors resize-none"
              placeholder="내용을 입력하세요...

마크다운 형식을 지원합니다.
- **굵게**
- *기울임*
- # 제목

블록체인, AI, 양자컴퓨터, 국제정세 등 
미래에 대한 통찰을 공유해주세요!"
            />
            <p className="mt-2 text-sm text-gray-500">
              {content.length} 글자
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading || !title || !content}
              className="flex-1 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? '발행 중...' : '발행하기'}</span>
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all text-center"
            >
              취소
            </Link>
          </div>
        </form>

        {/* 미리보기 (선택사항) */}
        {title && content && (
          <div className="mt-12 pt-12 border-t border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-400">미리보기</h3>
            <div className="glass-effect rounded-xl p-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-semibold rounded-full">
                  {category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
