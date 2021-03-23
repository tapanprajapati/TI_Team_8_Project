/**
 * @author Parth Parmar <parth.parmar@dal.ca>
 *
 * Authentication utilities for generating, sending, and validating token.
 * Checking authorization for different roles and sending appropriate response
 *
 */

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { jwtSecret, jwtDuration, jwtAlgorithm } = require('app-data/tokenConfig');

const generateJwtToken = (userPayload, secret, expiryDuration) => {
  return jwt.sign(userPayload, secret, { expiresIn: expiryDuration });
};

const sendJwtToken = (req, res) => {
  const statusCode = res.authenticate.statusCode;
  const email = req.body.email;
  const roleId = res.authenticate.user.roleid;
  let token;
  if (statusCode === 200) {
    token = generateJwtToken({ email, roleId }, jwtSecret, jwtDuration);
  }

  res.status(statusCode).send({
    token,
    authenticate: res.authenticate,
  });
};

const authenticateRoute = expressJwt({
  secret: jwtSecret,
  algorithms: [jwtAlgorithm],
});

const isAuthorized = (incomingRole, existingRole) => {
  return incomingRole === existingRole;
};

const sendUnauthorizedResponse = (res) => {
  return res.status(401).send({
    success: false,
    statusCode: 401,
    message: `You are not authorized to access the route`,
  });
};

module.exports = {
  sendJwtToken,
  authenticateRoute,
  isAuthorized,
  sendUnauthorizedResponse,
};
