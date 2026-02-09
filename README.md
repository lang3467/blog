# 🚀 Web3 Community Blog

블록체인, AI, Web3 기술을 탐구하고 소통하는 모던 블로그 & 커뮤니티 플랫폼

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)

## ✨ 주요 기능

- 📝 **블로그**: 기술 포스트 작성 및 공유
- 💬 **커뮤니티**: 실시간 토론 및 Q&A
- 🎨 **모던 디자인**: 검정/회색 테마의 세련된 UI
- 📱 **반응형**: 모바일, 태블릿, 데스크톱 완벽 지원
- ⚡ **빠른 성능**: Next.js 14 기반 최적화

## 🛠 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **아이콘**: Lucide React
- **배포**: Vercel

---

## 📦 설치 및 실행 (로컬 테스트용)

### 1. 필수 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 2. 프로젝트 클론
```bash
git clone https://github.com/YOUR_USERNAME/web3-community-blog.git
cd web3-community-blog
```

### 3. 패키지 설치
```bash
npm install
# 또는
yarn install
```

### 4. 로컬 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🚀 Vercel 배포 가이드 (초보자용)

### 방법 1: GitHub에서 직접 업로드 (가장 쉬움!)

#### 1단계: GitHub 저장소 생성
1. [GitHub](https://github.com) 로그인
2. 우측 상단 `+` → `New repository` 클릭
3. Repository 이름 입력: `web3-community-blog`
4. `Public` 선택
5. `Create repository` 클릭

#### 2단계: 파일 업로드
1. 생성된 저장소 페이지에서 `uploading an existing file` 클릭
2. 이 프로젝트의 **모든 파일과 폴더**를 드래그 앤 드롭
   - ⚠️ 주의: `.git` 폴더는 제외
3. 하단에 "Upload files" 버튼 클릭

#### 3단계: Vercel 배포
1. [Vercel](https://vercel.com) 접속
2. `Sign up` 클릭 → `Continue with GitHub` 선택
3. GitHub 계정으로 로그인 및 권한 승인
4. 대시보드에서 `Add New` → `Project` 클릭
5. GitHub 저장소 목록에서 `web3-community-blog` 선택
6. `Import` 클릭
7. 설정은 기본값 그대로 두고 `Deploy` 클릭
8. ⏳ 1-2분 기다리면 배포 완료!
9. 🎉 생성된 URL 클릭하여 사이트 확인

#### 완료! 🎊
- 배포 URL: `https://web3-community-blog-xxxxx.vercel.app`
- 코드 수정 후 GitHub에 업로드하면 자동으로 재배포됩니다!

---

### 방법 2: Git 명령어 사용 (개발자용)

```bash
# Git 초기화
git init

# 원격 저장소 연결
git remote add origin https://github.com/YOUR_USERNAME/web3-community-blog.git

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub에 푸시
git push -u origin main
```

이후 위의 "3단계: Vercel 배포" 진행

---

## 📁 프로젝트 구조

```
web3-community-blog/
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── public/                  # 정적 파일
├── .gitignore
├── next.config.js           # Next.js 설정
├── package.json             # 패키지 정보
├── tailwind.config.js       # Tailwind 설정
└── tsconfig.json            # TypeScript 설정
```

---

## 🎨 커스터마이징

### 색상 변경
`tailwind.config.js` 파일의 `colors` 섹션에서 색상을 변경할 수 있습니다.

### 블로그 포스트 추가
`app/page.tsx` 파일의 `BLOG_POSTS` 배열에 새 포스트를 추가하세요.

### 커뮤니티 포스트 추가
`app/page.tsx` 파일의 `COMMUNITY_POSTS` 배열에 새 포스트를 추가하세요.

---

## 🔧 향후 개발 계획

- [ ] 백엔드 연동 (Firebase / Supabase)
- [ ] 사용자 인증 시스템
- [ ] 실제 글쓰기 에디터
- [ ] 댓글 시스템
- [ ] 검색 기능
- [ ] Web3 지갑 연동
- [ ] NFT 기능
- [ ] 광고 시스템

---

## 📝 라이선스

MIT License

---

## 💡 도움이 필요하신가요?

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

---

## 🎯 빠른 시작 체크리스트

- [ ] Node.js 설치 확인
- [ ] GitHub 계정 생성
- [ ] GitHub에 저장소 생성
- [ ] 파일 업로드
- [ ] Vercel 계정 생성 (GitHub 연동)
- [ ] Vercel에서 프로젝트 Import
- [ ] 배포 완료!

**예상 소요 시간**: 15-20분

---

Made with ❤️ by Web3 Developers
