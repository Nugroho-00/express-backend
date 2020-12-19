const conditionModel = require('../models/conditions')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')

module.exports = {
  create: async (req, res) => {
    const { name } = req.body
    if (name) {
      const results = await conditionModel.createModel(name)
      const data = {
        id: results.insertId,
        ...req.body
      }
      responseStandard(res, 'Condition has been created!', { data }, 201)
    } else {
      responseStandard(res, 'Try again! Please insert role name!', {}, 400, false)
    }
  },
  getCondition: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await conditionModel.countModel()
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await conditionModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    if (results.length) {
      return responseStandard(res, 'List of Conditions', { results, pageInfo })
    } else {
      return responseStandard(res, 'There is no data in list', {}, 404, false)
    }
  },
  detailCondition: async (req, res) => {
    const { id } = req.params
    const results = await conditionModel.detailModel(id)
    if (results.length) {
      responseStandard(res, `Condition with id ${id}`, { results })
    } else {
      responseStandard(res, `Condition with id ${id} is not found`, {}, 404, false)
    }
  },
  updateCondition: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const isExist = await conditionModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await conditionModel.updateModel([name, id])
      if (results.affectedRows) {
        responseStandard(res, 'Condition\'s name has been updated!')
      } else {
        responseStandard(res, 'Failed to update name!', {}, 304, false)
      }
    } else {
      responseStandard(res, `Condition with id ${id} is not found`, {}, 404, false)
    }
  },
  deleteCondition: async (req, res) => {
    const { id } = req.params
    const isExist = await conditionModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await conditionModel.deleteModel(id)
      if (results.affectedRows) {
        responseStandard(res, `Condition with id ${id} has been deleted`)
      } else {
        responseStandard(res, `Failed to delete role with id ${id}`, {}, 500, false)
      }
    } else {
      responseStandard(res, `Condition with id ${id} is not found`, {}, 404, false)
    }
  }
}
