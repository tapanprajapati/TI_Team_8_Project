const mysql = require('mysql');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');
const { formatOrderDetail } = require('../helpers/formatters/formatter');

/**
 * Creating a new database instance
 */
const database = new Database(dbConfig);

function OrderService() {}

/**
 * Services interacting with database and returning the results back to the controller
 */
OrderService.prototype.getAll = async function getAll() {
  const getAllOrdersQuery = queries.getOrders;
  console.log(`The Query for fetching all products - ${getAllOrdersQuery}`);
  try {
    let result = await database.query(getAllOrdersQuery);
    return {
      success: true,
      statusCode: 200,
      items: result,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

OrderService.prototype.getByOrderId = async function getByOrderId(params) {
  const getOrderId = mysql.format(queries.getOrder, [params.orderId]);
  console.log(`The Query for finding the orders - ${getOrderId}`);
  try {
    let result = await database.query(getOrderId);
    console.log(result);
    const orderDetail = formatOrderDetail(result);
    console.log(orderDetail);
    return {
      success: true,
      statusCode: 200,
      items: orderDetail,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

OrderService.prototype.getByUser = async function getByUser(params) {
  const getOrderByUser = mysql.format(queries.getOrdersByBannerId, [params.bannerId]);
  console.log(`The Query for finding the orders for banner id- ${getOrderByUser}`);
  try {
    let result = await database.query(getOrderByUser);
    console.log(result);
    return {
      success: true,
      statusCode: 200,
      items: result,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

OrderService.prototype.updateOrderStatusById = async function updateOrderStatusById(params, data) {
  const updateOrderStatus = mysql.format(queries.orderStatusUpdate, [data.status, params.orderId]);
  console.log(`The Query for updating order status - ${updateOrderStatus}`);
  try {
    let result = await database.query(updateOrderStatus);
    console.log(result);
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

OrderService.prototype.setOrderDate = async function setOrderDate(params) {
  const setOrderDateQuery = mysql.format(queries.setOrderDeliveredDate, [params.orderId]);
  console.log(`The Query for updating order status - ${setOrderDateQuery}`);
  try {
    let result = await database.query(setOrderDateQuery);
    console.log(result);
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

module.exports = OrderService;
