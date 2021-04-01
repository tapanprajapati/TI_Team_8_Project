module.exports = {
  jwtSecret: process.env.JWTSECRET,
  jwtDuration: '1h',
  jwtAlgorithm: 'HS256',
};
