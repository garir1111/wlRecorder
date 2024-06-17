import { app } from 'electron'
const fs = require('fs')
const path = require('path')

class manageSettings {
  dirPath: string
  fileName: string
  filePath: string

  constructor() {
    this.dirPath = app.isPackaged
      ? path.join(__dirname, '../../../../setting')
      : path.join(__dirname, '../../setting')
    this.fileName = 'settings.json'

    // フォルダの存在確認
    if (!fs.existsSync(this.dirPath)) {
      // フォルダが存在しない場合、作成する
      fs.mkdirSync(this.dirPath, { recursive: true })
      console.log(`Directory created: ${this.dirPath}`)
    }

    // ファイルパスの作成
    this.filePath = path.join(this.dirPath, this.fileName)

    // ファイルの作成
    fs.writeFileSync(this.filePath, '')
  }

  //TODO: 値の読み取りを行う関数
  // load(): void {}

  //TODO: 値の更新を行う関数
  // renew(): void {}
}

export default manageSettings
