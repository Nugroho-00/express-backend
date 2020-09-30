const db = require('../helpers/db')
const table = 'user'

module.exports = {
  getDetailUserModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getUserModel: (data = []) => {
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
  countUserModel: () => {
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
  getUserByCondition: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE ?`, data, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  // userCondition: (arr, cb) => {
  //   db.query(`SELECT * FROM ${table} WHERE '${arr[0]}' AND '${arr[1]}'`, (err, data, _fields) => {
  //     cb(err, data)
  //   })
  // },
  createUserModel: (data = {}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} SET ?`, data, (err, result, _fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updatePartialUserModel: (id, data, cb) => {
    db.query(`UPDATE ${table} SET ${data} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteUserModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
