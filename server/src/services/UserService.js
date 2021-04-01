const mysql = require('mysql');
const bcrypt = require('bcrypt');
const Database = require('config/database');
const queries = require('app-data/queries');
const dbConfig = require('app-data/dbConfig');
const nodemailer = require('nodemailer');
const { formatUsers } = require('../helpers/formatters/formatter');
const { jwtSecret, jwtDuration, jwtAlgorithm } = require('app-data/tokenConfig');
const jwt = require('jsonwebtoken');

/**
 * Creating a new database instance
 */
const database = new Database(dbConfig);

function UserService() {}

/**
 * Services interacting with database and returning the results back to the controller
 */
UserService.prototype.authenticate = async function authenticate(credentials) {
  const signInQuery = mysql.format(queries.signIn, [credentials.email, credentials.password]);

  console.log(`The Query for finding user entry - ${signInQuery}`);

  let result = await database.query(signInQuery);
  const users = formatUsers(result);

  if (users.length === 0) {
    return {
      success: false,
      statusCode: 404,
      message: 'user not found',
    };
  }
  if (users.length === 1) {
    let checkpass = bcrypt.compareSync(credentials.password, users[0].password);
    if (checkpass === true) {
      return {
        success: true,
        statusCode: 200,
        user: users[0], // Todo: remove password from the object
      };
    } else {
      return {
        success: false,
        statusCode: 400,
        message: 'incorrect password',
      };
    }
  }
};

// This function will create a new user.
UserService.prototype.createUser = async function createUser(data) {
  const saltRounds = 10;
  const plain_password = data.password;
  const cipher_password = bcrypt.hashSync(plain_password, saltRounds);
  const email_id = data.email;
  // Query to create a new user.
  const createUserquery = mysql.format(queries.createUser, [
    data.phone,
    data.firstName,
    data.lastName,
    cipher_password,
    data.email,
    data.role,
  ]);
  console.log(`The Query for creating a User entry - ${createUserquery}`);

  try {
    let items = await database.query(createUserquery);

    // This transporter will be used to send an email to user.
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'adv.sdc.g.16@gmail.com', // generated ethereal user
        pass: 'SDCGROUP16', // generated ethereal password
      },
    });

    // This is a format of the email.
    // setup email data with unicode symbols
    let mailOptions = {
      from: 'SAMKIT SHAH', // sender address
      to: email_id, // list of receivers
      subject: 'Account created successfully.', // Subject line
      text: 'Account created successfully.', // plain text body
      html: `<div style="background-color: #F5F7FA; padding: 50px; min-width: 360px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 60px 75px 50px; background-color: white;">
      <img style="display: block; max-width: 200px; height: auto;"
        src="https://i.ibb.co/9N6hYNn/image.png"
        alt="FoodCare Logo" />
      <h1 style="padding: 50px 0 15px; font-family: Arial, sans-serif; font-size: 36px; color: #343B4E;">Welcome to
        FoodCare</h1>
      <p style="padding-bottom: 15px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
        Thank you for signing up to be a member of the DSU FoodCare.</p>
      <p style="padding-bottom: 15px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
          We are aware that food insecurity is a problem in the student community. Sometimes money doesn't come in, loans get delayed, or you've got other expenses that suddenly appear.
          Don't worry, whether you need long term assistance or just a few meals to get by, please come visit us.
      </p>
      <p style="padding-bottom: 15px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
        You are now able to login to FoodCare and access all our resources.</p>
      <p style="padding: 25px 0 40px;">
        <a style="padding: 20px 25px; background-color: #46A069; color: #FFFFFF; text-decoration: none; text-transform: uppercase; font-family: Arial, sans-serif; font-size: 20px;"
          href="https://dsu-food-bank.herokuapp.com/login" target="_blank">CLICK HERE TO LOGIN</a>
      </p>
      <p style="padding-bottom: 15px; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
        If you have any problem and need any help then you can call us on (902)-494-2140.
        For more information email dsufoodbank@dal.ca
      </p>
      <p style="padding-bottom: 0; font-family: Arial, sans-serif; font-size: 18px; color: #52556B; line-height: 1.5">
        Thank you,<br />The Team of DSU FoodCare</p>
    </div>
    <p style="padding: 50px 0 0; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #838A9F">
      Copyright&copy; 2020 Dalhousie Student Union
      6136 University Ave
      PO Box 15000
      Halifax NS  B3H 4R2</p>
    <p style="padding: 0; text-align: center; font-family: Arial, sans-serif; font-size: 12px;">
      <a href="https://www.facebook.com/dsufoodbank/" style="color: #52556B; text-decoration: none;">Facebook</a>
      &nbsp;|&nbsp;
      <a href="https://www.instagram.com/dsufoodbank/" style="color: #52556B; text-decoration: none;">Instagram</a>
    </p>
  </div>`,
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
      items,
    };
  } catch (error) {
    if (error.errno === 1062) {
      return {
        success: false,
        statusCode: 400,
        message: 'User already exists.',
        error,
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: 'Please try after some time.',
        error,
      };
    }
  }
};

