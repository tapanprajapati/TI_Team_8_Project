const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const ProductService = require('src/services/ProductService');
const ProductController = require('src/controllers/ProductController');
const productController = new ProductController(new ProductService());
const { authenticateRoute } = require('src/helpers/auth');
const productSchema = require('../helpers/validate/productSchema');

router
  .route(`/`)
  .get(validate(productSchema.getProductByNameOrFilter), productController.getAll)
  .post(validate(productSchema.createProduct), productController.create);

router
  .route(`/:productId`)
  .get(validate(productSchema.getProductById), productController.getProductById)
  .put(validate(productSchema.updateProduct), productController.update)
  .delete(validate(productSchema.deleteProduct), productController.deleteProduct);

module.exports = router;
