const jwt = require('jsonwebtoken');
const createError = require('http-errors');
class Jwt_helper {
  signAccessToken(userId) {
    try {
      const payload = { id: userId };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1d',
        // issuer: 'pickurpage.com',
        audience: [userId],
      };
      const token = jwt.sign({ ...payload }, secret, options);
      return token;
    } catch (error) {
      throw createError(error);
    }
  }

  verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: '1 - Unauthorized' });
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return res.status(401).json({ message: '2 - Unauthorized' });
      req.payload = payload;
      next();
    });
  }
}

module.exports = new Jwt_helper();
