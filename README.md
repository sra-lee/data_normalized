# 📊 HR 데이터 정규화 도구

HR 부서의 다양한 형태의 엑셀/CSV 데이터를 표준화된 형식으로 자동 변환하는 Electron 데스크톱 애플리케이션입니다.

![Version](https://img.shields.io/badge/version-3.1.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 빠른 시작

### 간편 실행 (권장)

1. **소스코드 다운로드**
   ```bash
   git clone https://github.com/sra-lee/data_normalized.git
   cd data_normalized/local_app
   ```

2. **앱 실행**
   - `start.vbs` 파일을 더블클릭하세요
   - 모든 설정이 자동으로 처리됩니다 (Node.js 확인, 의존성 설치, 빌드, 실행)

### 수동 실행

개발자이거나 세부 과정을 확인하고 싶다면:

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **React 앱 빌드**
   ```bash
   npm run build-web
   ```

3. **앱 실행**
   ```bash
   npm start
   ```

## 🛠️ 개발 모드

개발 중에는 다음 명령으로 실행하세요:
```bash
npm run dev
```

## 📦 앱 빌드 (실행파일 생성)

### Windows용 실행파일 생성
```bash
npm run dist
```

생성된 실행파일은 `release` 폴더에서 찾을 수 있습니다.

## ✨ 주요 기능

### 📋 데이터 처리
- ✅ **다양한 파일 형식 지원**: Excel (.xlsx, .xls), CSV 파일
- ✅ **스마트 헤더 탐지**: 자동/수동 헤더 위치 감지
- ✅ **다단 헤더 정규화**: 복잡한 헤더 구조 자동 정리
- ✅ **표준 컬럼 매핑**: HR 표준 필드로 자동 매핑

### 🔄 데이터 변환
- ✅ **타입 변환**: 날짜, 숫자, 텍스트 자동 형변환
- ✅ **데이터 검증**: 누락값, 형식 오류 자동 탐지
- ✅ **다중 내보내기**: JSON, CSV, XLSX 형식 지원

### 🛡️ 보안 & 편의성
- ✅ **완전한 오프라인 작업**: 데이터가 외부로 전송되지 않음
- ✅ **Self-Test 진단**: 앱 상태 자동 점검
- ✅ **원클릭 실행**: VBScript로 간편 시작

## 📸 스크린샷

> 추후 앱 실행 화면 스크린샷 추가 예정

## 📁 프로젝트 구조

```
local_app/
├── start.vbs         # 🚀 원클릭 실행 파일
├── main.js          # Electron 메인 프로세스
├── preload.js       # 보안 컨텍스트 브리지
├── package.json     # 앱 설정 및 의존성
├── dist/           # React 앱 빌드 파일
├── assets/         # 아이콘 및 리소스
└── release/        # 빌드된 실행파일
```

## 🔒 보안 기능

- **컨텍스트 격리**: Node.js API 직접 접근 차단
- **샌드박스**: 렌더러 프로세스 보안 격리
- **외부 링크 보호**: 기본 브라우저에서 안전하게 열기
- **새 창 생성 방지**: 악성 팝업 차단

## 💻 시스템 요구사항

### 최소 요구사항
- **OS**: Windows 10 (64bit) 이상
- **Node.js**: 16.0.0 이상
- **RAM**: 최소 4GB
- **디스크**: 100MB 여유 공간

### 권장 요구사항
- **OS**: Windows 11 (64bit)
- **Node.js**: 18.0.0 이상 (LTS)
- **RAM**: 8GB 이상
- **디스크**: 500MB 여유 공간

## 🐛 문제 해결

### Node.js 설치 오류
```bash
# Node.js 설치 확인
node --version
npm --version

# 설치되지 않은 경우
# https://nodejs.org 에서 LTS 버전 다운로드
```

### 의존성 설치 실패
```bash
# npm 캐시 정리
npm cache clean --force

# 재설치
rm -rf node_modules
npm install
```

### 앱 실행 실패
1. `start.vbs` 대신 터미널에서 직접 실행해보세요
2. 방화벽/백신 프로그램 예외 설정 확인
3. Windows 관리자 권한으로 실행

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
