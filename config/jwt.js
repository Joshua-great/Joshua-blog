const jwt = require('jsonwebtoken');
//For login authentications
function generateToken(user) {
  const payload = {
    email: user.email,
    firstname:user.firstname,
    lastname:user.lastname,
    pasword:user.password

  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = generateToken;
