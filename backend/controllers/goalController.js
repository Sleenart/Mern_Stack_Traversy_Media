const asyncHandler = require ('express-async-handler')


// @desc    Get all goals
// @route   Get /api/goals
// @acces   Private
const getGoals =  asyncHandler(async (req, res) => {
  res.status(200).json({ message: "GET All the goals" });
})

// @desc    Set goal
// @route   POST /api/goals
// @acces   Private
const setGoal = asyncHandler(async(req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Merci de renseigner le champs text");
  }
  res.status(200).json({ message: "Set The Goal" });
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @acces   Private
const updateGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Merci de renseigner le champs text");
      }

  res.status(200).json({ message: `Update goal ${req.params.id}` });
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @acces   Private
const deleteGoal = asyncHandler(async(req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };



