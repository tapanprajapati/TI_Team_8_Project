function DonationController(service) {
  this.service = service;
  this.getAll = this.getAll.bind(this);
  this.getByDonationId = this.getByDonationId.bind(this);
  this.insert = this.insert.bind(this);
}

DonationController.prototype.getAll = async function getAll(req, res) {
  let response = await this.service.getAll();
  res.status(response.statusCode).send(response);
};

DonationController.prototype.getByDonationId = async function getByDonationId(req, res) {
  let response = await this.service.getByDonationId(req.params);
  res.status(response.statusCode).send(response);
};

DonationController.prototype.insert = async function insert(req, res) {
  let response = await this.service.insert(req.body);
  res.status(response.statusCode).send(response);
};

module.exports = DonationController;
