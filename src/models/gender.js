const db = require('../helpers/db')
const table = 'gender'

module.exports = {
  createCondModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name) VALUES ('${arr[0]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  getIdCondModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getCondModel: (data = {}) => {
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
  countCondModel: () => {
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
  deleteCondModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
