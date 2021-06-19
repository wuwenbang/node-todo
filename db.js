import p, { resolve } from 'path'
import fs from 'fs'

const home = process.env.HOME || process.env.USERPROFILE
const dbPath = p.join(home, '.todo')
const db = {
  // 读取数据
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      try {
        const data = fs.readFileSync(path, { flag: 'a+', encoding: 'utf-8' })
        let list
        try {
          list = JSON.parse(data)
        } catch (err) {
          list = []
        }
        resolve(list)
      } catch (err) {
        reject(err)
      }
    })
  },
  // 写入数据
  write(data, path = dbPath) {
    return new Promise((resolve, reject) => {
      const str = JSON.stringify(data)
      fs.writeFile(path, str + '\n', (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  },
  // 清除数据
  clear(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, '', (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  },
}

export default db
