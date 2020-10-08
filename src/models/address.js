const db = require('../helpers/db')
const table = 'user_address'

module.exports = {
  getIdAddressModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getAddressModel: (data = []) => {
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
  countAddressModel: () => {
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
  createAddressModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (userId, nameAddress, nameReciever, phoneNumber, address, postalCode, city, isPrimary) VALUES (${arr[0]}, '${arr[1]}', '${arr[2]}', ${arr[3]}, '${arr[4]}', ${arr[5]}, '${arr[6]}', '${arr[7]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  updatePartAddressModel: (id, data, cb) => {
    db.query(`UPDATE ${table} SET ${data} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteAddressModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
