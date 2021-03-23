/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 * Inspired by: https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
 * Wrapper around `mysql` package to return promise.
 */
const mysql = require('mysql');

function Database(config) {
  this.connection = mysql.createConnection(config);
}
Database.prototype.query = function query(sql, args) {
  return new Promise((resolve, reject) => {
    this.connection.query(sql, args, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
Database.prototype.connect = function connect() {
  return new Promise((resolve, reject) => {
    this.connection.connect((err) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        success: true,
        message: 'Database connection established.',
      });
    });
  });
};
Database.prototype.end = function end() {
  return new Promise((resolve, reject) => {
    this.connection.end((err) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        success: true,
        message: 'Database connection closed.',
      });
    });
  });
};

module.exports = Database;
