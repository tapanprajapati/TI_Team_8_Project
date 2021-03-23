/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 *
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ValidationError } = require('express-validation');

const orderRoutes = require('src/routes/orderRoutes');
const productRoutes = require('src/routes/productRoutes');
const categoryRoutes = require('src/routes/categoryRoutes');
const userRoutes = require('src/routes/userRoutes');
const employeeRoutes = require('src/routes/employeeRoutes');
const checkoutRoutes = require('src/routes/checkoutRoutes');
const cartRoutes = require('src/routes/cartRoutes');
const contactUsRoutes = require('src/routes/ContactUsRoutes');
const donationRoutes = require('src/routes/DonationRoutes');

/**
 * Express server initialization
 */
const server = express();

/**
 * Application configuration
 *
 */
server.use(cors());
server.use(bodyParser.json());

/**
 * Base route
 */
server.get('/', (req, res) => res.sendStatus(200));

/**
 * Application routes
 */
server.use('/api/orders', orderRoutes);
server.use('/api/products', productRoutes);
server.use('/api/categories', categoryRoutes);
server.use('/api/cart', cartRoutes);
server.use('/api', userRoutes);
// TODO: Remove unnecessary employee routes from here
server.use('/api/employee', employeeRoutes);
server.use('/api/employee/:BannerId/:RoleId', employeeRoutes);
server.use('api/employee/add', employeeRoutes);
server.use('api/employee/role', employeeRoutes);
server.use('api/employee/student', employeeRoutes);
server.use('/api/contactUs', contactUsRoutes);
server.use('/api/checkout', checkoutRoutes);
server.use('/api/donations', donationRoutes);
/**
 * Handling unexpected and validation errors
 */
server.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

module.exports = server;
