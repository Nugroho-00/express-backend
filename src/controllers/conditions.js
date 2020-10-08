const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { createCondModel, getIdCondModel, getCondModel, countCondModel, deleteCondModel } = require('../models/conditions')

module.exports = {
  getDetailConditions: (req, res) => {
    const { id } = req.params
    getIdCondModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `Conditions with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'Conditions id not found!'
        })
      }
    })
  },
  getConditions: async (req, res) => {
    const count = await countCondModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getCondModel([limit, offset])
    return responseStandard(res, 'List of Conditions', { result, pageInfo })
  },
  addConditions: (req, res) => {
    const { conditionsItem } = req.body
    if (conditionsItem) {
      createCondModel([conditionsItem], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Conditions has been Add',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed Add Conditions'
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
  deleteConditions: (req, res) => {
    const {
      id
    } = req.params
    getIdCondModel(id, result => {
      if (result.length) {
        deleteCondModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Conditions with id ${id} has been deleted!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete Conditions'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Conditions not found!!'
        })
      }
    })
  }
}
