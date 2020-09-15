const db = require('../helpers/db')
const table = 'category'
// const table1 = 'item'

module.exports = {
  getIdCategoryModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result, field) => {
      cb(err, result)
    })
  },
  getCategoryModel: (cb) => {
    db.query(`SELECT * FROM ${table}`, (err, result, field) => {
      cb(err, result)
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
