const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// 개발 모드 확인
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // 메인 윈도우 생성
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'HR 데이터 정규화 도구 v3.1',
    show: false
  });

  // 앱이 준비되면 창 표시
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // 개발자 도구는 개발 모드에서만 열기
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // React 앱 로드
  const distPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(distPath)) {
    mainWindow.loadFile(distPath);
  } else {
    // 빌드된 파일이 없으면 오류 페이지 표시
    mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>빌드 필요</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 500px;
              margin: 0 auto;
            }
            h1 { color: #dc3545; }
            code { 
              background: #f8f9fa; 
              padding: 2px 6px; 
              border-radius: 3px;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>앱을 시작하기 전에</h1>
            <p>React 앱을 먼저 빌드해야 합니다.</p>
            <p>터미널에서 다음 명령을 실행하세요:</p>
            <p><code>cd local_app && npm run build-web</code></p>
            <p>그 다음 앱을 다시 시작하세요.</p>
          </div>
        </body>
      </html>
    `));
  }

  // 외부 링크는 기본 브라우저에서 열기
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // 창이 닫힐 때
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 메뉴 설정
function createMenu() {
  const template = [
    {
      label: '파일',
      submenu: [
        {
          label: '새로 고침',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) {
              mainWindow.reload();
            }
          }
        },
        {
          label: '개발자 도구',
          accelerator: 'F12',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          }
        },
        { type: 'separator' },
        {
          label: '종료',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '도움말',
      submenu: [
        {
          label: '정보',
          click: async () => {
            await dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '앱 정보',
              message: 'HR 데이터 정규화 도구',
              detail: `버전: 3.1.0
엑셀/CSV 파일을 표준화된 형식으로 변환하는 도구입니다.

개발: HR Tools Team
라이선스: MIT`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// 앱 이벤트 핸들러
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    // macOS에서 앱이 활성화될 때
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // macOS가 아닌 경우 앱 종료
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 보안: 새 창 생성 방지
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

// Electron 파일 저장 IPC 핸들러
ipcMain.handle('save-file', async (event, { data, defaultPath, filters }) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath,
      filters: filters || [
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (result.canceled) {
      return { success: false, canceled: true };
    }

    // 데이터가 base64 형태면 디코딩
    let fileData;
    if (typeof data === 'string' && data.startsWith('data:')) {
      const base64Data = data.split(',')[1];
      fileData = Buffer.from(base64Data, 'base64');
    } else if (typeof data === 'string') {
      fileData = data;
    } else {
      fileData = Buffer.from(data);
    }

    await fs.promises.writeFile(result.filePath, fileData);
    return { success: true, filePath: result.filePath };
  } catch (error) {
    console.error('Save file error:', error);
    return { success: false, error: error.message };
  }
});

// 앱이 준비되지 않은 상태에서의 창 생성 방지
app.on('ready', () => {
  if (isDev) {
    console.log('Electron app started in development mode');
  }
});