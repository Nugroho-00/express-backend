const table = 'transactions'
const tableStore = 'store'
const model = require('../helpers/connection')

const column = `${table}.id, ${table}.transaction_id, ${tableStore}.name AS store, ${table}.items_name, ${table}.price, ${table}.quantity, ${table}.total_price, ${table}.delivery_fee, ${table}.summary, ${table}.created_at`
const join = `LEFT JOIN ${tableStore} ON ${tableStore}.user_id=${table}.seller_id`

module.exports = {
  createModel: (data = []) => {
    const query = `INSERT INTO ${table} SET ?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  countModel: (arr) => {
    const query = `SELECT COUNT(*) as count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' `
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${table}.created_at DESC LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.user_id=? AND ${table}.id=?`
    const results = model(query, data)
    return results
  }
}
