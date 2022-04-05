const User = require('../models/user.models');

class MeController {
  // [POST] /me/profile

  profile(req, res, next) {
    console.log(123123123123);
    const data = req.body;
    data['avatar'] = req.file.path;
    // console.log(data);
    User.findOne({ phone: data.phone })
      .then((usr) => {
        console.log(usr);
        // if(!usr)
      })
      .catch(next);
  }
}

module.exports = new MeController();
