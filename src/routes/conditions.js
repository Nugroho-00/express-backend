const { Router } = require('express')
const { getDetailConditions, getConditions, addConditions, deleteConditions } = require('../controllers/conditions')

const router = Router()

router.get('/:id', getDetailConditions)
router.get('/', getConditions)
router.post('/', addConditions)
router.delete('/:id', deleteConditions)

module.exports = router
