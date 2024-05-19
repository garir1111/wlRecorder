import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import GameResultDB from './gameResultDB'
import SystemLogger from './systemLogger'

let gameDB: GameResultDB | null = null
let sysLog: SystemLogger | null = null

function createWindow(): void {
  // DBの初期化
  gameDB = new GameResultDB()
  gameDB.initDB()
  // シスログの初期化
  sysLog = new SystemLogger()
  sysLog.init()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    minWidth: 600,
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
  ipcMain.on('upCount', (_e, param1) => {
    sysLog?.write(`upCount(${param1})の呼び出し`)
    gameDB?.insert(param1)
  })

  // カウントダウン通知が来たときの挙動
  ipcMain.on('downCount', (_e, param1) => {
    sysLog?.write(`downCount(${param1})の呼び出し`)
    gameDB?.deleteLatest(param1)
  })

  // createWindow 関数を呼び出し、gameDB インスタンスを作成
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  gameDB?.close()
  sysLog?.close()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
