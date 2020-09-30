const qs = require('querystring')
const { getIdCategoryModel, getCategoryModel, countModel, createCategoryModel, updateCategoryModel, deleteCategoryModel } = require('../models/kategori')

module.exports = {
  getIdCategory: (req, res) => {
    const { id } = req.params
    getIdCategoryModel(id, (err, result) => {
      if (!err) {
        if (result.length) {
          res.send({
            success: true,
            message: `category with id ${id}`,
            data: result
          })
        } else {
          res.send({
            success: false,
            message: 'No category found',
            data: result
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Internal server error'
        })
      }
    })
  },
  getCategory: (req, res) => {
    let { page, limit, search, sort } = req.query
    let searchKey = ''
    let searchValue = ''
    let sortColumn = ''
    let sortValue = ''
    console.log(typeof search)
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }
    if (typeof sort === 'object') {
      sortColumn = Object.keys(sort)[0]
      sortValue = Object.values(sort)[0]
    } else {
      sortColumn = 'id'
      sortValue = sort || ''
    }
    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    getCategoryModel(searchKey, searchValue, sortColumn, sortValue, limit, offset, (err, result) => {
      if (!err) {
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          limitPage: limit,
          nextLink: null,
          prevLink: null
        }
        if (result.length) {
          countModel([searchKey, searchValue], data => {
            const {
              count
            } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)
            const {
              pages,
              currentPage
            } = pageInfo
            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/category?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            res.send({
              success: true,
              message: 'List of category',
              data: result,
              pageInfo
            })
          })
        } else {
          res.send({
            success: true,
            message: 'There is no list category'
          })
        }
      } else {
        console.log(err)
        res.status(500).send({
          success: false,
          message: 'Internal server Error'
        })
      }
    })
  },
  createCategory: (req, res) => {
    const { name } = req.body
    createCategoryModel(name, (err, result) => {
      if (!err) {
        res.send({
          success: true,
          message: 'Category has been create',
          data: {
            id: result.insertId,
            ...req.body
          }
        })
      } else {
        res.send({
          success: false,
          message: 'All file must be filled'
        })
      }
    })
  },
  updateCategory: (req, res) => {
    const { id } = req.params
    const { name = '' } = req.body
    if (name.trim()) {
      updateCategoryModel(id, name, (err, result) => {
        if (!err) {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Category has ben update with id ${id}!`
            })
          } else {
            res.send({
              success: false,
              message: 'failed to update Category'
            })
          }
        } else {
          res.send({
            success: false,
            message: `category with id ${id} not found`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    deleteCategoryModel(id, (err, result) => {
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Category with id ${id} has been delete!`
          })
        } else {
          res.send({
            success: false,
            message: `failed delete! id ${id} not found!!`
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Category not found'
        })
      }
    })
  }
}
