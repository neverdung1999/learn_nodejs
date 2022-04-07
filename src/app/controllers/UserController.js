const User = require('../models/user.models');
const Auth = require('../models/auth.models');
const Test = require('../models/test.models');
const db = require('../../config/db');

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
class MeController {
  // [POST] /me/profile/:id
  async update(req, res, next) {
    try {
      const data = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        avatar: req.file.path,
      }; //

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
      // const idParam = req.params.id;
      // console.log({ idParam });
      // const dataUser = await User.findOne({ userId: idParam });
      // const dataAuth = await Auth.findById(idParam);
      // let dataUserAuth = { ...dataUser, ...dataAuth };
      // console.log(dataUserAuth);
      // if (!dataUser || !dataAuth) return res.status(404).json({ message: 'Cannot find user!!!' });
      // res.status(200).json({ dataUser, dataAuth });
      // const count = db.collection.find({ email: 'neverdung1999@gmail.com' }).count();
      // console.log({ count });

      await client.connect();
      console.log('Connected successfully to server !!!!!!!!!!!!');
      const db = client.db('study_node_dev');

      db.collection('authentications').aggregate([
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: 'userId',
            as: 'test',
          },
        },
      ]);

      // db.connect()
      //   .then((res) => {
      //     const col = res.db('authentications');
      //     col.aggregate(
      //       [
      //         {
      //           $lookup: {
      //             from: 'users',
      //             localField: 'userId',
      //             foreignField: '_id',
      //             as: 'join_auth_user',
      //           },
      //         },
      //       ],
      //       function (err, res) {
      //         if (err) throw err;
      //         console.log(res);
      //       }
      //     );
      //   })
      //   .catch(next);
    } catch (error) {
      next(error);
    }
  }

  async test(req, res, next) {
    try {
      console.log(req.files);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
