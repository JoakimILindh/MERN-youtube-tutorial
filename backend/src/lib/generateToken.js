import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign({
    userInfo: {
      _id: user._id, 
      name: user.name,
      role: user.role
    }
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}