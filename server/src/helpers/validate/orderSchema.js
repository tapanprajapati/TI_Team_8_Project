const { Joi } = require('express-validation');

const updateOrderSchema = {
  body: Joi.object({ status: Joi.string().valid('placed', 'processing', 'rejected', 'ready', 'delivered').required() }),
  params: Joi.object({ orderId: Joi.number().required() }),
};

module.exports = {
  //PUT: /api/orders/:orderId
  updateOrder: updateOrderSchema,
  setDelivered: { params: Joi.object({ orderId: Joi.number().required() }) },
};
