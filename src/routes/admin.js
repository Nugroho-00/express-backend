const router = require('express').Router()
const Roles = require('../controllers/roleUser')
const Conditions = require('../controllers/conditions')
const Colors = require('../controllers/color')
const Users = require('../controllers/user')
const Category = require('../controllers/kategori')
const Items = require('../controllers/items')
const Gender = require('../controllers/gender')

// roles
router.post('/roles', Roles.create)
router.get('/roles', Roles.getRoles)
router.get('/roles/:id', Roles.detailRole)
router.put('/roles/:id', Roles.updateRole)
router.delete('/roles/:id', Roles.deleteRole)

// gender
router.post('/gender/add', Gender.addGender)
router.get('/gender/:id', Gender.getDetailGender)
router.get('/gender', Gender.getGender)
router.delete('/gender/delete/:id', Gender.deleteGender)

// users
router.get('/users', Users.getAll)
router.get('/users/detail', Users.getDetailForAdmin)
router.delete('/users/delete/:id', Users.deleteUserForAdmin)

// Items
router.post('items/', Items.create)
router.get('items/', Items.getItems)
router.get('items/:id', Items.detailItems)
router.put('items/:id', Items.updateItems)
router.delete('items/:id', Items.deleteItems)

// categories
router.post('/category', Category.create)
router.get('/view/category', Category.getCategories)
router.get('/detail/category/:id', Category.detailCategory)
router.put('/update/category/:id', Category.updateCategories)
router.delete('/delete/category/:id', Category.deleteCategories)

// color
router.post('/color', Colors.create)
router.get('/color', Colors.getColor)
router.get('/color/:id', Colors.detailColor)
router.put('/color/:id', Colors.updateColor)
router.delete('/color/:id', Colors.deleteColor)

// Condition
router.post('/conditions', Conditions.create)
router.get('/conditions', Conditions.getCondition)
router.get('/conditions/:id', Conditions.detailCondition)
router.put('/conditions/:id', Conditions.updateCondition)
router.delete('/conditions/:id', Conditions.deleteCondition)

module.exports = router
