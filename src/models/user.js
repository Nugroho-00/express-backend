const db = require('../helpers/db')
const table = 'user'

module.exports = {
  getIdUserModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getAllUserModel: (searchKey, searchValue, sortColumn, sortValue, limit, offset, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY ${sortColumn} ${sortValue} LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
      cb(err, result)
    })
  },
  userModel: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, data, field) => {
      cb(data)
    })
  },
  createUserModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (userName, email, password) VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}')`, (err, result, field) => {
      cb(err, result)
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
