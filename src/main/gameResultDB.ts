const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const path = require('path')

class GameResultDB {
  dbFilePath: string
  // eslint-disable-next-line
  db: any

  constructor() {
    this.dbFilePath = path.join(__dirname, '../../result.db')

    // 一つ上の階層にresult.dbファイルが存在しない場合、ファイルを作成する
    if (!fs.existsSync(this.dbFilePath)) {
      fs.writeFileSync(this.dbFilePath, '')
      console.log('result.dbファイルが作成されました。')
    } else {
      console.log('result.dbファイルは既に存在します。')
    }

    this.db = new sqlite3.Database(this.dbFilePath, (err: Error) => {
      if (err) {
        console.error('データベース接続エラー:', err.message)
      } else {
        console.log('データベース接続成功')
      }
    })
  }

  initDB(): void {
    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS game_results (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          day DATE,
          time TIME,
          result CHAR(1) CHECK (result IN ('w', 'l', 't'))
        );`,
        (err: Error) => {
          if (err) {
            console.error('テーブル作成エラー:', err.message)
          }
        }
      )
    })
  }

  insert(result: 'w' | 'l' | 't'): void {
    // 新しい日付と時刻を取得
    const currentDate = new Date()
    const day = currentDate.toISOString().split('T')[0]
    const time = currentDate.toTimeString().split(' ')[0]

    this.db.run(
      `INSERT INTO game_results (day, time, result) VALUES (?, ?, ?);`,
      [day, time, result],
      (err: Error) => {
        if (err) {
          console.error('データ挿入エラー:', err.message)
        } else {
          console.log('データ挿入成功')
        }
      }
    )
  }

  deleteLatest(result: 'w' | 'l' | 't'): void {
    this.db.run(
      `DELETE FROM game_results
        WHERE id = (
          SELECT id FROM game_results
          WHERE result = ?
          ORDER BY id DESC
          LIMIT 1
        );`,
      result,
      (err: Error) => {
        if (err) {
          console.error('データ削除エラー:', err.message)
        } else {
          console.log(`最新の${result}削除成功`)
        }
      }
    )
  }

  close(): void {
    this.db.close((err: Error) => {
      if (err) {
        console.error('データベース閉鎖エラー:', err.message)
      } else {
        console.log('データベース閉鎖成功')
      }
    })
  }
}

export default GameResultDB
