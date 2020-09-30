const qs = require('querystring')
const responseStandard = require('../helpers/response')
const {
  getIdItemModel, getItemsModel, itemsModel, createItemModel,
  updateItemModel, updatePartialItemModel, deleteItemModel
} = require('../models/items')

module.exports = {
  getItemId: (req, res) => {
    const { id } = req.params
    getIdItemModel(id, data => {
      return responseStandard(res, `Detail item with ${id}`, { data })
    })
  },
  createItem: (req, res) => {
    const { name, price, description, kategoryId, nameKategory } = req.body
    console.log(req.file)
    if (name && price && description && kategoryId && nameKategory) {
      createItemModel([name, price, description, kategoryId, nameKategory], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Item has been created',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed create Item'
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },
  getItems: (req, res) => {
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
      limit = 10
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    getItemsModel(searchKey, searchValue, sortColumn, sortValue, limit, offset, (err, result) => {
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
          itemsModel([searchKey, searchValue], data => {
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
              pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            res.send({
              success: true,
              message: 'List of items',
              data: result,
              pageInfo
            })
          })
        } else {
          res.send({
            success: true,
            message: 'There is no list items'
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
  updateItem: (req, res) => {
    const { id } = req.params
    const { name, price, description, kategoryId, nameKategory } = req.body
    if (name.trim() && price.trim() && description.trim() && kategoryId.trim() && nameKategory.trim()) {
      getIdItemModel(id, result => {
        if (result.length) {
          updateItemModel(id, [name, price, description, kategoryId, nameKategory], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `items with id ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update data'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `items with id ${id} not found`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'All fileds must be filled'
      })
    }
  },
  updatePartialItem: (req, res) => {
    const { id } = req.params
    const { name = '', price = '', description = '', kategoryId = '', nameKategory = '' } = req.body
    if (name.trim() || price.trim() || description.trim() || kategoryId.trim() || nameKategory.trim()) {
      getIdItemModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialItemModel([data, id], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Items ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update data'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `There is no item with id ${id}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'At least one column is filled'
      })
    }
  },
  deleteItem: (req, res) => {
    const {
      id
    } = req.params
    getIdItemModel(id, result => {
      if (result.length) {
        deleteItemModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Item with id ${id} has been deleted!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete data'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Data not found!!'
        })
      }
    })
  }
}
