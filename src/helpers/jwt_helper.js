const jwt = require('jsonwebtoken');
const User = require('../app/models/user.models');
class Jwt_helper {
  signAccessToken(user)  {
    const payload = {password: user.password};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1d',
        audience: [user._id], 
      };
      return jwt.sign({...payload}, secret, options);
  }

  verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: '1 - Unauthorized' });
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      console.log({ err, payload });
      if (err) return res.status(401).json({ message: '2 - Unauthorized' });
      req.payload = payload;
      next();
    });
  }
}

module.exports = new Jwt_helper();
