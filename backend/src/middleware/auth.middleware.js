import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not autheticated. No token provided' })
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = decoded.userInfo

    next()

  } catch (error) {
    return res.status(401).json({ message: 'Not Authenticated' })
  }
}

export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if(!req.user.role) {
      return res.status(403).json({ message: `Access denied: No role assigned` })
    }

    if(!allowedRoles.some(role => req.user.role === role)) {
      return res.status(403).json({ message: `Access denied: Requires role (${allowedRoles.join(', ')})` })
    }

    next()
}}