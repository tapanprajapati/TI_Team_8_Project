const express = require('express');
const router = express.Router();

const DonationService = require('src/services/DonationService');
const DonationController = require('src/controllers/DonationController');
const donationController = new DonationController(new DonationService());

router.route(`/`).get(donationController.getAll).post(donationController.insert);
router.route(`/:donationId`).get(donationController.getByDonationId);

module.exports = router;
