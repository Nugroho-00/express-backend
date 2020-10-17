const db = require('../helpers/db')
const table = 'category'
const table1 = 'item'

module.exports = {
  getIdCategoryModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result, field) => {
      cb(err, result)
    })
  },
  getAllCategoryModel: (arr, sort, num, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${sort[0]} ${sort[1]} LIMIT ${num[0]} OFFSET ${num[1]} `, (_err, result, field) => {
      cb(_err, result)
    })
  },
  searchCategoryModel: (search, sort, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table1} WHERE ${search[0]} LIKE '%${search[1]}%' ORDER BY ${sort[0]} ${sort[1]} `, (_err, data, field) => {
      cb(data)
    })
  },
  createCategoryModel: (name, cb) => {
    db.query(`INSERT INTO ${table} (name) values ('${name}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  updateCategoryModel: (id, name, cb) => {
    db.query(`UPDATE ${table} set name = '${name}' WHERE id = ${id}`, (err, result, field) => {
      cb(err, result)
    })
  },
  deleteCategoryModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, result, field) => {
      cb(err, result)
    })
  }
}
