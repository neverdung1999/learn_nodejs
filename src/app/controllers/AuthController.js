const Auth = require('../models/user.models');
const md5 = require('md5');
const createError = require('http-errors');
const Jwt_helper = require('../../helpers/jwt_helper');

class UserController {
  // [POST] /auth/register
  register(req, res, next) {
    const data = req.body;
    data['password'] = md5(data.password);
    Auth.findOne({ username: data.username })
      .then((usr) => {
        if (usr) return res.status(400).json({ message: 'User already exits!!!' });
        Auth.create(data)
          .then((usr) => {
            if (!usr) return res.status(400).json({ message: 'register failure!!!' });
            res.send('Register successfully!!!');
          })
          .catch(next);
      })
      .catch(next);
  }

  // [POST] /auth/login
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ message: 'Bad request' });
      const user = await Auth.findOne({ username });
      // check user exits!!!
      if (!user) return res.status(400).json({ message: 'User does not exits!!!' });
      // check password if pass
      if (user.password !== md5(password))
        return res.status(400).json({ message: 'Error password!!!' });
      // generate token
      const token = Jwt_helper.signAccessToken(user.password);
      res.send({accessToken: token});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
