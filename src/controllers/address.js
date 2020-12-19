const addressModel = require('../models/address')
const responseStandard = require('../helpers/response')
const { address: schema } = require('../helpers/validation')
const paging = require('../helpers/pagination')

module.exports = {
  createAddress: async (req, res) => {
    const { id: userId } = req.data
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 500, false)
    } else {
      const { name, recipientName, recipientPhone, address, postalCode, city } = results
      let data = {
        user_id: userId,
        name,
        recipient_name: recipientName,
        recipient_phone: recipientPhone,
        address,
        postal_code: postalCode,
        city
      }
      const create = await addressModel.createModel(data)
      if (create.affectedRows) {
        data = {
          id: create.insertId,
          ...data
        }
        return responseStandard(res, 'Add address successfully', { data: data })
      } else {
        return responseStandard(res, 'Failed to add address', {}, 400, false)
      }
    }
  },
  getAllAddress: async (req, res) => {
    const { id } = req.data
    const count = await addressModel.countModel(id)
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await addressModel.getModel([id, limit, offset])
    if (results.length) {
      return responseStandard(res, 'Your Address', { data: results, pageInfo })
    } else {
      return responseStandard(res, 'You haven\'t add an address', {}, 404, false)
    }
  },
  detailAddress: async (req, res) => {
    const { id: userId } = req.data
    const { id } = req.params
    const results = await addressModel.detailModel([userId, id])
    if (results.length) {
      return responseStandard(res, 'Detail address', { data: results })
    } else {
      return responseStandard(res, 'There is no data', {}, 404, false)
    }
  },
  updateAll: async (req, res) => {
    const { id } = req.params
    const { id: userId } = req.data
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const isExist = await addressModel.detailModel([userId, id])
      if (isExist.length) {
        const { name, recipientName, recipientPhone, address, postalCode, city } = results
        const data = {
          name,
          recipient_name: recipientName,
          recipient_phone: recipientPhone,
          address,
          postal_code: postalCode,
          city
        }
        const update = await addressModel.updateModel([data, id])
        if (update.affectedRows) {
          return responseStandard(res, 'Update address successfully')
        } else {
          return responseStandard(res, 'Failed to update', {}, 500, false)
        }
      } else {
        return responseStandard(res, 'Address not found', {}, 404, false)
      }
    }
  },
  updatePartial: async (req, res) => {
    const { id } = req.params
    const { id: userId } = req.data
    const isExist = await addressModel.detailModel([userId, id])
    if (isExist.length) {
      const data = Object.entries(req.body).map(item => {
        if (item[0] === 'recipientName') {
          return `recipient_name='${item[1]}'`
        } else if (item[0] === 'recipientPhone') {
          return `recipient_phone=${item[1]}`
        } else if (item[0] === 'postalCode') {
          return `postal_code=${item[1]}`
        } else {
          return `${item[0]}='${item[1]}'`
        }
      })
      console.log(data)
      const update = await addressModel.updatePartial(data, parseInt(id))
      if (update.affectedRows) {
        return responseStandard(res, 'Update address successfully')
      } else {
        return responseStandard(res, 'Failed to update', {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Address not found', {}, 404, false)
    }
  },
  deleteAddress: async (req, res) => {
    const { id: userId } = req.data
    const { id } = req.params
    const isExist = await addressModel.detailModel([userId, id])
    if (isExist.length) {
      const deleteAdd = await addressModel.deleteModel([userId, id])
      if (deleteAdd.affectedRows) {
        return responseStandard(res, 'Address deleted successfully!')
      } else {
        return responseStandard(res, 'Failed to delete address!', {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Address not found!', {}, 404, false)
    }
  }
}
