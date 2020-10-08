const paging = require('../helpers/pagination')
const responseStandard = require('../helpers/response')
const { createAddressModel, getIdAddressModel, getAddressModel, countAddressModel, updatePartAddressModel, deleteAddressModel } = require('../models/address')

module.exports = {
  getDetailAddress: (req, res) => {
    const { id } = req.params
    getIdAddressModel(id, result => {
      if (result.length) {
        res.status(201).send({
          succes: true,
          message: `Address with id ${id}`,
          data: result[0]
        })
      } else {
        res.send({
          succes: false,
          message: 'Address id not found!'
        })
      }
    })
  },
  getAddress: async (req, res) => {
    const count = await countAddressModel()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const result = await getAddressModel([limit, offset])
    return responseStandard(res, 'List of Address', { result, pageInfo })
  },
  createAddress: (req, res) => {
    const { userId, nameAddress, nameReciever, phoneNumber, address, postalCode, city, isPrimary } = req.body
    if (userId && nameAddress && nameReciever && phoneNumber && address && postalCode && city && isPrimary) {
      createAddressModel([userId, nameAddress, nameReciever, phoneNumber, address, postalCode, city, isPrimary], (err, result) => {
        if (!err) {
          res.status(201).send({
            success: true,
            message: 'Address has been Add',
            data: {
              id: result.insertId,
              ...req.body
            }
          })
        } else {
          res.send({
            success: false,
            message: 'Failed to add Address'
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
  updatePartialAddress: (req, res) => {
    const { id } = req.params
    const { nameAddress = '', nameReciever = '', phoneNumber = '', address = '', postalCode = '', city = '', isPrimary = '' } = req.body
    if (nameAddress.trim() || nameReciever.trim() || phoneNumber.trim() || address.trim() || postalCode.trim() || city.trim() || isPrimary.trim()) {
      getIdAddressModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartAddressModel([data, id], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Address ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update Address'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `There is no Address with id ${id}`
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
  deleteAddress: (req, res) => {
    const {
      id
    } = req.params
    getIdAddressModel(id, result => {
      if (result.length) {
        deleteAddressModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Address with id ${id} has been deleted!`
            })
          } else {
            res.send({
              success: false,
              message: 'Failed to delete Address'
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
