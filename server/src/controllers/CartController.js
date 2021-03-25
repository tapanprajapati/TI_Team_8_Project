
 const { isAuthorized, sendUnauthorizedResponse } = require('../helpers/auth');

 function CartController(service) {
   this.service = service;
   this.getAll = this.getAll.bind(this);
   this.addProductToCart = this.addProductToCart.bind(this);
   this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
   this.isProductAvailableInCart = this.isProductAvailableInCart.bind(this);
 }
 CartController.prototype.getAll = async function getAll(req, res) {
   // Only authenticated students can access the route `Student=3`
   if (!isAuthorized(req.user.roleId, 3)) {
     return sendUnauthorizedResponse(res);
   }
 
   let response = await this.service.getAll(req.user.email);
   res.status(response.statusCode).send(response);
 };
 CartController.prototype.addProductToCart = async function addProductToCart(req, res) {
   if (!isAuthorized(req.user.roleId, 3)) {
     return sendUnauthorizedResponse(res);
   }
 
   let response = await this.service.addProductToCart(req.body, req.user.email);
   res.status(response.statusCode).send(response);
 };
 CartController.prototype.deleteProductFromCart = async function deleteProductFromCart(req, res) {
   if (!isAuthorized(req.user.roleId, 3)) {
     return sendUnauthorizedResponse(res);
   }
 
   let response = await this.service.deleteProductFromCart(req.params.productId, req.user.email);
   res.status(response.statusCode).send(response);
 };
 CartController.prototype.isProductAvailableInCart = async function isProductAvailableInCart(req, res) {
   if (!isAuthorized(req.user.roleId, 3)) {
     return sendUnauthorizedResponse(res);
   }
 
   let response = await this.service.isProductAvailableInCart(req.params.productId, req.user.email);
   res.status(response.statusCode).send(response);
 };
 
 module.exports = CartController;
 