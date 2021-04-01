const mysql = require('mysql');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');
const { formatProducts } = require('../helpers/formatters/formatter');
const { formatUsers } = require('../helpers/formatters/formatter');
const nodemailer = require('nodemailer');

/**
 * Creating a new database instance
 */
const database = new Database(dbConfig);

function CheckoutService() {}

/**
 * Services interacting with database and returning the results back to the controller
 */

// method to create an order.
CheckoutService.prototype.createOrder = async function createOrder(data, banner) {
  const pickupdate = data.pickupDate;
  const pickuptime = data.pickupTime;

  // This dateTime is created to match the format of the database field.
  const dateTime = pickupdate + ' ' + pickuptime + ':00';
  const today = new Date();

  // By default the status of the order will be placed initially.
  const status = 'placed';

  // Query to create an order in order table.
  const createOrderquery = mysql.format(queries.createOrder, [banner, today, status, dateTime]);
  console.log(`The Query for creating a Order entry - ${createOrderquery}`);

  // fetch an order id for the recent order by user
  fetchidquery = mysql.format(queries.fetchOrderId, [banner]);
  console.log(`Query to fetch order Id-${fetchidquery}`);

  // fetch the products in the cart to add in orderdetails table
  const getCartProductsQuery = mysql.format(queries.getCartProducts, banner);
  console.log(`The Query for fetching all products from cart - ${getCartProductsQuery}`);
  const getUserQuery = mysql.format(queries.signIn, [banner]);
  console.log(`The Query to fetch email address-${getUserQuery}`);
  let result = await database.query(getUserQuery);
  const users = formatUsers(result);
  console.log(users);
  const email = users[0].email;

  try {
    let items = await database.query(createOrderquery);
    const id = await database.query(fetchidquery);
    let result = await database.query(getCartProductsQuery);
    const cartItems = formatProducts(result);
    const orderID = id[0].OrderId;
    console.log('Order ID:' + id[0].OrderId);
    let listofproducts;
    // This loop will add all the products into the orderdetails table.
    for (var i = 0; i < Object.keys(cartItems).length; i++) {
      var keys = Object.keys(cartItems[i]);
      console.log(cartItems[i]);
      listofproducts = `
      <tr class="item">
                <td>
                    ${cartItems[i][keys[1]]}
                </td>
                
                <td>
                    ${cartItems[i][keys[3]]}
                </td>
            </tr>${listofproducts}`;
      console.log('email constant:' + listofproducts);
      let result = await database.query(
        mysql.format(queries.createOrderdetails, [id[0].OrderId, cartItems[i][keys[0]], cartItems[i][keys[3]]])
      );
    }

    const deletecartquery = mysql.format(queries.deletecart, banner);
    console.log('Delete query:' + deletecartquery);
    let rs = await database.query(deletecartquery);

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'adv.sdc.g.16@gmail.com', // generated ethereal user
        pass: 'SDCGROUP16', // generated ethereal password
      },
    });
    let mailOptions = {
      from: 'SAMKIT SHAH', // sender address
      to: email, // list of receivers
      subject: 'Order Placed Successfully.', // Subject line
      text: 'Order Placed Successfully.', // plain text body
      html: `
      <html>
      <head>          
          <style>
          .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, .15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
          }
          
          .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
          }
          
          .invoice-box table td {
              padding: 5px;
              vertical-align: top;
          }
          
          .invoice-box table tr td:nth-child(2) {
              text-align: right;
          }
          
          .invoice-box table tr.top table td {
              padding-bottom: 20px;
          }
          
          .invoice-box table tr.top table td.title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
          }
          
          .invoice-box table tr.information table td {
              padding-bottom: 40px;
          }
          
          .invoice-box table tr.heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
          }
          
          .invoice-box table tr.details td {
              padding-bottom: 20px;
          }
          
          .invoice-box table tr.item td{
              border-bottom: 1px solid #eee;
          }
          
          .invoice-box table tr.item.last td {
              border-bottom: none;
          }
          
          .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
          }
          
          @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
              
              .invoice-box table tr.information table td {
                  width: 100%;
                  display: block;
                  text-align: center;
              }
          }
          
          /** RTL **/
          .rtl {
              direction: rtl;
              font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          }
          
          .rtl table {
              text-align: right;
          }
          
          .rtl table tr td:nth-child(2) {
              text-align: left;
          }
          </style>
      </head>
      
      <body>
          <div class="invoice-box">
              <table cellpadding="0" cellspacing="0">
                  <tr class="top">
                      <td colspan="2">
                          <table>
                              <tr>
                                  <td class="title">
                                      <img src="https://i.ibb.co/9N6hYNn/image.png" style="width:100%; max-width:300px;">
                                  </td>
                                  
                                  <td>
                                      Order #: ${orderID}<br>
                                      Pickup Date: ${pickupdate}<br>
                                      Pickup Time: ${pickuptime}
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  
                  <tr class="information">
                      <td colspan="2">
                          <table>
                              <tr>
                                  <td>
                                      Student Union Bldg.<br>
                                      6136 University Ave<br>
                                      Halifax, NS B3H 4R2
                                  </td>
                                  
                                  <td>
                                      Dal Student Union.<br>
                                      dsufoodbank@dal.ca<br>
                                      (902) 494-2140
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
      
                  <tr class="heading">
                      <td>
                          Item
                      </td>
                      
                      <td>
                          Quantity
                      </td>
                  </tr>
                  ${listofproducts}
              </table>
          </div>
      </body>
      </html>   
      `,
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('error' + error);
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', { msg: 'Email has been sent' });
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Order placed successfully.',
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Please try after some time.',
      error,
    };
  }
};
module.exports = CheckoutService;
