const { Joi } = require('express-validation');

const addCategorySchema = {
  body: Joi.object({ name: Joi.string().required() }),
};

const updateCategorySchema = {
  body: Joi.object({ name: Joi.string().required() }),
  params: Joi.object({ id: Joi.number().required() }),
};

module.exports = {
  //PUT: /api/categories/:categoryId
  updateCategory: updateCategorySchema,
  addCategory: addCategorySchema,
};
