function ProductController(service) {
  this.service = service;
  this.getAll = this.getAll.bind(this);
  this.getProductById = this.getProductById.bind(this);
  this.create = this.create.bind(this);
  this.update = this.update.bind(this);
  this.deleteProduct = this.deleteProduct.bind(this);
}

ProductController.prototype.getAll = async function getAll(req, res) {
  let response = await this.service.getAll(req.query);
  res.status(response.statusCode).send(response);
};

ProductController.prototype.create = async function create(req, res) {
  let response = await this.service.create(req.body);
  res.status(response.statusCode).send(response);
};

ProductController.prototype.update = async function update(req, res) {
  let response = await this.service.update(req.body, parseInt(req.params.productId));
  res.status(response.statusCode).send(response);
};

ProductController.prototype.getProductById = async function getProductById(req, res) {
  let response = await this.service.getProductById(req.params.productId);
  res.status(response.statusCode).send(response);
};

ProductController.prototype.deleteProduct = async function deleteProduct(req, res) {
  let response = await this.service.deleteProduct(req.params.productId);
  res.status(response.statusCode).send(response);
};
module.exports = ProductController;
