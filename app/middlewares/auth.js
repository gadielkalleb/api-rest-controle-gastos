const jwt = require('jsonwebtoken')
const path = require('path')

const authConfig = require(path.resolve('./config/auth.json'))

/**
 * @description modulo de de validação de token
 */
module.exports = (req, res, next) => {
  /** validação se o token existe */
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' })
  }
  /** valida se o token qdo divido com split seu tamanho é igual 2  */
  const parts = authHeader.split(' ')
  if (!parts.length === 2) {
    return res.status(401).send({ error: 'token error' })
  }
  /** valida se o token começa com Bearer */
  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'token malformated' })
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'token invalid' })
    }
    req.userId = decoded.id
    return next()
  })
}
