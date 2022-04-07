const jwt_helper = require('../helpers/jwt_helper');

function customRouter(router, method, path, controller, middleware) {
  if (middleware)
    return router[method](path, [jwt_helper.signVerifyAccessToken, ...middleware], controller);
  router[method](path, jwt_helper.signVerifyAccessToken, controller);
}

module.exports = { customRouter };
