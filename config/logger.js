const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set the desired log level (info, error, debug, etc.)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'app.log' }) // Log to a file
    // You can add more transports as needed
  ],
});

module.exports = logger;
