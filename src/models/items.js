const db = require('../helpers/db')
const table = 'item'
const table1 = 'category'
const table2 = 'color_item'
const table3 = 'conditions_item'

module.exports = {
  getIdItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, fields) => {
      cb(result)
    })
  },
  getItemsModel: (searchKey, searchValue, sortColumn, sortValue, limit, offset, cb) => {
    db.query(`SELECT ${table}.id, ${table1}.category, ${table}.name, ${table2}.colorName, ${table3}.conditionsItem, ${table}.price, ${table}.description, ${table}.createdAt, ${table}.updatedAt
    FROM ${table} INNER JOIN ${table1} ON ${table}.categoryId = ${table1}.id
    INNER JOIN ${table2} ON ${table}.colorId = ${table2}.id
    INNER JOIN ${table3} ON ${table}.conditionsId = ${table3}.id
    WHERE ${searchKey} 
    LIKE '%${searchValue}%' 
    ORDER BY ${sortColumn} ${sortValue} 
    LIMIT ${limit} 
    OFFSET ${offset}`, (err, result, field) => {
      cb(err, result)
    })
  },
  itemsModel: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, data, field) => {
      cb(data)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, description, categoryId, colorId, conditionsId) VALUES ('${arr[0]}', ${arr[1]},'${arr[2]}', ${arr[3]}, ${arr[4]}, ${arr[5]})`, (err, result, field) => {
      cb(err, result)
    })
  },
  updateItemModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET name = '${arr[0]}', price = ${arr[1]}, description = '${arr[2]}', categoryId = ${arr[3]}, colorId = ${arr[4]}, conditionsId = ${arr[5]}  WHERE id=${id}`, (_err, result, field) => {
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
