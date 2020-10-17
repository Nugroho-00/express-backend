const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')
const { SECRETKEY_ADMIN, SECRETKEY_SELLER, SECRETKEY_CUST } = process.env
const bcrypt = require('bcrypt')
const { getUserByCondition } = require('../models/user')

module.exports = {
  authAdminController: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const rolesId = data[0].rolesId
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (compared === true) {
        if (rolesId === 1) {
          jwt.sign({ id: id }, SECRETKEY_ADMIN, (err, token) => {
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
  authSellerController: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const rolesId = data[0].rolesId
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (rolesId === 2) {
        if (compared === true) {
          jwt.sign({ id: id }, SECRETKEY_SELLER, (err, token) => {
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
  authCustController: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const rolesId = data[0].rolesId
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (rolesId === 3) {
        if (compared === true) {
          jwt.sign({ id: id }, SECRETKEY_CUST, (err, token) => {
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
