# NaverPay FE Externship – Stock Screener

네이버페이 FE Externship 과제로 구현한 주식 스크리너 프로젝트입니다.  
국내 / 해외 / 관심종목 테이블에 대해 필터링, 정렬, 무한 스크롤, 실시간 시세 조회 기능을 구현했습니다.

## 기술 스택
- **프론트엔드**
  - React 19
  - TypeScript
  - React Router v7
  - Vite
    - 빠른 번들링·HMR로 개발 생산성 향상
  
🎨 **스타일링**
- Tailwind CSS 4
  - Utility-first 스타일링을 통해 테이블 UI, 정렬 상태, 필터 UI 등을 빠르게 개발
- Radix UI
  - 접근성(A11y)이 보장된 UI 컴포넌트를 기반으로 Checkbox, Popover, Radio Group 등 빠른 구현
  - tailwind를 사용하여 로컬에서 스타일 직접 변경할 수 있어 유연성 보장
- Lucide React
  - 정렬 아이콘, 관심종목(Star) UI 등 아이콘 렌더링에 사용

📦 **데이터 처리 & 상태 관리**
- tanstack-query v5
  - 무한 스크롤(Infinite Query): 국내/해외 주식 리스트를 페이지 단위로 받아오고 스크롤 시 자동 로딩
  - 실시간 시세 폴링: API에서 내려주는 pollingInterval을 기반으로 정확한 주기 제어
  - 쿼리 자동 캐싱: 동일 데이터에 대해 불필요한 네트워크 요청 방지
  - 쿼리 키 기반 상태 관리로 도메인별 데이터를 명확히 분리
- Jotai
  - atom 기반의 Bottom-up 구조의 전역 상태 라이브러리
  - 필터 상태, 실시간 시세 추적 종목 코드 관리

🔌 **HTTP 통신**
- **ky** 
  - fetch 기반의 가벼운 HTTP 클라이언트
  
🧹 코드 품질 & 포매팅
- ESLint (@naverpay/eslint-config)
  - NaverPay FE 팀 규칙 기반으로 일관된 코드 스타일 유지
  - 잠재적인 버그 패턴을 조기에 발견 가능
- Prettier (@naverpay/prettier-config)
  - 팀 컨벤션에 맞춘 코드 자동 정렬
  - 협업 간 코드 차이를 최소화하여 리뷰 가독성 향상
---


## 개발 모드 실행 및 프로덕션 빌드 / 시작 스크립트

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 모드 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 프로덕션 빌드 확인 (프리뷰 서버)
```bash
npm run start
# 또는
npm run preview
```

### 5. 기타 스크립트
```bash
npm run lint         # ESLint 체크
npm run lint:fix     # ESLint 자동 수정
npm run prettier     # Prettier 포맷 체크
npm run prettier:fix # Prettier 자동 포맷
npm run svgr         # public/svg → React SVG 컴포넌트 변환
```

## 사용한 AI 도구와 목적
- **ChatGPT**
  - 모르는 부분 질문하고 학습하는 용도로 사용 활용

- **Cursor Agent**
  - 바이브 코딩 용도로 사용
  - 반복적인 리팩터링, 보일러플레이트 코드 작성, 타이핑이 많은 작업을 도와주는 보조 도구로 활용
 
## 추가로 구현한 과제와 자세한 내용

> 추후 구현/정리 후 여기에 상세 내용을 적을 예정입니다.

- (예: 실시간 시세 최적화, 사용자 경험 개선, 에러/로딩 상태 UX 고도화 등)

## 폴더 구조
```text
fe-externship
├─ src
│  ├─ main.tsx                 # 엔트리 포인트, Router & QueryClientProvider 설정
│  ├─ App.tsx                  # 전역 레이아웃, React Query DevTools, Toast 등
│  ├─ router.tsx               # 라우터 정의
│  ├─ Layout.tsx               # 공통 레이아웃 (헤더 등)
│  ├─ common/                  # 공통 UI 컴포넌트 & 유틸
│  ├─ shared/                  # 애셋 및 공용 컴포넌트
│  └─ pages/
│     └─ stockScreenerPage/    # 주식 스크리너 메인 도메인
│        ├─ StockScreenerPage.tsx
│        ├─ api/               # API 클라이언트 & React Query 훅
│        ├─ atoms/             # Jotai 전역 상태 (필터, 종목 코드 등)
│        ├─ components/        # 도메인 전용 UI (테이블, 필터, 탭 등)
│        ├─ constants/         # 상수 정의 (정렬, 필터 옵션, 쿼리 키 등)
│        ├─ hooks/             # 도메인 전용 훅 (실시간 시세, 관심종목 등)
│        ├─ mock/              # 목 데이터
│        ├─ types/             # API/도메인 타입 정의
│        └─ utils/             # 매핑, 정렬, 테이블 유틸
```
