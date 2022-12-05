const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// creating a router
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // check if existing user
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter