const { default: mongoose } = require("mongoose");
require('dotenv').config

function connectToMongoDB(){

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
      console.log('Connected to MongoDB');
    })
     .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
            }
module.exports= {connectToMongoDB};