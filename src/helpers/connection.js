const db = require('../helpers/db')

module.exports = (query, data = []) => {
  // console.log(data)
  return new Promise((resolve, reject) => {
    db.query(query, data, (err, results, _fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
      return (err, results)
    })
  })
}
