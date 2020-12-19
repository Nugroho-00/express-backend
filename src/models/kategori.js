const table = 'categories'
const table1 = 'items'
const model = require('../helpers/connection')

const column = 'categories.id, items.name AS itemName, items.price, items.description, categories.name AS categori, conditions.name AS conditions, color.name AS color, image.picture AS picture, items.create_at, items.update_at '
const join = 'INNER JOIN conditions ON conditions.id=items.condition_id INNER JOIN categories ON categories.id=items.category_id INNER JOIN color ON color.id=items.color_id INNER JOIN image ON image.items_id=items.id'

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} (name) VALUES (?)`
    const results = model(query, data)
    return results
  },
  countModel: (arr) => {
    const query = `SELECT COUNT(*) as count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]}`
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  countDetailModel: (arr, data = {}) => {
    const query = `SELECT COUNT(*) as count FROM items WHERE category_id=? AND ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]}`
    const results = model(query, data)
    return results
  },
  detailModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table1} ${join} WHERE ${table}.id=? AND ${table}.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${table}.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
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
