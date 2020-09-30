const db = require('../helpers/db')
const table = 'item'

module.exports = {
  getIdItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, fields) => {
      cb(result)
    })
  },
  getItemsModel: (searchKey, searchValue, sortColumn, sortValue, limit, offset, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${searchKey} LIKE '%${searchValue}%' ORDER BY ${sortColumn} ${sortValue} LIMIT ${limit} OFFSET ${offset}`, (err, result, field) => {
      cb(err, result)
    })
  },
  itemsModel: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, data, field) => {
      cb(data)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, description, kategoryID, nameKategory) VALUES ('${arr[0]}', ${arr[1]},'${arr[2]}', ${arr[3]}, '${arr[4]}')`, (err, result, field) => {
      cb(err, result)
    })
  },
  updateItemModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET name = '${arr[0]}', price = ${arr[1]}, description = '${arr[2]}', kategoryID = ${arr[3]}, nameKategory = '${arr[4]}'  WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  updatePartialItemModel: (arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr[0]} WHERE id=${arr[1]}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
