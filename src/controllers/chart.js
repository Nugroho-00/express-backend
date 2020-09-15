const { qs } = require('querystring')
const { getChartIdModel, getChartModel, ChartModel, createChartModel, updatePartialChartModel, deleteChartModel } = require('../models/chart')

module.exports = {
  getChartId: (req, res) => {
    const { id } = req.params
    getChartIdModel(id, (err, result) => {
      if (!err) {
        if (result.length) {
          res.status(201).send({
            succes: true,
            message: 'Chart list with id',
            data: result[0]
          })
        } else {
          res.send({
            succes: false,
            message: 'Chart list id not found'
          })
        }
      } else {
        res.send({
          success: false,
          message: err.message
        })
      }
    })
  },
  getChart: (req, res) => {
    let { page, limit, search, sort } = req.query
    let sortColumn = ''
    let sortValue = ''
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'userID'
      searchValue = search || ''
    }
    if (typeof sort === 'object') {
      sortColumn = Object.keys(sort)[0]
      sortValue = Object.values(sort)[0]
    } else {
      sortColumn = 'createdAt'
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
    getChartModel([searchKey, searchValue, sortColumn, sortValue], limit, offset, (err, result) => {
      if (!err) {
        const pageInfo = {
          count: 0,
          pages: 0,
          currentPage: page,
          LimitPerPage: limit,
          nextLink: null,
          prevLink: null
        }
        if (result.length) {
          ChartModel([searchKey, searchValue], data => {
            const { count } = data[0]
            pageInfo.count = count
            pageInfo.pages = Math.ceil(count / limit)

            const { pages, currentPage } = pageInfo

            if (currentPage < pages) {
              pageInfo.nextLink = `http://localhost:8000/chart?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
            }
            if (currentPage > 1) {
              pageInfo.prevLink = `http://localhost:8000/chart?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
            }
            res.send({
              success: true,
              message: 'List of chart',
              data: result,
              pageInfo
            })
          })
        } else {
          res.send({
            success: 'false',
            message: 'list chart not found'
          })
        }
      } else {
        res.status(500).send({
          success: 'false',
          message: 'internal server error!'
        })
      }
    })
  },
  createChart: (req, res) => {
    const { userID, itemsID } = req.body
    if (userID && itemsID) {
      createChartModel([userID, itemsID], (err, result) => {
        if (!err) {
          res.send({
            success: true,
            message: `chart with id ${userID} has been created`
          })
        } else {
          res.send({
            success: false,
            message: `no chart with user id ${userID}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: ' all filed must be filled'
      })
    }
  },
  updatePartialChart: (req, res) => {
    const { id } = req.params
    const { userID = '', itemsID = '' } = req.body
    if (userID.trim() || itemsID.trim()) {
      getChartIdModel(id, result => {
        const data = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
        })
        updatePartialChartModel([data, id], result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Chart ${id} has been updated`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to update chart'
            })
          }
        })
      })
    } else {
      res.send({
        success: false,
        message: 'At least one column is filled'
      })
    }
  },
  deleteChart: (req, res) => {
    const { id } = req.params
    getChartIdModel(id, result => {
      deleteChartModel(id, result => {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Chart with id ${id} Deleted`
          })
        } else {
          res.send({
            success: false,
            message: `cannot delete Chart!! with id ${id}`
          })
        }
      })
    })
  }
}
