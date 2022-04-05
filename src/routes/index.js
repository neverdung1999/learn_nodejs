const newsRouter = require('./news.router');
const siteRouter = require('./site.router');
const courseRoute = require('./course.router');
const authRoute = require('./auth.router');
const userRoute = require('./user.router');

function route(app) {
  app.use('/courses', courseRoute);
  app.use('/news', newsRouter);
  app.use('/me', userRoute);
  app.use('/auth', authRoute);
  app.use('/', siteRouter);
}

module.exports = route;
