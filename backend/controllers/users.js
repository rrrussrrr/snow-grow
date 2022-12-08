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
    favorites: []
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.patch('/:username', async (request, response, next) => {
  const username = request.params.username
  const body = request.body
  console.log(body)
  // if (!body.name) {
  //   return response.status(400).json({ 
  //     error: 'name missing' 
  //   })
  // }

  // if (!body.number) {
  //   return response.status(400).json({ 
  //     error: 'number missing' 
  //   })
  // }

  User.findOneAndUpdate(
    {username}, 
    {favorites: body.favorites}
  )
    .then(updated => {
      response.json(updated)
    })
    .catch(error => next(error))
})

module.exports = usersRouter