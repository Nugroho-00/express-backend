const db = require('../helpers/db')
const table = 'user_detail'

module.exports = {
  getIdProfileModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id= ${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  getProfileModel: (data = []) => {
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
  countProfileModel: () => {
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
  createProfileModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (userId, name, email, phoneNumber, gender, dateBirth, picture) VALUES (${arr[0]}, '${arr[1]}', '${arr[2]}', ${arr[3]}, '${arr[4]}', '${arr[5]}', '${arr[6]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  updateProfileModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET name = '${arr[0]}', email = '${arr[1]}', phoneNumber = '${arr[2]}', gender = '${arr[3]}', dateBirth = '${arr[4]}', picture = '${arr[5]}'  WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  updatePartialProfileModel: (arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr[0]} WHERE id=${arr[1]}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteProfileModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
