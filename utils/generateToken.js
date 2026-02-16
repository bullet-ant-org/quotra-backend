const jwt = require('jsonwebtoken');


// Accepts either id or { id, role }
const generateToken = (payload) => {
  let tokenPayload;
  if (typeof payload === 'object' && payload.id) {
    tokenPayload = { id: payload.id, role: payload.role };
  } else {
    tokenPayload = { id: payload };
  }
  return jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;