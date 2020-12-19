const usersModel = require('../models/user')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const responseStandard = require('../helpers/response')
const { customerUpdate: schema } = require('../helpers/validation')
const bcrypt = require('bcrypt')
const upload = require('../helpers/upload').single('picture')
const multer = require('multer')

module.exports = {
  getAll: async (req, res) => {
    const { searchKey, searchValue } = searching.email(req.query.search)
    const count = await usersModel.countUsersModel([searchKey, searchValue])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await usersModel.getUsersModel([searchKey, searchValue], [limit, offset])
    if (results.length) {
      const data = results.map(data => {
        data = {
          ...data,
          password: null
        }
        return data
      })
      return responseStandard(res, 'List of Users', { data, pageInfo })
    } else {
      return responseStandard(res, 'There is no user in list', {}, 404, false)
    }
  },
  getDetailUser: async (req, res) => {
    const { id } = req.data
    const results = await usersModel.detailUserModel(id)
    if (results.length) {
      const data = results.map(data => {
        data = {
          ...data,
          password: undefined
        }
        return data
      })
      responseStandard(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  updateDetail: async (req, res) => {
    const { id } = req.data
    const isExist = await usersModel.detailUserModel(id)
    if (isExist.length) {
      const { value: results } = schema.validate(req.body)
      const updated = Object.keys(results).map(async item => {
        if (item === 'email' || item === 'newPassword' || item === 'confirmPassword') {
          const { email, newPassword, confirmPassword } = results
          if (email) {
            const emailExist = await usersModel.checkEmailModel({ email })
            if (emailExist.length) {
              const userId = emailExist[0].id
              if (userId !== id) {
                return responseStandard(res, 'Email has already used', {}, 400, false)
              }
            } else {
              const data = {
                email
              }
              const update = await usersModel.updateUserPartialModel([data, id])
              return update
            }
          }
          if (newPassword) {
            const newPass = newPassword === confirmPassword
            if (newPass === false) {
              return responseStandard(res, 'confirm password is false', {}, 400, false)
            } else {
              const salt = await bcrypt.genSalt(10)
              const hashedPassword = await bcrypt.hash(newPassword, salt)
              const data = {
                password: hashedPassword
              }
              const update = await usersModel.updateUserPartialModel([data, id])
              return update
            }
          }
        } else {
          const { name, phone, genderId, birthdate } = results
          const detail = {
            name, phone, genderId, birthdate
          }
          const data = Object.entries(detail).map(item => {
            if (item[0] === 'genderId') {
              return `gender_id = ${item[1]}`
            } else {
              return `${item[0]} = '${item[1]}'`
            }
          })
          const update = await usersModel.updateDetailPartialModel(data, id)
          return update
        }
      })
      const updateResults = await Promise.all(updated)
      if (updateResults[0].affectedRows) {
        return responseStandard(res, 'Update succesfully')
      } else {
        return responseStandard(res, 'Failed to update', {}, 500, false)
      }
    } else {
    }
  },
  updatePict: async (req, res) => {
    upload(req, res, async (err) => {
      const { id } = req.data
      const isExist = await usersModel.detailUserModel(id)
      if (isExist.length) {
        if (err instanceof multer.MulterError) {
          return responseStandard(res, err.message, {}, 500, false)
        } else if (err) {
          return responseStandard(res, err.message, {}, 500, false)
        }
        let image = ''
        if (req.file) {
          image = `image = 'uploads/${req.file.filename}'`
        }
        const update = await usersModel.updateDetailPartialModel(image, id)
        if (update.affectedRows) {
          return responseStandard(res, 'Update succesfully')
        } else {
          return responseStandard(res, 'Failed to update', {}, 500, false)
        }
      } else {
        return responseStandard(res, 'There is no user', {}, 404, false)
      }
    })
  },
  deleteUser: async (req, res) => {
    const { id } = req.data
    const isExist = await usersModel.detailUserModel(id)
    if (isExist.length > 0) {
      const results = await usersModel.deleteUserModel(id)
      if (results.affectedRows) {
        return responseStandard(res, 'User has been deleted')
      } else {
        return responseStandard(res, 'Failed to delete! Try again later!', {}, 500, false)
      }
    } else {
      return responseStandard(res, 'User not found', {}, 404, false)
    }
  },
  getDetailForAdmin: async (req, res) => {
    const { id } = req.data
    const results = await usersModel.detailAdminModel(id)
    if (results.length) {
      const data = results.map(item => {
        item = {
          ...item
        }
        return item
      })
      responseStandard(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  deleteUserForAdmin: async (req, res) => {
    const { id } = req.params
    const isExist = await usersModel.detailUserModel(id)
    if (isExist.length > 0) {
      const results = await usersModel.deleteUserModel(id)
      if (results.affectedRows) {
        return responseStandard(res, 'User has been deleted')
      } else {
        return responseStandard(res, 'Failed to delete! Try again later!', {}, 500, false)
      }
    } else {
      return responseStandard(res, 'User not found', {}, 404, false)
    }
  }
}
