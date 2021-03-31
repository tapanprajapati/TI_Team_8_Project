const { Joi } = require('express-validation');

module.exports = {
  // POST: /api/authenticate
  authenticate: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  // GET: /api/user/:bannerId
  getUser: {
    params: Joi.object({
      email: Joi.string().required(),
    }),
  },
  // PUT: /api/user/:bannerId
  updateUser: {
    params: Joi.object({
      email: Joi.string().required(),
    }),
  },
};
