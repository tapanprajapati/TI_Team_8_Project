/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 * @author Tapan Prajapati <Tapan.Prajapati@dal.ca>
 *
 * Service layer for the product resource communicating with the database and transforming the response for front-end
 */

const mysql = require('mysql');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');
const { formatProducts } = require('../helpers/formatters/formatter');

/**
 * Creating a new database instance
 */
const database = new Database(dbConfig);

function ProductService() {}

/**
 * Services interacting with database and returning the results back to the controller
 */
ProductService.prototype.getAll = async function getAll(queryParams) {
  let getAllProductsQuery = generateProductAccessQuery(queryParams);

  console.log(`The Query for fetching all products - ${getAllProductsQuery}`);

  try {
    let result = await database.query(getAllProductsQuery);

    const products = formatProducts(result);
    return {
      success: true,
      statusCode: 200,
      items: products,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

ProductService.prototype.getProductById = async function getProductById(id) {
  const getProductByIdQuery = mysql.format(queries.getProductById, id);
  console.log(`The Query to fetch product details - ${getProductByIdQuery}`);

  try {
    let result = await database.query(getProductByIdQuery);

    const products = formatProducts(result);
    return {
      success: true,
      statusCode: 200,
      items: products,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

ProductService.prototype.create = async function create(data) {
  const getCreateProductQuery = mysql.format(queries.createProduct, [
    data.name,
    data.desc,
    data.categoryId,
    data.availableQty,
    data.limit,
  ]);
  console.log(`The Query for creating product - ${getCreateProductQuery}`);
  try {
    let result = await database.query(getCreateProductQuery);
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

ProductService.prototype.update = async function update(data, id) {
  const getUpdateProductQuery = mysql.format(queries.updateProduct, [
    data.name,
    data.desc,
    data.categoryId,
    data.availableQty,
    data.limit,
    id,
  ]);
  console.log(`The Query for updating product - ${getUpdateProductQuery}`);
  try {
    let result = await database.query(getUpdateProductQuery);
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

ProductService.prototype.deleteProduct = async function deleteProduct(id) {
  const getdeleteProductQuery = mysql.format(queries.deleteProduct, [id]);
  console.log(`The Query for deleting product - ${getdeleteProductQuery}`);
  try {
    let result = await database.query(getdeleteProductQuery);
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

function generateProductAccessQuery(queryParams) {
  let getAllProductsQuery;
  if (JSON.stringify(queryParams) != '{}') {
    if (queryParams.search && queryParams.filter) {
      getAllProductsQuery = mysql.format(queries.getProductsByNameAndCategory, `%${queryParams.search}%`);
      getAllProductsQuery = formFilterParamsQuery(decodeURIComponent(queryParams.filter), getAllProductsQuery);
    } else if (queryParams.search) {
      getAllProductsQuery = mysql.format(queries.getProductsByName, `%${queryParams.search}%`);
    } else if (queryParams.filter) {
      getAllProductsQuery = formFilterParamsQuery(
        decodeURIComponent(queryParams.filter),
        queries.getProductsByCategory
      );
    }
  } else {
    getAllProductsQuery = queries.getProducts;
  }

  return getAllProductsQuery;
}

function formFilterParamsQuery(filterParams, query) {
  const categoryParams = filterParams.split(',').map((param) => {
    return Number(param);
  });

  for (let i = 0; i < categoryParams.length; i++) {
    query += categoryParams[i];
    if (i !== categoryParams.length - 1) {
      query += ',';
    }
    if (i === categoryParams.length - 1) {
      query += ') ORDER BY I.ItemId';
    }
  }
  return query;
}

module.exports = ProductService;
