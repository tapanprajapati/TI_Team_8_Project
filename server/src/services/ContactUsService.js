const mysql = require('mysql');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');

/**
 * Creating a new database instance
 **/
const database = new Database(dbConfig);

function ContactUsService() {
  /**
   * Services interacting with database and returning the results back to the controller
   */

  ContactUsService.prototype.postContactUsMessage = async function postContactUsMessage(data) {
    const newContactUsquery = mysql.format(queries.postContactUsMessage, [data.FirstName, data.Email, data.Message]);

    console.log(`The Query for submitting contact us form - ${newContactUsquery}`);

    try {
      let items = await database.query(newContactUsquery);
      return {
        success: true,
        statusCode: 200,
        items,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: 500,
        error,
      };
    }
  };
}

module.exports = ContactUsService;
