const { Router } = require('express')
const { createUser, getUserId, getAllUser, updatePartialUser, deleteUser } = require('../controllers/user')

const router = Router()

// import middleware auth
//  const authMiddleware = require('../middleware/auth')

const uploadHelper = require('../helpers/upload')

router.get('/:id', getUserId)
router.get('/', getAllUser)
router.post('/', uploadHelper.single('picture'), createUser)
router.patch('/:id', uploadHelper.single('picture'), updatePartialUser)
router.delete('/:id', deleteUser)

module.exports = router
