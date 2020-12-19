const storesModels = require('../models/store')
const responseStandard = require('../helpers/response')

module.exports = {
  getDetailStore: async (req, res) => {
    const { id } = req.data
    const detail = await storesModels.getModel({ user_id: id })
    if (detail.length) {
      return responseStandard(res, 'Detail of Store', { data: detail })
    } else {
      return responseStandard(res, 'Store not found', {}, 404, false)
    }
  },
  updateStore: async (req, res) => {
    const { id: idUser } = req.data
    const update = await storesModels.updateModel([req.body, idUser])
    if (update.affectedRows) {
      return responseStandard(res, 'Store Profile has been updated')
    } else {
      return responseStandard(res, 'Failed to update store profile', {}, 400, false)
    }
  }
}
