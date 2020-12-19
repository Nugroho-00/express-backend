const colorModel = require('../models/color')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')

module.exports = {
  create: async (req, res) => {
    const { name } = req.body
    if (name) {
      const results = await colorModel.createModel(name)
      const data = {
        id: results.insertId,
        ...req.body
      }
      responseStandard(res, 'Color has been created!', { data }, 201)
    } else {
      responseStandard(res, 'Try again! Please insert role name!', {}, 400, false)
    }
  },
  getColor: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await colorModel.countModel()
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await colorModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    if (results.length) {
      return responseStandard(res, 'List of Colors', { results, pageInfo })
    } else {
      return responseStandard(res, 'There is no data in list', {}, 404, false)
    }
  },
  detailColor: async (req, res) => {
    const { id } = req.params
    const results = await colorModel.detailModel(id)
    if (results.length) {
      responseStandard(res, `Color with id ${id}`, { results })
    } else {
      responseStandard(res, `Color with id ${id} is not found`, {}, 404, false)
    }
  },
  updateColor: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const isExist = await colorModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await colorModel.updateModel([name, id])
      if (results.affectedRows) {
        responseStandard(res, 'Color\'s name has been updated!')
      } else {
        responseStandard(res, 'Failed to update name!', {}, 304, false)
      }
    } else {
      responseStandard(res, `Color with id ${id} is not found`, {}, 404, false)
    }
  },
  deleteColor: async (req, res) => {
    const { id } = req.params
    const isExist = await colorModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await colorModel.deleteModel(id)
      if (results.affectedRows) {
        responseStandard(res, `Color with id ${id} has been deleted`)
      } else {
        responseStandard(res, `Failed to delete role with id ${id}`, {}, 500, false)
      }
    } else {
      responseStandard(res, `Color with id ${id} is not found`, {}, 404, false)
    }
  }
}
