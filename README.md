# HR 데이터 정규화 도구 - Electron 앱

HR 데이터 정규화 에이전트의 Electron 데스크톱 앱 버전입니다.

## 시작하기

### 1. 의존성 설치
```bash
cd local_app
npm install
```

### 2. React 앱 빌드 및 복사
```bash
npm run build-web
```

### 3. Electron 앱 실행
```bash
npm start
```

## 개발 모드

개발 중에는 다음 명령으로 실행하세요:
```bash
npm run dev
```

## 앱 빌드 (실행파일 생성)

### Windows용 실행파일 생성
```bash
npm run dist
```

생성된 실행파일은 `release` 폴더에서 찾을 수 있습니다.

## 주요 기능

- ✅ 엑셀/CSV 파일 업로드 및 처리
- ✅ 헤더 자동/수동 탐지
- ✅ 다단 헤더 정규화
- ✅ 표준 컬럼 매핑
- ✅ 타입 변환 (날짜/숫자)
- ✅ JSON/CSV/XLSX 내보내기
- ✅ Self-Test 진단 기능
- ✅ 완전한 오프라인 작업 (데이터 보안)

## 파일 구조

```
local_app/
├── main.js          # Electron 메인 프로세스
├── preload.js       # 보안 컨텍스트 브리지
├── package.json     # 앱 설정 및 의존성
├── dist/           # React 앱 빌드 파일
├── assets/         # 아이콘 및 리소스
└── release/        # 빌드된 실행파일
```

## 보안 기능

- Node.js API 직접 접근 차단
- 컨텍스트 격리 활성화
- 외부 링크는 기본 브라우저에서 열기
- 새 창 생성 방지

## 요구 사항

- Node.js 16+ 
- Windows 10+
- 최소 4GB RAM
- 100MB 여유 디스크 공간