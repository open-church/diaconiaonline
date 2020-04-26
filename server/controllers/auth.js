import jwt from 'jsonwebtoken'
import md5 from 'md5'

import Community from '../models/community'
import People from '../models/people'

const createToken = auth => {
  return jwt.sign(
    { id: auth.id },
    process.env.SECRET_KEY,
    { expiresIn: '7 days' }
  )
}

const checkToken = token => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      return !err
    })
  } catch (err) {
    return false
  }
}

const checkUser = async token => {
  const community = await Community.findOne({ token })
  const people = await People.findOne({ token })
  if (community) return { ...community, type: 'community' }
  if (people) return { ...people, type: 'people' }
  return null
}

export const checkSession = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    token = token && token.slice(7, token.length)

    if (token && checkToken(token)) {
      const user = await checkUser(token)
      if (user) {
        req[user.type] = user._doc
        return next()
      }
    }
    res.status(401).json({ message: 'Credenciais Inválidas' })
  } catch (err) {
    return res.status(500).json({
      message: 'Erro desconhecido ao verificar token',
      err
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, entity } = req.body
    const Model = entity === 'community' ? Community : People
    const doc = await Model.findOne({ email, password: md5(password) })
    if (!doc) return res.status(401).json({ message: 'Credenciais inválidas' })
    const token = createToken({ id: doc._id })
    doc.token = token
    doc.save()
    res.json({
      email: doc.email,
      token,
      entity
    })
  } catch (err) {
    return res.status(500).json({ message: 'Erro desconhecido ao logar', err })
  }
}
