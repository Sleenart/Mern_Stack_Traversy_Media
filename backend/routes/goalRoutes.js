const express = require('express')
const  router = express.Router()

const {getGoals,deleteGoal, setGoal,updateGoal } = require('../controllers/goalController')

router.all('/', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').delete(deleteGoal).put(updateGoal)


// router.get('/', getGoals)
// router.delete('/:id', deleteGoal)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)

module.exports = router

