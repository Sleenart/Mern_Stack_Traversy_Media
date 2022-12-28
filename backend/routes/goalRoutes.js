const express = require('express')
const  router = express.Router()

const {getGoals,deleteGoal, setGoal,updateGoal } = require('../controllers/goalController')
const  {protect} = require("../middleware/authMiddleware")

router.all('/', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

router.route('/').get(protect,getGoals).post(protect,setGoal)
router.route('/:id').delete(protect,deleteGoal).put(protect,updateGoal)

// router.get('/', getGoals)
// router.delete('/:id', deleteGoal)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)

module.exports = router

