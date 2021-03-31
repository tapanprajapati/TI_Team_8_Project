function ContactUsController(service) {
  this.service = service;
  this.postContactUsMessage = this.postContactUsMessage.bind(this);
}
ContactUsController.prototype.postContactUsMessage = async function postContactUsMessage(req, res) {
  let response = await this.service.postContactUsMessage(req.body);
  res.status(response.statusCode).send(response);
};

module.exports = ContactUsController;
