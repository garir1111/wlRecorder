const fs = require('fs')
const path = require('path')

class gameResultFile {
  dirPath: string
  fileNameWithT: string
  fileNameWithoutT: string
  filePathWithT: string
  filePathWithoutT: string

  constructor() {
    this.dirPath = path.join(__dirname, '../../result')
    this.fileNameWithT = 'w-t-l.txt'
    this.fileNameWithoutT = 'w-l.txt'

    // フォルダの存在確認
    if (!fs.existsSync(this.dirPath)) {
      // フォルダが存在しない場合、作成する
      fs.mkdirSync(this.dirPath, { recursive: true })
      console.log(`Directory created: ${this.dirPath}`)
    }

    // ファイルパスの作成
    this.filePathWithT = path.join(this.dirPath, this.fileNameWithT)
    this.filePathWithoutT = path.join(this.dirPath, this.fileNameWithoutT)

    // ファイルの作成
    fs.writeFileSync(this.filePathWithT, '')
    fs.writeFileSync(this.filePathWithoutT, '')
  }

  write(w: number, t: number, l: number): void {
    fs.writeFileSync(this.filePathWithT, `W-T-L: ${w}-${t}-${l}`)
    fs.writeFileSync(this.filePathWithoutT, `W-L: ${w}-${l}`)
  }
}
export default gameResultFile
