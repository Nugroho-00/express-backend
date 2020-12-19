require('dotenv').config()
const {
  KEY_ADMIN,
  KEY_SELLER,
  KEY_CUSTOMER
} = process.env
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')

module.exports = {
  Admin: (req, res, next) => {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const verify = jwt.verify(token, KEY_ADMIN)
        if (verify) {
          req.data = verify
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  },
  Seller: (req, res, next) => {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const verify = jwt.verify(token, KEY_SELLER)
        if (verify) {
          req.data = verify
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  },
  Customer: (req, res, next) => {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const verify = jwt.verify(token, KEY_CUSTOMER)
        if (verify) {
          req.data = verify
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  }
}
