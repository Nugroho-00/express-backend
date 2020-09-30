const db = require('../helpers/db')
const table = 'roles'

module.exports = {
  getDetailRoleModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getRoleUserModel: (data = []) => {
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
  countRoleModel: () => {
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
  createRoleModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, description) values ('${arr[0]}', '${arr[1]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  updatePartialRoleModel: (id, data, cb) => {
    db.query(`UPDATE ${table} SET ${data} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteRoleUserModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
