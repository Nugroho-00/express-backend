const db = require('../helpers/db')
const table1 = 'chart'
const table2 = 'user'
const table3 = 'item'

module.exports = {
  createChartModel: (arr, cb) => {
    db.query(`INSERT INTO ${table1} (userID, itemsID) VALUES (${arr[0]}, ${arr[1]})`, (err, result, field) => {
      cb(err, result)
    })
  },
  getChartModel: (arr, limit, offset, cb) => {
    db.query(`SELECT ${table1}.id, ${table2}.userName, ${table3}.name, ${table3}.price, ${table1}.createdAt FROM ${table1} 
    INNER JOIN ${table2} ON ${table1}.userID = ${table2}.id
    INNER JOIN ${table3} ON ${table1}.itemsID = ${table3}.id
    WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ${limit} OFFSET ${offset}`, (_err, result, field) => {
      cb(_err, result)
    })
  },
  ChartModel: (arr, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table1} WHERE ${arr[0]} LIKE '%${arr[1]}%'`, (_err, result, field) => {
      cb(result)
    })
  },
  getChartIdModel: (id, cb) => {
    db.query(`SELECT * FROM ${table1} WHERE id=${id}`, (err, result, field) => {
      cb(err, result)
    })
  },
  updatePartialChartModel: (arr, cb) => {
    db.query(`UPDATE ${table1} SET ${arr[0]} WHERE id=${arr[1]}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteChartModel: (id, cb) => {
    db.query(`DELETE FROM ${table1} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
