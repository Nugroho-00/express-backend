const table = 'store'
const model = require('../helpers/connection')

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  getModel: (data = {}) => {
    const query = `SELECT * FROM ${table} WHERE ?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET ? WHERE user_id=?`
    const results = model(query, data)
    return results
  }
}
