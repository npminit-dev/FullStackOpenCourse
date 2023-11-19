const log = require('../logs/log')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../env_vars')

const errorsMW = (err, req, res, next) => {
  log.error(err.message)
  if(err.message.startsWith('MongoDB Exception:')) return res.status(404).send(err.message)
  if(err.message === 'One or some properties has missing'
  || err.message === 'Invalid username'
  || err.message === 'Invalid name'
  || err.message === 'Invalid password'
  || err.message === 'JWT Error: user not found'
  || err.message === 'Error: The blog was not found for the indicated user'
  || err.message === 'Incorrect body syntax'
  ) return res.status(400).send(`Bad Request: ${err}`)

  if(err.message === 'Error: blog not deleted'
  || err.message.startsWith('JWT sign error')
  ) return res.status(404).send(err.message)

  if(err.message === 'Missing authorization header'
  || err.message === 'Auth headers must be "bearer" preceeded'
  || err.message.startsWith('Jwt decoding error')
  || err.message === 'Username not found' 
  || err.message === 'Incorrect password'
  ) return res.status(401).send(err.message)

}

const extractPersonMW = (req, res, next) => {
  let auth = req.body.headers.Authorization || req.headers.authorization;
  if(!auth) throw new Error('Missing authorization header')
  if(!auth.startsWith('bearer')) throw new Error('Auth headers must be "bearer" preceeded')
  auth = auth.substring(7).trim()
  try {
    let decoded = jwt.verify(auth, SECRET)
    req.person = decoded
    next()
  } catch (error) {
    throw new Error(`Jwt decoding error: ${error}`)
  }
}

module.exports = {
  errorsMW,
  extractPersonMW
}