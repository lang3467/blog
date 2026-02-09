'use client'

import React, { useState, useEffect } from 'react'
import { 
  Menu, X, Search, Bell, User, MessageSquare, TrendingUp, 
  Bookmark, Heart, Share2, ChevronRight, Clock, Eye,
  Code, Zap, Users, PenTool, Hash, Flame
} from 'lucide-react'

// 샘플 블로그 포스트
const BLOG_POSTS = [
  {
    id: 1,
    title: "Web3와 AI의 융합: 탈중앙화된 머신러닝의 미래",
    excerpt: "블록체인 기술과 인공지능이 만나면서 새로운 패러다임이 열리고 있습니다. 데이터 주권과 AI 민주화에 대해 알아봅니다.",
    author: "김개발",
    avatar: "KD",
    category: "AI & Web3",
    readTime: "8분",
    date: "2026.02.10",
    views: 1234,
    likes: 89,
    comments: 23,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "스마트 컨트랙트 보안: 실전 감사 체크리스트",
    excerpt: "Solidity 스마트 컨트랙트의 보안 취약점을 찾아내고 방지하는 실전 가이드입니다.",
    author: "박블록",
    avatar: "PB",
    category: "Development",
    readTime: "12분",
    date: "2026.02.09",
    views: 892,
    likes: 67,
    comments: 15,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "IPFS로 시작하는 탈중앙화 저장소",
    excerpt: "중앙화된 서버에서 벗어나 IPFS를 활용한 파일 저장과 배포 방법을 배워봅니다.",
    author: "이체인",
    avatar: "LC",
    category: "Tutorial",
    readTime: "6분",
    date: "2026.02.08",
    views: 654,
    likes: 45,
    comments: 12,
    featured: false
  }
]

// 커뮤니티 포스트
const COMMUNITY_POSTS = [
  {
    id: 1,
    title: "NFT 프로젝트 팀원 모집합니다",
    content: "생성형 AI를 활용한 NFT 프로젝트를 진행 중입니다. 프론트엔드 개발자와 디자이너를 모집합니다.",
    author: "최크립토",
    avatar: "CC",
    category: "팀 모집",
    replies: 18,
    views: 256,
    likes: 12,
    time: "2시간 전",
    hot: true
  },
  {
    id: 2,
    title: "Solidity vs Rust: 스마트 컨트랙트 개발 언어 비교",
    content: "두 언어로 각각 프로젝트를 진행해본 경험을 공유합니다. 장단점과 선택 기준에 대해 이야기해요.",
    author: "정솔리디티",
    avatar: "JS",
    category: "토론",
    replies: 34,
    views: 478,
    likes: 28,
    time: "5시간 전",
    hot: true
  },
  {
    id: 3,
    title: "메타마스크 연동 중 에러 해결 방법",
    content: "web3.js로 메타마스크 연동할 때 자주 발생하는 에러들과 해결 방법을 정리했습니다.",
    author: "송웹쓰리",
    avatar: "SW",
    category: "Q&A",
    replies: 9,
    views: 189,
    likes: 15,
    time: "1일 전",
    hot: false
  }
]

const CATEGORIES = [
  { name: "전체", icon: Hash },
  { name: "AI & Web3", icon: Zap },
  { name: "Development", icon: Code },
  { name: "Tutorial", icon: PenTool },
  { name: "토론", icon: MessageSquare },
  { name: "Q&A", icon: Users }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<'blog' | 'community'>('blog')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('전체')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark-600">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Web3 Community</h1>
                <p className="text-xs text-gray-400 code-font">Build the Future</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'blog'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                블로그
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'community'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                커뮤니티
              </button>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all">
                글쓰기
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                <User className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'blog' ? 'bg-gray-700' : 'text-gray-400'
                }`}
              >
                블로그
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === 'community' ? 'bg-gray-700' : 'text-gray-400'
                }`}
              >
                커뮤니티
              </button>
              <button className="w-full px-4 py-2 bg-white text-black font-semibold rounded-lg">
                글쓰기
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab Content */}
          {activeTab === 'blog' ? (
            <BlogSection 
              posts={BLOG_POSTS}
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <CommunitySection 
              posts={COMMUNITY_POSTS}
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </div>
      </main>
    </div>
  )
}

// 블로그 섹션
function BlogSection({ posts, categories, selectedCategory, setSelectedCategory }: any) {
  const featuredPosts = posts.filter((p: any) => p.featured)
  
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center py-12">
        <div className="inline-block mb-4 px-4 py-1.5 glass-effect rounded-full">
          <span className="text-sm text-gray-300 code-font">Web3 × AI × Blockchain</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          기술로 <span className="text-gradient">미래</span>를 만듭니다
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          최신 Web3, AI, 블록체인 기술 인사이트와 실전 개발 노하우
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="text-2xl font-bold">주요 포스트</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post: any) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat: any) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* All Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

// 커뮤니티 섹션
function CommunitySection({ posts, categories, selectedCategory, setSelectedCategory }: any) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">커뮤니티</h2>
          <p className="text-gray-400">함께 성장하는 Web3 개발자 커뮤니티</p>
        </div>
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all">
          새 글 작성
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat: any) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        {posts.map((post: any) => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

// 블로그 카드 컴포넌트
function BlogCard({ post, featured = false }: any) {
  return (
    <article className={`glass-effect rounded-xl overflow-hidden hover-lift cursor-pointer ${
      featured ? 'md:col-span-1' : ''
    }`}>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-semibold rounded-full">
            {post.category}
          </span>
          {featured && (
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-gray-300 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
              {post.avatar}
            </div>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

// 커뮤니티 카드 컴포넌트
function CommunityCard({ post }: any) {
  return (
    <article className="glass-effect rounded-xl p-6 hover-lift cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-sm font-bold">
            {post.avatar}
          </div>
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-xs text-gray-500">{post.time}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-semibold rounded-full">
            {post.category}
          </span>
          {post.hot && (
            <Flame className="w-4 h-4 text-orange-500" />
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 hover:text-gray-300 transition-colors">
        {post.title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {post.content}
      </p>

      <div className="flex items-center space-x-6 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4" />
          <span>{post.replies}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>{post.views}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>{post.likes}</span>
        </div>
      </div>
    </article>
  )
}
