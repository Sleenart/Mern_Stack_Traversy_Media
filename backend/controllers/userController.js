const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Authenticate a user
// @route   POST /api/users/login
// @acces   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email , password} = req.body;
  const user = await User.findOne({ email }); // Check dans la collection Users

  if (user && (await bcrypt.compare(password, user.password))) {
    
    res.json({ _id: user.id, name: user.name, email: user.email ,  token: generateToken(user.id)});
  } else {
    res.status(400);
    throw new Error("Invalid credential");
  }
});

// @desc    Register new user
// @route   POST /api/users
// @acces   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please feel all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email }); // Check dans la collection Users
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(`Password : ${email} ${password}  ${hashedPassword}`);
  // const user = await User.create({
  //     name, email, password: hashedPassword
  // })
  const user = await User.create({ name, email, password: hashedPassword });

  user.save((err, res) => {
    if (err) return handleError(err);
    else return console.log("Result OK: ", res);
  });

  if (user) {
    // user is created
    console.log("Status 201 ");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @acces   Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name,email} = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email,
    })
 
});


// Generate User Token  JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = { registerUser, loginUser, getMe };
