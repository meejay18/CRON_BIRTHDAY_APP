const userModel = require('../model/userModel')

exports.createUser = async (req, res) => {
  try {
    const { userName, email, dateOfBirth } = req.body

    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const newUser = new userModel({ userName, email, dateOfBirth })
    const savedUser = await newUser.save()

    res.status(201).json({
      message: 'user created successfully',
      data: savedUser,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    })
  }
}
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    if (!users) {
      return res.status(400).json({
        message: 'No users',
      })
    }

    return res.status(200).json({
      message: 'users found',
      data: users,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    })
  }
}
