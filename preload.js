const { contextBridge, ipcRenderer } = require('electron');

// 보안을 위한 컨텍스트 브리지 설정
contextBridge.exposeInMainWorld('electronAPI', {
  // 앱 정보 가져오기
  getAppVersion: () => {
    return process.env.npm_package_version || '3.1.0';
  },
  
  // 플랫폼 정보
  getPlatform: () => {
    return process.platform;
  },
  
  // 개발 모드 확인
  isDevelopment: () => {
    return process.env.NODE_ENV === 'development';
  },
  
  // Electron 환경 확인
  isElectron: () => {
    return true;
  },
  
  // 파일 저장
  saveFile: (data, defaultPath, filters) => {
    return ipcRenderer.invoke('save-file', { data, defaultPath, filters });
  }
});

// 보안 강화: Node.js API 접근 차단
window.addEventListener('DOMContentLoaded', () => {
  // 개발 모드에서만 콘솔 로그 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('HR 데이터 정규화 도구 Electron 앱이 로드되었습니다.');
  }
});