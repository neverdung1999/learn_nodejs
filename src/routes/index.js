const authRoute = require('./auth.router');
const userRoute = require('./user.router');

function route(app) {
  app.use('/me', userRoute);
  app.use('/auth', authRoute);
}

module.exports = route;
