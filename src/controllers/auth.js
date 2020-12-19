require('dotenv').config()
const {
  KEY_ADMIN,
  KEY_SELLER,
  KEY_CUSTOMER
} = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { checkEmailModel } = require('../models/user')
const usersModel = require('../models/user')
const storesModels = require('../models/store')
const responseStandard = require('../helpers/response')
const { customer: customerSchema, seller: sellerSchema } = require('../helpers/validation')

module.exports = {
  registerAdmin: async (req, res) => {
    const { roleId, email, password } = req.body
    console.log(roleId, email)
    if (roleId && email && password) {
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: roleId,
          email: email,
          password: hashedPassword
        }
        console.log(users)
        const createUser = await usersModel.createUserModel(users)
        console.log(createUser)
        if (createUser.affectedRows) {
          return responseStandard(res, 'Success! Register Admin!', { data: users })
        } else {
          return responseStandard(res, 'Failed to Register!', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'All fields must be filled!', {}, 400, false)
    }
  },
  registerSeller: async (req, res) => {
    const { value: results, error } = sellerSchema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 500, false)
    } else {
      const { name, email, phone, storeName, password, description } = results
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: 2,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          const detail = {
            user_id: createUser.insertId,
            name: name,
            phone: phone
          }
          const createDetail = await usersModel.createDetailModel(detail)
          if (createDetail.affectedRows) {
            const store = {
              user_id: createUser.insertId,
              name: storeName,
              description: description
            }
            const createStore = await storesModels.createModel(store)
            if (createStore.affectedRows) {
              const data = {
                user_id: createUser.insertId,
                email: email,
                name: name,
                phone: phone,
                store_name: storeName,
                description: description,
                password: undefined
              }
              return responseStandard(res, 'Success! Register Seller!', { data: data })
            } else {
              return responseStandard(res, 'Failed to Register!', {}, 400, false)
            }
          } else {
            return responseStandard(res, 'Failed to Register!', {}, 400, false)
          }
        } else {
          return responseStandard(res, 'Failed to Register!', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    }
  },
  registerCustomer: async (req, res) => {
    const { value: results, error } = customerSchema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, email, password } = results
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: 3,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          const detail = {
            user_id: createUser.insertId,
            name: name
          }

          const createDetail = await usersModel.createDetailModel(detail)
          if (createDetail.affectedRows) {
            const data = {
              user_id: createUser.insertId,
              name,
              email,
              password: undefined
            }
            return responseStandard(res, 'Success! User has been created!', { data: data })
          } else {
            return responseStandard(res, 'Failed to create user!', {}, 400, false)
          }
        } else {
          return responseStandard(res, 'Failed to create user!', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    }
  },
  loginAdmin: async (req, res) => {
    const { email, password } = req.body
    const data = await checkEmailModel([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].role_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (compared === true) {
        if (roleId === 1) {
          jwt.sign({ id: id }, KEY_ADMIN, (err, token) => {
            if (err) {
              return responseStandard(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandard(res, 'Login as admin successfuly', { token })
            }
          })
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  },
  loginSeller: async (req, res) => {
    const { email, password } = req.body
    const data = await checkEmailModel([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].role_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (roleId === 2) {
        if (compared === true) {
          jwt.sign({ id: id }, KEY_SELLER, (err, token) => {
            if (err) {
              return responseStandard(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandard(res, 'Login as seller successfuly', { token })
            }
          })
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  },
  loginCustomer: async (req, res) => {
    const { email, password } = req.body
    const data = await checkEmailModel([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].role_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (roleId === 3) {
        if (compared === true) {
          jwt.sign({ id: id }, KEY_CUSTOMER, (err, token) => {
            if (err) {
              return responseStandard(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandard(res, 'Login as customer successfuly', { token })
            }
          })
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  }
}
