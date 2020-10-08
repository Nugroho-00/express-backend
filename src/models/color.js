const db = require('../helpers/db')
const table = 'color_item'

module.exports = {
  getIdColorModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getColorModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} LIMIT ? OFFSET ?`, data, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  countColorModel: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS count FROM ${table}`, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result[0].count)
        }
      })
    })
  },
  createColorModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (colorName) VALUES ('${arr[0]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  deleteColorModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
