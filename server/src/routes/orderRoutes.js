const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const OrderService = require('src/services/OrderService');
const OrderController = require('src/controllers/OrderController');
const orderController = new OrderController(new OrderService());
const { authenticateRoute } = require('src/helpers/auth');
const orderSchema = require('../helpers/validate/orderSchema');

/**
 * GET: /api/products endpoint to get records for provided userId and jobname
 * Possible outcomes:
 * Successfully fetches all records { "success": true, "statusCode": 200, "result": [] }
 * SQL Errors: I.e., { "success": false, "statusCode": 500, "error": {} }
 */
router.route(`/`).get(orderController.getAll);
router
  .route(`/:orderId`)
  .get(orderController.getByOrderId)
  .put(validate(orderSchema.updateOrder), orderController.updateOrderStatusById);

router.route(`/user/:bannerId`).get(orderController.getByUser);

router.route(`/setDelivered/:orderId`).put(validate(orderSchema.setDelivered), orderController.setOrderDate);

module.exports = router;
