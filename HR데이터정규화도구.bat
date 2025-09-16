@echo off
chcp 65001 > nul
title HR 데이터 정규화 도구 v3.1
echo.
echo ====================================
echo   HR 데이터 정규화 도구 시작 중...
echo ====================================
echo.

cd /d "%~dp0"

REM Node.js 설치 확인
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되지 않았습니다.
    echo.
    echo Node.js를 설치하려면:
    echo 1. https://nodejs.org 방문
    echo 2. LTS 버전 다운로드 및 설치
    echo 3. 컴퓨터 재시작 후 다시 실행
    echo.
    pause
    exit /b 1
)

REM 의존성 설치 확인
if not exist "node_modules" (
    echo [정보] 첫 실행입니다. 필요한 파일들을 설치합니다...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo [오류] 설치 중 문제가 발생했습니다.
        pause
        exit /b 1
    )
)

REM React 앱 빌드 확인
if not exist "dist\index.html" (
    echo [정보] 앱을 준비합니다...
    echo.
    npm run build-web
    if %errorlevel% neq 0 (
        echo [오류] 앱 빌드 중 문제가 발생했습니다.
        pause
        exit /b 1
    )
)

echo [성공] HR 데이터 정규화 도구를 시작합니다!
echo.
echo 앱이 실행되면 이 창을 닫지 마세요.
echo 앱을 종료하려면 이 창에서 Ctrl+C를 누르거나 창을 닫으세요.
echo.

npm start