const categoriesModel = require('../models/kategori')
const responseStandard = require('../helpers/response')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')
const paging = require('../helpers/pagination')

module.exports = {
  create: async (req, res) => {
    const { name } = req.body
    if (name) {
      const results = await categoriesModel.createModel(name)
      const data = {
        id: results.insertId,
        ...req.body
      }
      responseStandard(res, 'Category has been created!', { data }, 201)
    } else {
      responseStandard(res, 'Try again! Please insert role name!', {}, 400, false)
    }
  },
  getCategories: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await categoriesModel.countModel([searchKey, searchValue, sortKey, sortBy])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await categoriesModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    if (results.length) {
      return responseStandard(res, 'List of Category', { data: results, pageInfo })
    } else {
      return responseStandard(res, 'There is no item in list', {}, 404, false)
    }
  },
  detailCategory: async (req, res) => {
    const { id } = req.params
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await categoriesModel.countDetailModel([searchKey, searchValue, sortKey, sortBy], id)
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await categoriesModel.detailModel([searchKey, searchValue, sortKey, sortBy], [id, limit, offset])
    if (results.length) {
      responseStandard(res, `Category with id ${id}`, { results, pageInfo })
    } else {
      responseStandard(res, `Category with id ${id} is not found`, {}, 404, false)
    }
  },
  updateCategories: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const isExist = await categoriesModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await categoriesModel.updateModel([name, id])
      if (results.affectedRows) {
        responseStandard(res, 'Category\'s name has been updated!')
      } else {
        responseStandard(res, 'Failed to update name!', {}, 304, false)
      }
    } else {
      responseStandard(res, `Category with id ${id} is not found`, {}, 404, false)
    }
  },
  deleteCategories: async (req, res) => {
    const { id } = req.params
    const isExist = await categoriesModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await categoriesModel.deleteModel(id)
      if (results.affectedRows) {
        responseStandard(res, `Category with id ${id} has been deleted`)
      } else {
        responseStandard(res, `Failed to delete category with id ${id}`, {}, 500, false)
      }
    } else {
      responseStandard(res, `Category with id ${id} is not found`, {}, 404, false)
    }
  }
}
