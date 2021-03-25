
 const mysql = require('mysql');
 const Database = require('config/database');
 const queries = require('app-data/queries');
 const dbConfig = require('app-data/dbConfig');
 const { formatProducts } = require('../helpers/formatters/formatter');
 
 /**
  * Creating a new database instance
  */
 const database = new Database(dbConfig);
 
 function CartService() {}
 
 /**
  * Services interacting with database and returning the results back to the controller
  */
 CartService.prototype.getAll = async function getAll(email) {
   const getCartProductsQuery = mysql.format(queries.getCartProducts, email);
   console.log(`The Query for fetching all products from cart - ${getCartProductsQuery}`);
   try {
     let result = await database.query(getCartProductsQuery);
     const cartItems = formatProducts(result);
     return {
       success: true,
       statusCode: 200,
       items: cartItems,
     };
   } catch (error) {
     return {
       success: false,
       statusCode: 500,
       error,
     };
   }
 };
 
 CartService.prototype.addProductToCart = async function addProductToCart(cartItem, email) {
   const addProductToCartQuery = mysql.format(queries.addProductToCart, [
     email,
     cartItem.itemId,
     cartItem.itemQuantity,
     'true', 
   ]);
   console.log(`The Query to add an item in ${email}'s cart - ${addProductToCartQuery}`);
   try {
     let result = await database.query(addProductToCartQuery);
     return {
       success: true,
       statusCode: 200,
       result,
     };
   } catch (error) {
     return {
       success: false,
       statusCode: 500,
       error,
     };
   }
 };
 
 CartService.prototype.deleteProductFromCart = async function deleteProductFromCart(productId, email) {
   const deleteProductFromCartQuery = mysql.format(queries.deleteProductFromCart, [productId, email]);
   console.log(`The Query to delete a product from ${email}'s cart - ${deleteProductFromCartQuery}`);
   try {
     let result = await database.query(deleteProductFromCartQuery);
     return {
       success: true,
       statusCode: 200,
       result,
     };
   } catch (error) {
     return {
       success: false,
       statusCode: 500,
       error,
     };
   }
 };
 
 CartService.prototype.isProductAvailableInCart = async function isProductAvailableInCart(productId, email) {
   const isProductAvailableInCartQuery = mysql.format(queries.isProductAvailableInCart, [productId, email]);
   console.log(`The Query to check whether a product exist in ${email}'s cart - ${isProductAvailableInCartQuery}`);
   try {
     let result = await database.query(isProductAvailableInCartQuery);
     const isProductAvailable = result.length === 1;
     // TODO: Should I pass in product in result key?
     return {
       success: isProductAvailable ? true : false,
       statusCode: 200,
       result: isProductAvailable ? true : false,
     };
   } catch (error) {
     return {
       success: false,
       statusCode: 500,
       error,
     };
   }
 };
 
 module.exports = CartService;
 