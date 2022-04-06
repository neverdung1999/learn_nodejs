const Auth = require('../models/auth.models');
const User = require('../models/user.models');
const md5 = require('md5');
const createError = require('http-errors');
const jwt = require('../../helpers/jwt_helper');

class AuthController {
  // [POST] /auth/register
  async register(req, res, next) {
    try {
      const data = req.body;
      data['password'] = md5(data.password);
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
      const accessToken = await jwt.signAccessToken(user._id);
      const refreshToken = await jwt.signRefreshToken(user._id);
      res.send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /auth/refresh-toekn
  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      if(!refreshToken) throw createError.BadRequest();

      const userId = await jwt.verifyRefreshToken(refreshToken);

      const accessTokenNew = await jwt.signAccessToken(userId);
      const refreshTokenNew = await  jwt.signRefreshToken(userId);
      res.send({ accessToken: accessTokenNew, refreshToken: refreshTokenNew });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
