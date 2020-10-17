const { Router } = require('express')
const { createAddress, getDetailAddress, getAddress, updatePartialAddress, deleteAddress } = require('../controllers/address')

const router = Router()

router.get('/:id', getDetailAddress)
router.get('/', getAddress)
router.post('/', createAddress)
// router.put('/:id', updateAddress)
router.patch('/:id', updatePartialAddress)
router.delete('/:id', deleteAddress)

module.exports = router
