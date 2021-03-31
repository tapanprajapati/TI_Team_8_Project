const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const ContactUsService = require('src/services/ContactUsService');
const ContactUsController = require('src/controllers/ContactUsController');
const contactUsController = new ContactUsController(new ContactUsService());
const { authenticateRoute } = require('src/helpers/auth');

router.route(`/`).post(contactUsController.postContactUsMessage);

module.exports = router;
