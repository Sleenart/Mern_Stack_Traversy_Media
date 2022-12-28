const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel")
const User = require("../models/userModel")

// @desc    Get all goals
// @route   GET /api/goals
// @acces   Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @acces   Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Merci de renseigner le champs text");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  goal.save((err, res) => {
    if (err) return handleError(err);
    else return console.log("Result OK: ", res);
  });
  res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @acces   Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("MGoal not Find");
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    // make sure the log in matches the goal user
    res.status(401)
    throw new Error('User not authorize')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  await updatedGoal.save((err, res) => {
    if (err) return handleError(err);
    else return console.log("Result OK: ", res);
  });

  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @acces   Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Find");
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    // make sure the log in matches the goal user
    res.status(401)
    throw new Error('User not authorize')
  }
  
  await goal.remove();
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
