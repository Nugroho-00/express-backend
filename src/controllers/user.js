const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const joi = require('joi')
const bcrypt = require('bcrypt')
const { createUserModel, getDetailUserModel, getUserModel, countUserModel, updatePartialUserModel, deleteUserModel, getUserByCondition } = require('../models/user')

module.exports = {
  getDetailUser: (req, res) => {
    const { id } = req.params
    getDetailUserModel(id, result => {
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
  getAllUser: async (req, res) => {
    const count = await countUserModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getUserModel([limit, offset])
    return responseStandard(res, 'List of users', { result, pageInfo })
  },
  createUser: async (req, res) => {
    const schema = joi.object({
      rolesId: joi.string().required(),
      userName: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      phone: joi.string()
    })

    let { value: result, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 401, false)
    } else {
      const { email } = result
      const isExists = await getUserByCondition({ email })
      if (isExists.length > 0) {
        return responseStandard(res, 'Email already has been used', {}, 401, false)
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(result.password, salt)
        result = {
          ...result,
          password: hashedPassword
        }
        const data = await createUserModel(result)
        if (data.affectedRows) {
          result = {
            id: data.insertId,
            ...result,
            password: undefined
          }
          return responseStandard(res, 'User has been created', { result })
        } else {
          return responseStandard(res, 'Failed to create user', {}, 401, false)
        }
      }
    }
  },
  updatePartialUser: (req, res) => {
    const { id } = req.params
    const { name = '', picture = '', email = '', password = '', phone = '' } = req.body
    if (name.trim() || picture.trim() || email.trim() || password.trim() || phone.trim()) {
      getDetailUserModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialUserModel(id, data, result => {
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
  deleteUser: (req, res) => {
    const { id } = req.params
    getDetailUserModel(id, result => {
      if (result.length) {
        deleteUserModel(id, result => {
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
