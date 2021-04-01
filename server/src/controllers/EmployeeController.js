function EmployeeController(service) {
  this.service = service;
  this.getAll = this.getAll.bind(this);
  this.deleteUserRole = this.deleteUserRole.bind(this);
  this.addUserRole = this.addUserRole.bind(this);
  this.getRole = this.getRole.bind(this);
  this.getStudent = this.getStudent.bind(this);
}
EmployeeController.prototype.getAll = async function getAll(req, res) {
  let response = await this.service.getAll();
  res.status(response.statusCode).send(response);
};

EmployeeController.prototype.getRole = async function getRole(req, res) {
  let response = await this.service.getRole();
  res.status(response.statusCode).send(response);
};

EmployeeController.prototype.getStudent = async function getStudent(req, res) {
  let response = await this.service.getStudent();
  res.status(response.statusCode).send(response);
};

EmployeeController.prototype.deleteUserRole = async function deleteUserRole(req, res) {
  let response = await this.service.deleteUserRole(req.params);
  res.status(response.statusCode).send(response);
};

EmployeeController.prototype.addUserRole = async function addUserRole(req, res) {
  let response = await this.service.addUserRole(req.body);
  res.status(response.statusCode).send(response);
};

module.exports = EmployeeController;
