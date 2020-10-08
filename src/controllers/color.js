const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { createColorModel, getIdColorModel, getColorModel, countColorModel, deleteColorModel } = require('../models/color')

module.exports = {
  getDetailColor: (req, res) => {
    const { id } = req.params
    getIdColorModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `Color with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'Color id not found!'
        })
      }
    })
  },
  getColor: async (req, res) => {
    const count = await countColorModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getColorModel([limit, offset])
    return responseStandard(res, 'List of Color', { result, pageInfo })
  },
  addColor: (req, res) => {
    const { colorName } = req.body
    if (colorName) {
      createColorModel([colorName], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Color has been Add',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed Add Color'
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
  deleteColor: (req, res) => {
    const {
      id
    } = req.params
    getIdColorModel(id, result => {
      if (result.length) {
        deleteColorModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Color with id ${id} has been deleted!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete Color'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Color not found!!'
        })
      }
    })
  }
}
