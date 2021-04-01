const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const CartService = require('src/services/CartService');
const CartController = require('src/controllers/CartController');
const cartController = new CartController(new CartService());
const { authenticateRoute } = require('src/helpers/auth');
const cartSchema = require('../helpers/validate/cartSchema');

router
  .route(`/`)
  .get(authenticateRoute, cartController.getAll)
  .post(authenticateRoute, validate(cartSchema.addProductToCart), cartController.addProductToCart);

router
  .route(`/:productId`)
  .get(authenticateRoute, validate(cartSchema.isProductAvailableInCart), cartController.isProductAvailableInCart)
  .delete(authenticateRoute, validate(cartSchema.deleteProductFromCart), cartController.deleteProductFromCart);

module.exports = router;
