const Auth = require('../models/auth.models');
const User = require('../models/user.models');
const md5 = require('md5');
const createError = require('http-errors');
const Jwt_helper = require('../../helpers/jwt_helper');
const client = require('../../helpers/init_redis');
class AuthController {
  // [POST] /auth/register
  async register(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: md5(req.body.password),
      };
      const findUser = await Auth.find({ email: data.email });
      if (findUser.length) return res.status(400).json({ message: 'User already exits!!!' });
      const createUser = await Auth.create(data);
      if (!createUser) return res.status(400).json({ message: 'register failure!!!' });

      const updateUser = await User.create({
        userId: createUser._id,
        email: createUser.email,
      });
      if (!updateUser) return res.status(400).json({ message: 'register failure!!!' });

      res.status(200).json({ message: 'Register successfully!!!' });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'Bad request' });
      const user = await Auth.findOne({ email });
      // check user exits!!!
      if (!user) return res.status(400).json({ message: 'User does not exits!!!' });
      // check password if pass
      if (user.password !== md5(password))
        return res.status(400).json({ message: 'Error password!!!' });
      // generate token
      const accessToken = await Jwt_helper.signAccessToken(user._id);
      const refreshToken = await Jwt_helper.signRefershTokens(user._id);
      res.send({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/verify-token
  async refreshToken(req, res, next) {
    try {
      const { refreshtoken } = req.body;
      if (!refreshtoken) return res.status(400).json({ message: 'Bad request' });
      const userId = await Jwt_helper.signVerifyRefershTokens(refreshtoken);
      const accessToken = await Jwt_helper.signAccessToken(userId);
      const newRefreshToken = await Jwt_helper.signRefershTokens(userId);
      res.send({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/verify-token
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'Bad request' });
      const userId = await Jwt_helper.signVerifyRefershTokens(refreshToken);
      const removeUserId = client.DEL(userId);
      if (!removeUserId) res.status(400).json({ message: 'logout failure!!!' });
      res.status(200).json({ message: 'logout successfully!!!' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
