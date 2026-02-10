'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0],
          },
        },
      })

      if (error) throw error

      setSuccess(true)
      
      // 이메일 인증 필요없이 바로 로그인
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setError(error.message || '회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center text-2xl font-bold">
              FL
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">FutureLens</h1>
              <p className="text-sm text-gray-400">미래를 보는 렌즈</p>
            </div>
          </Link>
        </div>

        {/* 회원가입 폼 */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <UserPlus className="w-6 h-6" />
            <h2 className="text-2xl font-bold">회원가입</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
              회원가입 성공! 잠시 후 메인 페이지로 이동합니다...
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">닉네임</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1c22] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                placeholder="홍길동"
              />
              <p className="mt-1 text-xs text-gray-500">비워두면 이메일 아이디가 닉네임이 됩니다</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#1a1c22] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-[#1a1c22] border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">최소 6자 이상</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-white font-semibold hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
