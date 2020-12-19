const ratingModel = require('../models/rating')
const responseStandard = require('../helpers/response')
const { rating: schema } = require('../helpers/validation')

module.exports = {
  create: async (req, res) => {
    const { id: userId } = req.data
    const { id } = req.params
    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      results = {
        ...results,
        items_id: id,
        user_id: userId
      }
      const rating = await ratingModel.createModel(results)
      if (rating.affectedRows) {
        results = {
          id: rating.insertId,
          ...results
        }
        return responseStandard(res, 'Thank you for give a rating!', { results })
      } else {
        return responseStandard(res, 'Failed to give rating', {}, 500, false)
      }
    }
  }
}
