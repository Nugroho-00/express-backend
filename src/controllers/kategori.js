const { getIdCategoryModel, getCategoryModel, createCategoryModel, updateCategoryModel, deleteCategoryModel } = require('../models/kategori')

module.exports = {
  getIdCategory: (req, res) => {
    const { id } = req.params
    getIdCategoryModel(id, (err, result) => {
      if (!err) {
        if (result.length) {
          res.send({
            success: true,
            message: `category with id ${id}`,
            data: result
          })
        } else {
          res.send({
            success: false,
            message: 'No category found',
            data: result
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Internal server error'
        })
      }
    })
  },
  getCategory: (req, res) => {
    getCategoryModel((err, result) => {
      if (!err) {
        if (result.length) {
          res.send({
            success: true,
            message: 'List of category',
            data: result
          })
        } else {
          res.send({
            success: false,
            message: 'No list category'
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Category not found'
        })
      }
    })
  },
  createCategory: (req, res) => {
    const { name } = req.body
    createCategoryModel(name, (err, result) => {
      if (!err) {
        res.send({
          success: true,
          message: 'Category has been create',
          data: {
            id: result.insertId,
            ...req.body
          }
        })
      } else {
        res.send({
          success: false,
          message: 'All file must be filled'
        })
      }
    })
  },
  updateCategory: (req, res) => {
    const { id } = req.params
    const { name = '' } = req.body
    if (name.trim()) {
      updateCategoryModel(id, name, (err, result) => {
        if (!err) {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Category has ben update with id ${id}!`
            })
          } else {
            res.send({
              success: false,
              message: 'failed to update Category'
            })
          }
        } else {
          res.send({
            success: false,
            message: `category with id ${id} not found`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    deleteCategoryModel(id, (err, result) => {
      if (!err) {
        if (result.affectedRows) {
          res.send({
            success: true,
            message: `Category with id ${id} has been delete!`
          })
        } else {
          res.send({
            success: false,
            message: `failed delete! id ${id} not found!!`
          })
        }
      } else {
        res.send({
          success: false,
          message: 'Category not found'
        })
      }
    })
  }
}
