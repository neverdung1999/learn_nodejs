const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('./init_redis');

class Jwt_helper {
  async signAccessToken(userId) {
    try {
      const payload = { id: userId };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '10s',
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
      if (err) return res.status(401).json({ message: err });
      next();
    });
  }

  async signRefreshToken(userId) {
    try {
      const payload = { id: userId };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1w',
        // issuer: 'pickurpage.com',
        audience: [userId],
      };
      const refreshToken = jwt.sign({ ...payload }, secret, options);

      const setClient = await client.set(userId, refreshToken, {
        EX: 365*24*60*60,
      });

      if(!setClient) throw createError.Unauthorized();
      return refreshToken;
      
    } catch (error) {
      throw createError(error);
    }
  }

  async verifyRefreshToken(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if(!payload) throw createError.BadRequest();

      const userId = payload.id;
      const refreshTokenRedis = await client.get(userId);
      if(refreshTokenRedis === refreshToken) return payload.id;

      throw createError.BadRequest();
    } catch (error) {
      throw createError(error);
    }
  }
}

module.exports = new Jwt_helper();
