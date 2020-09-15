const { Router } = require('express')
const { createChart, getChart, getChartId, updatePartialChart, deleteChart } = require('../controllers/chart')

const router = Router()

router.post('/', createChart)
router.get('/', getChart)
router.get('/:id', getChartId)
router.patch('/:id', updatePartialChart)
router.delete('/:id', deleteChart)

module.exports = router
