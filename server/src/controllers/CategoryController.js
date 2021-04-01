function CategoryController(service) {
  this.service = service;
  this.getAll = this.getAll.bind(this);
  this.create = this.create.bind(this);
  this.update = this.update.bind(this);
}
CategoryController.prototype.getAll = async function getAll(req, res) {
  let response = await this.service.getAll();
  res.status(response.statusCode).send(response);
};

CategoryController.prototype.create = async function create(req, res) {
  let response = await this.service.create(req.body);
  res.status(response.statusCode).send(response);
};

CategoryController.prototype.update = async function update(req, res) {
  let response = await this.service.update(req.params, req.body);
  res.status(response.statusCode).send(response);
};

module.exports = CategoryController;
