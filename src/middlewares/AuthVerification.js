const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const secretKey = "SecretKeyForJWT123";

const AuthVerification = (req, res, next) => {
    const token = req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  // Verify the token
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    try {
      const user = await UserModel.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
}

module.exports = AuthVerification;
