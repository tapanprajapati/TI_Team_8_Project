const { Joi } = require('express-validation');

module.exports = {
  // POST: /api/cart/
  addProductToCart: {
    body: Joi.object({
      itemId: Joi.number().required(),
      itemQuantity: Joi.number().required(),
    }),
  },
  // DELETE: /api/cart/:productId
  deleteProductFromCart: {
    params: Joi.object({
      productId: Joi.number().required(),
    }),
  },
  // GET: /api/cart/:productId
  isProductAvailableInCart: {
    params: Joi.object({
      productId: Joi.number().required(),
    }),
  },
};
