const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('../helpers/init_redis');
class Jwt_helper {
  async signAccessToken(userId) {
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

  signVerifyAccessToken(req, res, next) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) return res.status(401).json({ message: '1 - Unauthorized' });
      const bearerToken = authHeader.split(' ');
      const token = bearerToken[1];
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (payload) next();
    } catch (error) {
      const message = error.name === 'JsonWebTokenError' ? 'authorization' : error.message;
      return res.status(401).json({ message });
      // throw createError(error);
    }
  }

  async signRefershTokens(userId) {
    try {
      const payload = { id: userId };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '2d',
        // issuer: 'pickurpage.com',
        audience: [userId],
      };
      const token = jwt.sign({ ...payload }, secret, options);
      const setClient = await client.set(userId, token);

      if (!setClient) throw createError(error);
      return token;
    } catch (error) {
      throw createError(error);
    }
  }

  async signVerifyRefershTokens(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if (payload) {
        const userId = payload.id;
        const refreshTokenRedis = await client.get(userId);
        if (refreshTokenRedis !== refreshToken) throw createError.BadRequest();
        return userId;
      }
    } catch (error) {
      throw createError(error);
    }
  }
}

module.exports = new Jwt_helper();
