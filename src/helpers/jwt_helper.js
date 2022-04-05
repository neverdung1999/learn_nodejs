const jwt = require('jsonwebtoken');

class Jwt_helper {
  signAccessToken(password) {
    return jwt.sign({ password: password }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
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
