# 🎓 FutureLens Premium - 전문가 지식 플랫폼

**학술적이고 고급스러운 디자인**

---

## ✨ 디자인 특징

### **색상 팔레트**
- 배경: 아이보리/베이지 (#fdfcfa)
- 텍스트: 다크 브라운 (#1a1715)
- 악센트: 골드 (#b8860b)
- 화이트 카드: 깔끔한 그림자

### **타이포그래피**
- 제목: **Crimson Pro** (세리프 - 신뢰감)
- 본문: **IBM Plex Sans** (산세리프 - 가독성)
- 부제목: **Lora** (세리프 - 우아함)

### **디자인 철학**
- 📰 Editorial/Magazine 레이아웃
- 🎓 Academic & Professional
- 🏛️ Luxury & Refined
- 📖 Typography-first

---

## 🎯 타겟 사용자

- 박사급 전문가
- 학술 연구자
- 경제/주식 애널리스트
- 블록체인 전문가
- 국제정세 전문가

---

## 📁 주요 카테고리

- 블록체인 & 암호화폐
- AI & 머신러닝
- 주식 & 경제 분석
- 양자컴퓨터
- 국제정세
- 기술 혁신

---

## 🚀 설치 방법

### 1. Supabase 설정 (이미 완료!)

이전과 동일합니다.

### 2. 프로젝트 설정

#### .env.local 파일 생성
```env
NEXT_PUBLIC_SUPABASE_URL=당신의_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=당신의_Key
```

#### 패키지 설치
```bash
npm install
```

#### 로컬 실행
```bash
npm run dev
```

### 3. GitHub 업로드

```bash
git init
git add .
git commit -m "FutureLens Premium v2.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/futurelens-premium.git
git push -u origin main
```

### 4. Vercel 배포

```
1. vercel.com → Add New Project
2. futurelens-premium 선택
3. Environment Variables 추가:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy!
```

### 5. 도메인 연결

```
Settings → Domains → futurelens.kr 추가
```

---

## 🎨 디자인 하이라이트

### **홈페이지**
- 큰 세리프 헤드라인
- 우아한 카드 레이아웃
- 부드러운 애니메이션
- 골드 악센트

### **블로그 카드**
- 화이트 배경
- 우아한 그림자
- 카테고리 뱃지 (앰버 색상)
- 저자 프로필

### **버튼**
- 다크 프라이머리 (검정)
- 아웃라인 세컨더리
- 호버 효과

### **폰트 사용**
- 제목: `.serif` 클래스 (Crimson Pro)
- 본문: 기본 (IBM Plex Sans)
- 강조: `.serif-alt` (Lora)

---

## 🎯 vs 이전 버전

| 항목 | 이전 (Web3) | 새버전 (Premium) |
|------|------------|----------------|
| **색상** | 검정/네온 | 아이보리/브라운/골드 |
| **폰트** | Inter | Crimson Pro + IBM Plex |
| **느낌** | 사이버펑크 | 학술/고급 |
| **타겟** | 개발자 | 박사/전문가 |
| **레이아웃** | 테크 중심 | Editorial |

---

## 💡 커스터마이징

### 색상 변경
`app/globals.css` 파일:
```css
/* 골드 색상 변경 */
.gold-accent {
  color: #b8860b; /* 원하는 색상으로 */
}
```

### 폰트 변경
Google Fonts에서 다른 세리프 폰트 선택

### 카테고리 추가
`app/write/page.tsx`의 CATEGORIES 배열 수정

---

## 📸 디자인 미리보기

**홈페이지:**
- 깔끔한 아이보리 배경
- 큰 세리프 제목
- 우아한 카드 그리드
- 골드 악센트

**글 카드:**
- 화이트 배경
- 앰버 색 카테고리 뱃지
- 우아한 그림자 효과
- 호버 시 살짝 올라감

---

## ✨ 완성!

이제 futurelens.kr에서 고급스럽고 전문적인 플랫폼을 만나보세요!
