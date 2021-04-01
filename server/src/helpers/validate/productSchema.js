const { Joi } = require('express-validation');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  categoryId: Joi.number().required(),
  availableQty: Joi.number().required(),
  limit: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  categoryId: Joi.number().required(),
  availableQty: Joi.number().required(),
  limit: Joi.number().required(),
});

module.exports = {
  //POST: /api/products/
  createProduct: {
    body: createProductSchema,
  },

  //PUT: /api/products
  updateProduct: {
    body: updateProductSchema,
    params: Joi.object({ productId: Joi.number().required() }),
  },

  // GET: /api/products/:productId
  getProductById: {
    params: Joi.object({
      productId: Joi.number().required(),
    }),
  },
  // GET: /api/products?search=fg&filter=1,2
  getProductByNameOrFilter: {
    query: Joi.object({
      search: Joi.string(),
      filter: Joi.string(),
    }),
  },
  // DELETE: /api/products/:productId
  deleteProduct: {
    params: Joi.object({
      productId: Joi.number().required(),
    }),
  },
};
