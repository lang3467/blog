'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Eye, MessageCircle, Calendar, Send, Trash2 } from 'lucide-react'
import { User } from '@supabase/supabase-js'

export default function PostPage() {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (id) { loadPost(); loadComments() }
  }, [id])

  async function loadPost() {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, profiles:author_id(display_name, avatar_url)')
        .eq('id', id)
        .single()
      if (error) throw error
      setPost(data)
      await supabase.from('blog_posts').update({ views: (data.views || 0) + 1 }).eq('id', id)
    } catch (error) {
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  async function loadComments() {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles:author_id(display_name)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !newComment.trim()) return
    setSubmitting(true)
    const { error } = await supabase.from('comments').insert({
      post_id: id, author_id: user.id, content: newComment.trim()
    })
    if (!error) { setNewComment(''); loadComments() }
    setSubmitting(false)
  }

  async function handleDeleteComment(commentId: string) {
    await supabase.from('comments').delete().eq('id', commentId)
    loadComments()
  }

  if (loading) return (
    <div className="min-h-screen premium-gradient flex items-center justify-center">
      <p className="text-secondary">로딩 중...</p>
    </div>
  )
  if (!post) return null

  return (
    <div className="min-h-screen premium-gradient">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <Link href="/" className="serif text-xl font-bold text-primary">FutureLens</Link>
          <div className="w-20" />
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center space-x-3 mb-6">
          <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
            {post.category}
          </span>
          <span className="text-xs text-muted flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </span>
        </div>

        <h1 className="serif text-5xl font-bold text-primary mb-8 leading-tight">{post.title}</h1>

        <div className="flex items-center justify-between pb-8 border-b border-black/8 mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-base font-bold text-amber-900">
              {post.profiles?.display_name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="font-semibold text-primary">{post.profiles?.display_name || '익명'}</p>
              <p className="text-xs text-muted">전문가</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted">
            <span className="flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{(post.views || 0) + 1} 조회</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{comments.length} 댓글</span>
            </span>
          </div>
        </div>

        <div className="mb-16">
          <p className="text-primary leading-relaxed whitespace-pre-wrap text-lg drop-cap">{post.content}</p>
        </div>

        <div className="border-t border-black/8 pt-12">
          <h2 className="serif text-2xl font-bold text-primary mb-8">
            댓글 {comments.length > 0 && <span className="text-secondary text-lg">({comments.length})</span>}
          </h2>

          {user ? (
            <form onSubmit={handleComment} className="mb-10">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-sm font-bold text-amber-900 flex-shrink-0">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="의견을 남겨주세요..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-amber-300 transition-colors resize-none text-sm"
                  />
                  <div className="flex justify-end mt-2">
                    <button type="submit" disabled={submitting || !newComment.trim()}
                      className="px-5 py-2 btn-primary rounded-lg text-sm font-semibold flex items-center space-x-2 disabled:opacity-50">
                      <Send className="w-3.5 h-3.5" />
                      <span>등록</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-white border border-black/8 rounded-xl text-center">
              <p className="text-secondary text-sm mb-3">댓글을 작성하려면 로그인이 필요해요</p>
              <Link href="/login" className="px-4 py-2 btn-primary rounded-lg text-sm font-semibold inline-block">로그인</Link>
            </div>
          )}

          {comments.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">첫 댓글을 남겨보세요!</p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-sm font-bold text-amber-900 flex-shrink-0">
                    {comment.profiles?.display_name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-primary">{comment.profiles?.display_name || '익명'}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted">{new Date(comment.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>
                        {user?.id === comment.author_id && (
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-muted hover:text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}