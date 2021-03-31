const mysql = require('mysql');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');
const { formatCatgories } = require('../helpers/formatters/formatter');

/**
 * Creating a new database instance
 */
const database = new Database(dbConfig);

function CategoryService() {}

/**
 * Services interacting with database and returning the results back to the controller
 */
CategoryService.prototype.getAll = async function getAll() {
  const getCategoriesQuery = queries.getCategories;
  console.log(`The Query for fetching all products from categories - ${getCategoriesQuery}`);
  try {
    let result = await database.query(getCategoriesQuery);
    console.log('Result of categories' + result);
    const categories = formatCatgories(result);
    console.log('Result of categories:' + categories[0].name);
    return {
      success: true,
      statusCode: 200,
      items: categories,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

CategoryService.prototype.create = async function create(data) {
  const addCategoryQuery = mysql.format(queries.addCategory, [data.name]);
  console.log(`The Query for creating category - ${addCategoryQuery}`);
  try {
    let result = await database.query(addCategoryQuery);
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

CategoryService.prototype.update = async function update(param, data) {
  const updateCategoryQuery = mysql.format(queries.updateCategory, [data.name, param.id]);
  console.log(`The Query for creating category - ${updateCategoryQuery}`);
  try {
    let result = await database.query(updateCategoryQuery);
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

module.exports = CategoryService;
