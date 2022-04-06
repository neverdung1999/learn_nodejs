const jwt_helper = require('../helpers/jwt_helper');

function customRouter(router, method, path, controller, middleware) {
  if (middleware)
    return router[method](path, [jwt_helper.verifyAccessToken, ...middleware], controller);
  router[method](path, jwt_helper.verifyAccessToken, controller);
}

function noneVerifyAccessTokenRouter(router, method, path, controller){
  router[method](path, controller);
}

module.exports = { customRouter, noneVerifyAccessTokenRouter };
