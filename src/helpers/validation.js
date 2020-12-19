const joi = require('joi')

module.exports = {
  customer: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
  }),
  customerUpdate: joi.object({
    name: joi.string(),
    email: joi.string(),
    currentPassword: joi.string(),
    newPassword: joi.string(),
    confirmPassword: joi.string(),
    phone: joi.string(),
    genderId: joi.number(),
    birthdate: joi.string()
  }),
  seller: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    storeName: joi.string().required(),
    description: joi.string().required(),
    password: joi.string().required()
  }),
  produk: joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    conditionId: joi.string().required(),
    categoryId: joi.string().required(),
    colorId: joi.string().required(),
    description: joi.string().required()
  }),
  chart: joi.object({
    itemsId: joi.number().required(),
    quantity: joi.number().required()
  }),
  address: joi.object({
    name: joi.string().required(),
    recipientName: joi.string().required(),
    recipientPhone: joi.string().required(),
    address: joi.string().required(),
    postalCode: joi.number().required(),
    city: joi.string().required()
  }),
  rating: joi.object({
    rating: joi.number().min(1).max(5).required()
  })
}
