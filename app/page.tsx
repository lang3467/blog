'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { BookOpen, TrendingUp, Users, PenSquare, LogIn, LogOut, Search, Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id (
            display_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(12)

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('포스트 로딩 에러:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen premium-gradient">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="serif text-3xl font-bold text-primary tracking-tight">
                FutureLens
              </div>
              <div className="hidden md:block h-6 w-px bg-black/10"></div>
              <div className="hidden md:block text-sm text-secondary">
                전문가 지식 플랫폼
              </div>
            </Link>

            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-primary hover:bg-black/5 rounded-lg transition-colors">
                홈
              </Link>
              <Link href="/blog" className="px-4 py-2 text-sm font-medium text-primary hover:bg-black/5 rounded-lg transition-colors">
                인사이트
              </Link>
              <Link href="/community" className="px-4 py-2 text-sm font-medium text-primary hover:bg-black/5 rounded-lg transition-colors">
                토론
              </Link>
              <div className="w-px h-6 bg-black/10 mx-2"></div>
              {user ? (
                <>
                  <Link href="/write" className="px-5 py-2 btn-primary rounded-lg text-sm font-semibold flex items-center space-x-2">
                    <PenSquare className="w-4 h-4" />
                    <span>글쓰기</span>
                  </Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm text-secondary hover:text-primary transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-primary hover:bg-black/5 rounded-lg transition-colors">
                    로그인
                  </Link>
                  <Link href="/signup" className="px-5 py-2 btn-primary rounded-lg text-sm font-semibold">
                    시작하기
                  </Link>
                </>
              )}
            </div>

            {/* 모바일 메뉴 */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 fade-in-up">
              <Link href="/" className="block px-4 py-2 text-sm hover:bg-black/5 rounded-lg">홈</Link>
              <Link href="/blog" className="block px-4 py-2 text-sm hover:bg-black/5 rounded-lg">인사이트</Link>
              <Link href="/community" className="block px-4 py-2 text-sm hover:bg-black/5 rounded-lg">토론</Link>
              <div className="divider-elegant my-2"></div>
              {user ? (
                <>
                  <Link href="/write" className="block px-4 py-2 btn-primary rounded-lg text-sm text-center">글쓰기</Link>
                  <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left">로그아웃</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-2 text-sm">로그인</Link>
                  <Link href="/signup" className="block px-4 py-2 btn-primary rounded-lg text-sm text-center">시작하기</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-up">
            <h1 className="serif text-6xl md:text-7xl font-bold text-primary mb-6 leading-tight">
              미래를 읽는<br />전문가의 시선
            </h1>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              블록체인, AI, 양자컴퓨터, 국제정세, 주식시장까지.<br />
              박사급 전문가들의 깊이 있는 분석과 통찰을 만나보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-3 fade-in-up delay-1">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-black/10 rounded-full text-sm text-secondary">
                <BookOpen className="w-4 h-4" />
                <span>심층 분석</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-black/10 rounded-full text-sm text-secondary">
                <TrendingUp className="w-4 h-4" />
                <span>시장 인사이트</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-black/10 rounded-full text-sm text-secondary">
                <Users className="w-4 h-4" />
                <span>전문가 커뮤니티</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 글 */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="serif text-4xl font-bold text-primary">최신 인사이트</h2>
            <Link href="/blog" className="text-sm font-medium text-secondary hover:text-primary transition-colors flex items-center space-x-1">
              <span>모두 보기</span>
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-secondary">
              로딩 중...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-secondary mb-6">아직 작성된 글이 없습니다.</p>
              {user && (
                <Link href="/write" className="inline-block px-6 py-3 btn-primary rounded-lg text-sm font-semibold">
                  첫 글 작성하기
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article 
                  key={post.id}
                  className={`card-premium rounded-lg overflow-hidden fade-in-up delay-${(index % 3) + 1}`}
                >
                  <div className="p-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted">
                        {new Date(post.created_at).toLocaleDateString('ko-KR', { 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <h3 className="serif text-2xl font-bold text-primary mb-3 leading-tight hover:text-gold-accent transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-secondary text-sm mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt || post.content.substring(0, 120) + '...'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-sm font-bold text-amber-900">
                          {post.profiles?.display_name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">
                            {post.profiles?.display_name || '익명'}
                          </p>
                          <p className="text-xs text-muted">
                            {post.views} 조회
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white elegant-shadow rounded-2xl p-12 text-center">
            <h2 className="serif text-4xl font-bold text-primary mb-4">
              전문가 커뮤니티에 합류하세요
            </h2>
            <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
              당신의 전문 지식을 공유하고, 동료 전문가들과 깊이 있는 토론을 나누세요.
            </p>
            {!user && (
              <Link href="/signup" className="inline-block px-8 py-4 btn-primary rounded-lg font-semibold text-base">
                무료로 시작하기
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 px-6 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="serif text-2xl font-bold text-primary mb-3">FutureLens</div>
              <p className="text-sm text-secondary">
                전문가를 위한 지식 플랫폼
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm">카테고리</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-secondary hover:text-primary transition-colors">블록체인</a>
                <a href="#" className="block text-secondary hover:text-primary transition-colors">AI & 머신러닝</a>
                <a href="#" className="block text-secondary hover:text-primary transition-colors">주식 & 경제</a>
                <a href="#" className="block text-secondary hover:text-primary transition-colors">국제정세</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm">서비스</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-secondary hover:text-primary transition-colors">소개</a>
                <a href="#" className="block text-secondary hover:text-primary transition-colors">이용약관</a>
                <a href="#" className="block text-secondary hover:text-primary transition-colors">개인정보처리방침</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3 text-sm">문의</h4>
              <p className="text-sm text-secondary">
                contact@futurelens.kr
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-black/5 text-center text-sm text-muted">
            <p>© 2026 FutureLens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
