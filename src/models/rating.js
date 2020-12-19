const table = 'rating'
const model = require('../helpers/connection')

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  }
}
