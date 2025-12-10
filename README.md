# NaverPay FE Externship – Stock Screener

네이버페이 FE Externship 과제로 구현한 주식 스크리너 프로젝트입니다.  
국내 / 해외 / 관심종목 테이블에 대해 필터링, 정렬, 무한 스크롤, 실시간 시세 조회 기능을 구현했습니다.

## 기술 스택
🍀 **프론트엔드**
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

<br/>

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

<br/>

## 사용한 AI 도구와 목적
- **ChatGPT**
  - 모르는 부분 질문하고 학습하는 용도로 활용

- **Cursor Agent**
  - 바이브 코딩 용도로 사용
  - 반복적인 리팩터링, 보일러플레이트 코드 작성, 타이핑이 많은 작업을 도와주는 보조 도구로 활용

<br/>

## 추가로 구현한 과제와 자세한 내용
### UI/UX 개선
주식 스크리너를 보는 사용자들은 하나의 창만 두지 않고 다중창으로 동시에 최대한 많은 시세를 확인합니다. 
이런 다중창 유저를 고려한 UI/UX를 개선할 예정입니다.

1. 다중창에서 실시간 데이터 업데이트 타이밍 통일화
2. 정보 업데이트 시 애니메이션 적용으로 어떤 값이 변하는지 한눈에 파악
3. 관심종목 테이블 on/off 가능한 UI로 변경

<br/>

### 1. Shared Worker를 활용해 다중창에서 실시간 데이터 업데이트 타이밍 통일화
#### 📍 문제점
- 초기에는 Tanstack Query를 사용하여 각 창에서 독립적으로 polling을 수행해주었습니다.
- 이로 인해 다중창 환경에서 실시간 데이터 반영 시간이 달라 다중창 유저의 UX가 저하되었습니다.

<img width="700" height="550" alt="스크린샷 2025-12-10 오전 12 52 50" src="https://github.com/user-attachments/assets/d3ef8c7f-39e0-42da-8369-62b9b125c699" />

https://github.com/user-attachments/assets/6a4161ab-c81f-4116-b174-a455cf7eb994

<br/>

#### 📍 개선방향
- 실시간 시세 polling 요청을 SharedWorker에서 전담하고, 받아온 데이터를 각 창에 전달하는 방식으로 구조를 개선해주었습니다.
- 데이터를 받으면 동시에 각 창으로 보내주기 때문에 동일한 타이밍에 데이터가 업데이트 될 수 있게되었습니다.

<img width="700" height="550" alt="스크린샷 2025-12-10 오전 1 50 20" src="https://github.com/user-attachments/assets/ce0452e1-9199-4cbc-8162-f59215f0dfc4" />

https://github.com/user-attachments/assets/9913b3ab-d41c-41f7-b589-1f4e98363b06

<br/>

#### 📍 트러블 슈팅 : WeakRef를 활용해 메모리 누수 방지
**문제 상황**
- 탭 종료 후에도 worker의 Port 관리 객체에서 MessagePort를 강하게 참조하고 있어 GC 대상이 되지 않아 메모리가 누수되는 현상 발생

**개선 과정**
- WeakRef를 사용하여 SharedWorker에서 MessagePort를 약하게 참조하도록 변경
<img width="400" height="250" alt="스크린샷 2025-12-10 오전 2 22 06" src="https://github.com/user-attachments/assets/cb997f52-b811-42ad-9296-37cc2f027e60" />

**개선 결과**
- 탭 종료 시 탭에서의 강한 참조가 끊어지고, Worker쪽에서 약한 참조만 남아 포트가 GC 대상이 되어 제거됨
- Port가 제거된 후 빈 WeakRef 인스턴스도 제거하는 로직을 추가해 완전하게 메모리 누수를 방지해 성능 악화 예방

- 다중창 10개를 만들었다가 9개를 닫은 후 활성화된 port 개수를 추적해보았습니다.

WeakRef 사용 전: 메모리에 port가 계속 남아 있음

![WeakRef 사용 전](https://github.com/user-attachments/assets/a7e30a60-c382-4d91-8568-98f110917e44)

WeakRef 사용 후: 일정 시간 후 port가 제거됨

![WeakRef 사용 후](https://github.com/user-attachments/assets/17e95f68-ce7f-4c2d-9c79-3e9639d1f729)

<br/>

#### 📍 개선 결과
- 여러 창을 열어도 동일한 순간의 시세가 동시에 반영되는 경험 제공
- 실시간 데이터의 일관성이 확보되어 멀티태스킹 유저들에게 안정적인 UX 제공
- polling 로직이 중앙화되어 중복 요청 감소 → 네트워크 리소스 절약
- 도메인 컴포넌트에서 복잡한 실시간 merge 로직 없이 React Query만 구독하면 되는 단순한 구조로 개선됨

<br/>

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
<br/>

## 구조 도식화

<img width="1119" height="881" alt="스크린샷 2025-12-10 오전 4 09 38" src="https://github.com/user-attachments/assets/749a1e00-fd5c-4af4-b12f-dc8b1a5f0a9c" />

