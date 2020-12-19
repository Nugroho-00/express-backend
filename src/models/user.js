const table = 'users'
const tableDetail = 'userdetail'
const model = require('../helpers/connection')

const column = 'users.id, users.role_id, userdetail.name, users.email, users.password, userdetail.phone, userdetail.gender_id, gender.name AS gender, userdetail.birthdate, userdetail.image AS image'
const join = 'INNER JOIN userdetail ON userdetail.user_id=users.id LEFT JOIN gender ON gender.id=userdetail.gender_id'

module.exports = {
  createUserModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  createDetailModel: (data = {}) => {
    const query = `INSERT INTO ${tableDetail} SET ?`
    const results = model(query, data)
    return results
  },
  checkEmailModel: (data = {}) => {
    const query = `SELECT * FROM ${table} WHERE ?`
    const results = model(query, data)
    return results
  },
  checkPhoneModel: (data = {}) => {
    const query = `SELECT * FROM ${tableDetail} WHERE ?`
    const results = model(query, data)
    return results
  },
  getByCondition: (data = []) => {
    const query = `SELECT * FROM ${table} WHERE ? AND ?`
    const results = model(query, data)
    return results
  },
  getUsersModel: (arr, data = []) => {
    const user = 'users.id, role.name AS role, users.email, users.password'
    const role = 'LEFT JOIN role ON role.id=users.role_id'
    const search = `WHERE users.${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT ${user} FROM ${table} ${role} ${search} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailUserModel: (data = {}) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE users.id=?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  detailAdminModel: (data = {}) => {
    const query = `SELECT * FROM ${table} WHERE users.id=?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  countUsersModel: (arr) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search}`
    const results = model(query)
    return results
  },
  updateUserPartialModel: (data = []) => {
    const query = `UPDATE ${table} SET ? WHERE id=?`
    const results = model(query, data)
    return results
  },
  updateDetailPartialModel: (arr, data = {}) => {
    const query = `UPDATE ${tableDetail} SET ${arr} WHERE user_id=?`
    const results = model(query, data)
    return results
  },
  deleteUserModel: (data = {}) => {
    const query = `DELETE FROM ${table} WHERE id=?`
    const results = model(query, data)
    return results
  }
}
