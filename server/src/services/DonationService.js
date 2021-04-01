const mysql = require('mysql');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');
const { fromDonations } = require('../helpers/formatters/formatter');

/**
 * Creating a new database instance
 */
const database = new Database(dbConfig);

function DonationService() {}

/**
 * Services interacting with database and returning the results back to the controller
 */
DonationService.prototype.getAll = async function getAll() {
  const getAllDonationsQuery = queries.getDonations;
  console.log(`The Query for fetching all donations - ${getAllDonationsQuery}`);
  try {
    let result = await database.query(getAllDonationsQuery);
    return {
      success: true,
      statusCode: 200,
      items: fromDonations(result),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

DonationService.prototype.getByDonationId = async function getByDonationId(params) {
  const getDonationId = mysql.format(queries.getDonation, [params.donationId]);
  console.log(`The Query for finding the donation - ${getDonationId}`);
  try {
    let result = await database.query(getDonationId);
    console.log('Result');
    console.log(result);
    const donations = fromDonations(result);
    console.log(donations);
    console.log(donations);
    return {
      success: true,
      statusCode: 200,
      items: donations,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

// This function will create a new user.
DonationService.prototype.insert = async function insert(data) {
  console.log(data);
  phone = data.phone;
  name = data.name;
  address1 = data.address1;
  address2 = data.address2;
  zipcode = data.zipcode;
  pickupslot = data.pickupslot;
  // Query to create a new user.
  const insertQuery = mysql.format(queries.insertDonation, [phone, name, address1, address2, zipcode, pickupslot]);
  console.log(`The Query for inserting donation - ${insertQuery}`);
  try {
    let result = await database.query(insertQuery);
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

module.exports = DonationService;
