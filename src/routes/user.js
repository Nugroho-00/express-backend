const { Router } = require('express')
const { createUser, getUserId, getAllUser, updatePartialUser, deleteUser } = require('../controllers/user')

const router = Router()

router.get('/:id', getUserId)
router.get('/', getAllUser)
router.post('/', createUser)
router.patch('/:id', updatePartialUser)
router.delete('/:id', deleteUser)

module.exports = router
