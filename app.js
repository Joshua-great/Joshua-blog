const express = require('express');
const path = require('path');
const session = require('express-session');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/BlogRoutes');
const {connectToMongoDB}=require('./config/db')
const logger = require('./config/logger');
const passport=require('passport');
const isAuthenticated = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 3001;

connectToMongoDB()


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


const publicPath = path.join(__dirname, 'public');
const srcPath = path.join(__dirname, 'src');
const viewPath=path.join(__dirname, './views')

app.use(express.static(publicPath));
 app.use(express.static(srcPath));

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.Router())



//routes
app.use('/', authRoutes);
app.use('/blog', passport.authenticate('jwt', {session:false}), blogRoutes);
app.use('/', isAuthenticated);




// Start the server
app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
})