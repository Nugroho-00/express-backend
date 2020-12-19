const table = 'items'
const tableColor = 'color'
const tablePicture = 'image'
const model = require('../helpers/connection')

const column = 'items.id,items.name AS itemName,price,description, categories.name AS category,conditions.name AS conditions,color.name AS color,image.picture AS picture,AVG(rating.rating) AS rating, items.create_at, items.update_at'
const join = `LEFT JOIN conditions ON conditions.id=items.condition_id 
LEFT JOIN categories ON categories.id=items.category_id
LEFT JOIN color ON color.id=items.color_id
LEFT JOIN image ON image.items_id=items.id 
LEFT JOIN rating ON rating.items_id=items.id
`
module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  createPictureModel: (data = []) => {
    const query = `INSERT INTO ${tablePicture} (items_id, picture) VALUES (?, ?), (?, ?)`
    const results = model(query, data)
    return results
  },
  countModel: (arr) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search}`
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE items.${arr[0]} LIKE '%${arr[1]}%' GROUP BY items.id ORDER BY items.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  getNewModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE items.${arr[0]} LIKE '%${arr[1]}%' AND items.condition_id = 1  GROUP BY items.id ORDER BY items.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  getPopularModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE items.${arr[0]} LIKE '%${arr[1]}%' AND items.condition_id = 2 GROUP BY items.id ORDER BY items.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = {}) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.id=?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET ? WHERE ?`
    const results = model(query, data)
    return results
  },
  updateColorModel: (data = []) => {
    const query = `UPDATE ${tableColor} SET ? WHERE ?`
    const results = model(query, data)
    return results
  },
  // updatePictModel: (data = []) => {
  //   const query = `UPDATE ${tablePict} SET (image) VALUES (?), (?) WHERE items_id=?`
  //   const results = model(query, data)
  //   return results
  // },
  deleteModel: (data = {}) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    const results = model(query, data)
    return results
  },
  getSellerModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE items.seller_id=? AND items.${arr[0]} LIKE '%${arr[1]}%' ORDER BY items.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  detailSellerModel: (data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE items.seller_id=? ${table}.id=?`
    const results = model(query, data)
    return results
  }
}
