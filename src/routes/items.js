const { Router } = require('express')
const { getItemId, createItem, getItems, updateItem, updatePartialItem, deleteItem } = require('../controllers/items')

const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', getItems)
router.get('/:id', getItemId)
router.post('/', uploadHelper.single('picture'), createItem)
router.put('/:id', updateItem)
router.patch('/:id', uploadHelper.single('picture'), updatePartialItem)
router.delete('/:id', deleteItem)

module.exports = router
