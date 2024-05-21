const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    console.log('Unauthorized Access: Token unavailable')
    return res.status(401).json({ message: 'Token unavailable' })
  }
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      console.log('Forbidden: Token invalid')
      return res.status(403).json({ message: 'Token Invalid' })
    }
    req.user = decoded
    console.log('Token Verified')
    next()
  })
}
export default verifyToken
