const { Router } = require('express')
const { getDetailItem, createItem, getItems, updateItem, updatePartialItem, deleteItem } = require('../controllers/items')

const router = Router()

router.get('/', getItems)
router.get('/:id', getDetailItem)
router.post('/', createItem)
router.put('/:id', updateItem)
router.patch('/:id', updatePartialItem)
router.delete('/:id', deleteItem)

module.exports = router
