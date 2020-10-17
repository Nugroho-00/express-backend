const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { getChartIdModel, getChartModel, countChartModel, createChartModel, updatePartialChartModel, deleteChartModel } = require('../models/chart')

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
  getChart: async (req, res) => {
    const count = await countChartModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getChartModel([limit, offset])
    console.log(result)
    return responseStandard(res, 'List of Chart', { result, pageInfo })
  },
  createChart: (req, res) => {
    const { userId, itemId, quantity, colorId } = req.body
    if (userId && itemId && quantity && colorId) {
      createChartModel([userId, itemId, quantity, colorId], (err, result) => {
        if (!err) {
          res.send({
            success: true,
            message: `chart with id ${userId} has been created`
          })
        } else {
          res.send({
            success: false,
            message: `no chart with user id ${userId}`
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
    const { userId = '', itemId = '', quantity = '', colorId = '' } = req.body
    if (userId.trim() || itemId.trim() || quantity.trim() || colorId.trim()) {
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
