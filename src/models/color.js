const table = 'color'
const model = require('../helpers/connection')

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} (name) VALUES (?)`
    const results = model(query, data)
    return results
  },
  countModel: () => {
    const query = `SELECT COUNT(*) as count FROM ${table}`
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = {}) => {
    const query = `SELECT * FROM ${table} WHERE id=?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET name = ? WHERE id = ?`
    const results = model(query, data)
    return results
  },
  deleteModel: (data = {}) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    const results = model(query, data)
    return results
  }
}
