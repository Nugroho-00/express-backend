const router = require('express').Router()
const rolesController = require('../controllers/roleUser')
const conditionsController = require('../controllers/conditions')
const colorsController = require('../controllers/color')
const usersController = require('../controllers/user')
const categoriesController = require('../controllers/Kategori')
const itemsController = require('../controllers/items')

// roles
router.post('/roles', rolesController.createRoleUser) // add roles
router.get('/roles', rolesController.getAllRole) // show roles
router.get('/roles/:id', rolesController.getDetailRole) // show detail roles
router.put('/roles/:id', rolesController.updatePartialRole) // edit roles
router.delete('/roles/:id', rolesController.deleteRole) // delete roles
// color
router.post('/color', colorsController.addColor) // add color
router.get('/color', colorsController.getColor) // show color
router.get('/color/:id', colorsController.getDetailColor) // show detail color
// router.put('/color/:id', colorsController.updateColor) // edit color
router.delete('/color/:id', colorsController.deleteColor) // delete color
// Condition
router.post('/condition', conditionsController.addConditions) // add condition
router.get('/condition', conditionsController.getConditions) // show condition
router.get('/condition/:id', conditionsController.getDetailConditions) // show detail condition
// router.put('/condition/:id', conditionsController.updateCondition) // edit condition
router.delete('/condition/:id', conditionsController.deleteConditions) // delete Condition

// users
router.post('/users', usersController.createUser) // users
router.get('/users', usersController.getAllUser) // users
// router.get('/users/:id', usersController.getDetailForAdmin) // users
// router.delete('/users/:id', usersController.deleteUserForAdmin) // users

// categories
router.post('/category', categoriesController.createCategory) // add category
router.get('/category', categoriesController.getCategory) // show category
router.get('/category/:id', categoriesController.getIdCategory) // show detail category
router.put('/category/:id', categoriesController.updateCategory) // edit category
router.delete('/category/:id', categoriesController.deleteCategory) // delete category

// product
router.post('items/', itemsController.createItem) // add product
// router.post('/color', itemsController.createColor) // add product
router.get('items/', itemsController.getItems) // show product
router.get('items/:id', itemsController.getDetailItem) // show detail product
router.put('items/:id', itemsController.updateItem) // edit product
router.delete('items/:id', itemsController.deleteItem) // delete product

module.exports = router
