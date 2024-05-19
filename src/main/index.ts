import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import gameResultDB from './gameResultDB'
import gameResultFile from './gameResultFile'
import SystemLogger from './systemLogger'

let resultDB: gameResultDB | null = null
let sysLog: SystemLogger | null = null
let resultFile: gameResultFile | null = null

function createWindow(): void {
  // DBの初期化
  resultDB = new gameResultDB()
  resultDB.initDB()

  // シスログの初期化
  sysLog = new SystemLogger()
  sysLog.init()

  // 結果ファイルの初期化
  resultFile = new gameResultFile()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 550,
    height: 500,
    minWidth: 550,
    minHeight: 500,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// app イベントの処理
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // カウントアップ通知が来たときの挙動
  ipcMain.on('upCount', (_e, state) => {
    sysLog?.write(`upCount(${state})の呼び出し`)
    resultDB?.insert(state)
  })

  // カウントダウン通知が来たときの挙動
  ipcMain.on('downCount', (_e, state) => {
    sysLog?.write(`downCount(${state})の呼び出し`)
    resultDB?.deleteLatest(state)
  })

  // テキスト更新通知が来たときの挙動
  ipcMain.on('rewriteFile', (_e, w, t, l) => {
    sysLog?.write(`${w}, ${t}, ${l}でファイル更新`)
    resultFile?.write(w, t, l)
  })

  // createWindow 関数を呼び出し、resultDB インスタンスを作成
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  resultDB?.close()
  sysLog?.close()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
