const { Router } = require('express')
const { getIdCategory, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/kategori')

const router = Router()

router.get('/:id', getIdCategory)
router.get('/', getCategory)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
