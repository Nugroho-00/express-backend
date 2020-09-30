const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { createRoleModel, getDetailRoleModel, getRoleUserModel, countRoleModel, updatePartialRoleModel, deleteRoleUserModel } = require('../models/roleUser')

module.exports = {
  getDetailRole: (req, res) => {
    const { id } = req.params
    getDetailRoleModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `User with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'user id not found!'
        })
      }
    })
  },
  getAllRole: async (req, res) => {
    const count = await countRoleModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getRoleUserModel([limit, offset])
    return responseStandard(res, 'List of users', { result, pageInfo })
  },
  createRoleUser: (req, res) => {
    const { name, description } = req.body
    createRoleModel([name, description], (err, result) => {
      if (!err) {
        res.send({
          success: true,
          message: 'Role User has been create',
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
  updatePartialRole: (req, res) => {
    const { id } = req.params
    const { name = '', description = '' } = req.body
    if (name.trim() || description.trim()) {
      getDetailRoleModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialRoleModel(id, data, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `User with id ${id} updated`,
                data: req.body
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update user!!!'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: 'internal server error'
          })
        }
      })
    }
  },
  deleteRole: (req, res) => {
    const { id } = req.params
    getDetailRoleModel(id, result => {
      if (result.length) {
        deleteRoleUserModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `user with id ${id} deleted`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed delete user'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `user with ${id} not found`
        })
      }
    })
  }
}
