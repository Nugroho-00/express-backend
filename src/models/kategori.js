const db = require('../helpers/db')
const table = 'category'
// const table1 = 'item'

module.exports = {
  getIdCategoryModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result, field) => {
      cb(err, result)
    })
  },
  getCategoryModel: (searchKey, searchValue, sortColumn, sortValue, limit, offset, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY ${sortColumn} ${sortValue} LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
      cb(err, result)
    })
  },
  countModel: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, data, field) => {
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
