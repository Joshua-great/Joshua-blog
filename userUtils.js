const jwt = require('jsonwebtoken');
require('dotenv').config();
// Your secret key (keep this secret)
const secretKey = process.env.JWT_SECRET;

// User data to be included in the token
const user = {
  _id: 'user123', // Example user ID
 first_name: 'Joshua',
 email:'olatokunjoshua@gmail.com',
 last_name:'Olatokun',
};

// Generate a JWT token
function generateToken(user) {
  // Set the payload with user data and an expiration time (optional)
  const payload = {
    user: user,
    // Add an optional expiration time (e.g., 1 hour)
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  };

  // Sign the token with your secret key
  return jwt.sign(payload, process.env.JWT_SECRET);
}

// Verify a JWT token
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    // Token is invalid
    return null;
  }
}

// Example usage:
const token = generateToken(user);
console.log('Generated Token:', token);

const verifiedData = verifyToken(token);
if (verifiedData) {
  console.log('Verified Data:', verifiedData);
} else {
  console.log('Token is invalid');
}
