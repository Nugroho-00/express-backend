const { Router } = require('express')
const { createProfile, getDetailProfile, getAllProfile, updateProfile, updatePartialProfile, deleteProfile } = require('../controllers/profile')

const router = Router()

// import middleware auth
//  const authMiddleware = require('../middleware/auth')

const uploadHelper = require('../helpers/upload')

router.get('/:id', getDetailProfile)
router.get('/', getAllProfile)
router.post('/', uploadHelper.single('picture'), createProfile)
router.put('/:id', uploadHelper.single('picture'), updateProfile)
router.patch('/:id', uploadHelper.single('picture'), updatePartialProfile)
router.delete('/:id', deleteProfile)

module.exports = router
