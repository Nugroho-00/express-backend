const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { createCondModel, getIdCondModel, getCondModel, countCondModel, deleteCondModel } = require('../models/gender')

module.exports = {
  addGender: (req, res) => {
    const { name } = req.body
    if (name) {
      createCondModel([name], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Gender has been Add',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed Add Gender'
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
  getDetailGender: (req, res) => {
    const { id } = req.params
    getIdCondModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `Gender with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'Gender id not found!'
        })
      }
    })
  },
  getGender: async (req, res) => {
    const count = await countCondModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getCondModel([limit, offset])
    return responseStandard(res, 'List of Gender', { result, pageInfo })
  },
  deleteGender: (req, res) => {
    const {
      id
    } = req.params
    getIdCondModel(id, result => {
      if (result.length) {
        deleteCondModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Gender with id ${id} has been deleted!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete Gender'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Gender not found!!'
        })
      }
    })
  }
}
