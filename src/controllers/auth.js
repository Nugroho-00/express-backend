const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getUserByCondition } = require('../models/user')
const responseStandard = require('../helpers/response')

module.exports = {
  loginController: async (req, res) => {
    const { email, password } = req.body
    const data = await getUserByCondition([{ email }])
    // console.log(data)
    if (data.length) {
      const hashed = data[0].password
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (compared === true) {
        jwt.sign({ id: id }, process.env.APP_KEY, (err, token) => {
          if (err) {
            return responseStandard(res, 'Error Login Failed', {}, 500, false)
          } else {
            return responseStandard(res, 'Login successfuly', { token })
          }
        })
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  }
}
