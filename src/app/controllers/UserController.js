const User = require('../models/user.models');

class MeController {
  // [POST] /me/profile/:id
  async update(req, res, next) {
    try {
      const data = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
      }; //
      data['avatar'] = req.file.path;

      // not id or email
      if (!req.body.id) return res.status(400).json({ message: 'Bad request' });
      if (!req.body.email) return res.status(400).json({ message: 'Bad request' });

      // get user
      const getUser = await User.findOne({ userId: data.id, email: req.body.email });
      if (!getUser) return res.status(404).json({ message: 'User not found' });

      // update user
      const updateUser = await User.findOneAndUpdate({ userId: data.id }, data);
      if (!updateUser) return res.status(500).json({ message: 'Update failure!!!' });

      res.status(200).json({ message: 'Update successfully!!!' });
    } catch (error) {
      next(error);
    }
  }

  async profile(req, res, next) {
    try {
      const idParam = req.params.id;
      const user = await User.findOne({ userId: idParam },);
      if(user) return res.send(user);
      res.status(400).json({ message: 'Bad request' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