// Method to get the roles from the database.
UserService.prototype.getRoles = async function getRoles() {
  const getRolesquery = queries.getRoles;

  // Query to fetch the roles from the database.
  console.log(`The Query for returning all roles information - ${getRolesquery}`);
  try {
    let items = await database.query(getRolesquery);
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

// Method to get password reset token from database
UserService.prototype.getPasswordResetToken = async function getPasswordResetToken(param) {
  const getResetTokenQuery = mysql.format(queries.getResetToken, [param.email]);

  // Query to fetch the roles from the database.
  console.log(`The Query for getting password reset token - ${getResetTokenQuery}`);
  try {
    let items = await database.query(getResetTokenQuery);
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

// Method to get password reset token from database
UserService.prototype.removeToken = async function removeToken(param) {
  const removeTokenQuery = mysql.format(queries.removeToken, [param.email]);

  // Query to fetch the roles from the database.
  console.log(`The Query for removing token - ${removeTokenQuery}`);
  try {
    let items = await database.query(removeTokenQuery);
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

// Method to convert token to banner id
UserService.prototype.convertTokenToBannerId = async function convertTokenToBannerId(param) {
  // Query to fetch the roles from the database.
  console.log(`Token - ${param.token}`);

  try {
    var email = jwt.verify(param.token, jwtSecret);
    console.log('Decoded email: ' + email);
    return {
      success: true,
      statusCode: 200,
      items: email,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};
UserService.prototype.getUser = async function getUser(email) {
  const getUserQuery = mysql.format(queries.getUser, email);

  console.log(`The Query for returning user information - ${getUserQuery}`);
  try {
    let user = await database.query(getUserQuery);
    user = formatUsers(user);
    if (user.length != 1) {
      return {
        success: false,
        statusCode: 404,
        message: 'User Not Found',
      };
    } else {
      return {
        success: true,
        statusCode: 200,
        items: user[0],
      };
    }
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error,
    };
  }
};

// Method to update password
UserService.prototype.updatePassword = async function updatePassword(param, body) {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const plain_password = body.password;
  const cipher_password = bcrypt.hashSync(plain_password, saltRounds);

  const getUpdatePasswordQuery = mysql.format(queries.updatePassword, [cipher_password, param.email]);

  // Query to fetch the roles from the database.
  console.log(`The Query for updating password - ${getUpdatePasswordQuery}`);
  try {
    let items = await database.query(getUpdatePasswordQuery);
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

UserService.prototype.updateUser = async function updateUser(user, email) {
  const updateUserQuery = mysql.format(queries.updateUser, [user.firstName, user.lastName, user.email, email]);
  console.log(`The Query for updating product - ${updateUserQuery}`);
  try {
    let result = await database.query(updateUserQuery);
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

// Method to send the reset link to the user
UserService.prototype.resetPassword = async function resetPassword(data) {
  console.log('DaTA:' + data);
  console.log('Data.Email' + data.email);
  const signInQuery = mysql.format(queries.signIn, [data.email]);

  console.log(`The Query for finding user entry - ${signInQuery}`);

  let check = await database.query(signInQuery);
  const u = formatUsers(check);

  if (u.length === 0) {
    return {
      success: false,
      statusCode: 404,
      message: 'User does not exist.',
    };
  }

  //Created token
  var resettoken = jwt.sign({ email: data.email }, jwtSecret);

  console.log(resettoken);
  const resetPasswordQuery = mysql.format(queries.resetPassword, [resettoken, data.email]);
  const getUserQuery = mysql.format(queries.signIn, [data.email]);
  console.log(`The Query to fetch email address-${getUserQuery}`);

  let result = await database.query(getUserQuery);
  const users = formatUsers(result);
  console.log(users);
  const email = users[0].email;
  console.log(`The Query for reset a password entry - ${resetPasswordQuery}`);

  // This will verify and provide the BannerId
  // var decoded = jwt.verify(resettoken, jwtSecret);
  // console.log("Decoded BannerID: "+decoded.bannerId);
  try {
    let items = await database.query(resetPasswordQuery);

    // This transporter will be used to send an email to user.
    // create reusable transporter object using the default SMTP transport
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
      subject: 'Reset Password.', // Subject line
      text: 'Reset your password.', // plain text body
      html: `<h2> Please click on the given link to reset the password</h2>
            <p>https://dsu-food-bank.herokuapp.com/updatepassword/${resettoken}</p>
            
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
      items,
    };
  } catch (error) {
    if (error.errno === 1062) {
      return {
        success: false,
        statusCode: 400,
        message: 'User already exists.',
        error,
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: 'Please try after some time.',
        error,
      };
    }
  }
};
module.exports = UserService;
