const { Router } = require('express')
const { getDetailRole, getAllRole, createRoleUser, updatePartialRole, deleteRole } = require('../controllers/roleUser')

const router = Router()

// import middleware auth
//  const authMiddleware = require('../middleware/auth')

router.get('/:id', getDetailRole)
router.get('/', getAllRole)
router.post('/', createRoleUser)
router.patch('/:id', updatePartialRole)
router.delete('/:id', deleteRole)

module.exports = router
