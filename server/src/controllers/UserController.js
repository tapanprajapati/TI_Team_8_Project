function UserController(service) {
  this.service = service;
  this.authenticate = this.authenticate.bind(this);
  this.createUser = this.createUser.bind(this);
  this.getRoles = this.getRoles.bind(this);
  this.resetPassword = this.resetPassword.bind(this);
  this.getPasswordResetToken = this.getPasswordResetToken.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.convertTokenToBannerId = this.convertTokenToBannerId.bind(this);
  this.removeToken = this.removeToken.bind(this);
  this.getUser = this.getUser.bind(this);
  this.updateUser = this.updateUser.bind(this);
}

UserController.prototype.authenticate = async function authenticate(req, res, next) {
  if (!req.body) {
    return next();
  }
  const response = await this.service.authenticate(req.body);
  res.authenticate = response;
  return next();
};

// This method will call the service to create user and pass the user object in request body.
UserController.prototype.createUser = async function createUser(req, res) {
  let response = await this.service.createUser(req.body);
  res.status(response.statusCode).send(response);
};

// This method will call the service to get the roles from the database and return response.
UserController.prototype.getRoles = async function getRoles(req, res) {
  let response = await this.service.getRoles();
  res.status(response.statusCode).send(response);
};

UserController.prototype.resetPassword = async function resetPassword(req, res) {
  console.log(req.body);
  let response = await this.service.resetPassword(req.body);
  res.status(response.statusCode).send(response);
};

UserController.prototype.getPasswordResetToken = async function getPasswordResetToken(req, res) {
  console.log(req.params);
  let response = await this.service.getPasswordResetToken(req.params);
  res.status(response.statusCode).send(response);
};

UserController.prototype.updatePassword = async function updatePassword(req, res) {
  console.log(req.body);
  console.log(req.params);
  let response = await this.service.updatePassword(req.params, req.body);
  res.status(response.statusCode).send(response);
};

UserController.prototype.convertTokenToBannerId = async function convertTokenToBannerId(req, res) {
  console.log(req.params);
  let response = await this.service.convertTokenToBannerId(req.params);
  res.status(response.statusCode).send(response);
};

UserController.prototype.removeToken = async function removeToken(req, res) {
  console.log(req.params);
  let response = await this.service.removeToken(req.params);
};
UserController.prototype.getUser = async function getUser(req, res) {
  let response = await this.service.getUser(req.params.email);
  res.status(response.statusCode).send(response);
};

UserController.prototype.updateUser = async function updateUser(req, res) {
  let response = await this.service.updateUser(req.body, req.params.email);
  res.status(response.statusCode).send(response);
};

module.exports = UserController;
