import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    const message = createValidationMessage(email, password)
    return res.status(400).send({ message })
  } else {
    try {
      const user = await User.create({ email, password })
      const token = newToken(user)
      return res.status(201).send({ token })
    } catch (err) {
      console.error(err)
      return res.status(400).end()
    }
  }
}

const createValidationMessage = (email, password) => {
  let message
  if (!email && !password) {
    message = 'Email and password are required'
  } else {
    if (!email) {
      message = 'Email is required'
    }

    if (!password) {
      message = 'Password is required'
    }
  }
  return message
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    const message = createValidationMessage(email, password)
    return res.status(400).send({ message })
  } else {
    try {
      const user = await User.findOne({ email }).exec()

      if (!user) {
        return res.status(401).send({ message: 'User not found' })
      }

      try {
        const match = await user.checkPassword(password)
        if (!match) {
          return res.status(401).send({ message: 'Password incorrect!' })
        }
        const token = newToken(user)
        return res.status(201).send({ token })
      } catch (error) {
        console.error(error)
        return res.status(401).send({ message: 'Not auth!' })
      }
    } catch (err) {
      console.error(err)
      return res.status(501).end()
    }
  }
}

export const protect = async (req, res, next) => {
  const { authorization } = req.headers
  const prefix = 'Bearer '

  if (!authorization) {
    return res.status(401).end()
  }

  if (!authorization.startsWith(prefix)) {
    return res.status(401).end()
  }

  try {
    const token = authorization.split(prefix)[1]
    const user = await verifyToken(token)

    const userFromDb = await User.findOne({ _id: user.id })
      .select('-password')
      .lean()
      .exec()

    if (!userFromDb) {
      return res.status(401).end()
    }
    req.user = userFromDb
    next(req, res)
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
}
