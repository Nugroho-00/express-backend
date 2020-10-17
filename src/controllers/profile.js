const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { createProfileModel, getIdProfileModel, getProfileModel, countProfileModel, updateProfileModel, updatePartialProfileModel, deleteProfileModel } = require('../models/profile')

module.exports = {
  getDetailProfile: (req, res) => {
    const { id } = req.params
    getIdProfileModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `Profile with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'Profile id not found!'
        })
      }
    })
  },
  getAllProfile: async (req, res) => {
    const count = await countProfileModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getProfileModel([limit, offset])
    return responseStandard(res, 'List of profile', { result, pageInfo })
  },
  createProfile: (req, res) => {
    const { userId, name, email, phoneNumber, gender, dateBirth } = req.body
    const picture = `/upload/${req.file.originalname}`
    if (userId && name && email && phoneNumber && gender && picture && dateBirth) {
      createProfileModel([userId, name, email, phoneNumber, gender, dateBirth, picture], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Profile has been created',
            data: {
              id: result.insertId,
              ...req.body,
              picture
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed create Profile'
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
  updateProfile: (req, res) => {
    const { id } = req.params
    const { name, email, phoneNumber, gender, dateBirth } = req.body
    const picture = `/upload/${req.file.originalname}`
    if (name.trim() && email.trim() && phoneNumber.trim() && gender.trim() && dateBirth.trim() && picture.trim()) {
      getIdProfileModel(id, result => {
        if (result.length) {
          updateProfileModel(id, [name, email, phoneNumber, gender, dateBirth, picture], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Profile with id ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update Profile'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Profile with id ${id} not found`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'All fileds must be filled'
      })
    }
  },
  updatePartialProfile: (req, res) => {
    const { id } = req.params
    const { name = '', email = '', phoneNumber = '', gender = '', dateBirth = '' } = req.body
    const picture = `/upload/${req.file.filename}`
    if (name.trim() || email.trim() || phoneNumber.trim() || gender.trim() || dateBirth.trim() || picture) {
      getIdProfileModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialProfileModel([data, id], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Profile ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update Profile'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `There is no Profile with id ${id}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'At least one column is filled'
      })
    }
  },
  deleteProfile: (req, res) => {
    const {
      id
    } = req.params
    getIdProfileModel(id, result => {
      if (result.length) {
        deleteProfileModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Profile with id ${id} has been deleted!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete Profile'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: 'Data not found!!'
        })
      }
    })
  }
}
