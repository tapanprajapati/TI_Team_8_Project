
function checkoutController(service) {
  this.service = service;
  this.createOrder = this.createOrder.bind(this);
}

// This method will call service to create an order and send the order object in request body.
checkoutController.prototype.createOrder = async function createOrder(req, res) {
  let response = await this.service.createOrder(req.body, req.params.email);
  res.status(response.statusCode).send(response);
};

module.exports = checkoutController;
