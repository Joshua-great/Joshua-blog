const express = require('express');
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');


const userRouter = express.Router();
const app = express();

userRouter.get('/', (req, res) => {
  res.render('home');
});
userRouter.get('/login', (req, res) => {
  res.render('login');
});
userRouter.get('/blog', (req, res) => {
 
  res.render('blog'); // Adjust this line to render your blog page
});
userRouter.post('/login', async (req, res) => {
  try{
  const response = await authController.login(req, res);

  if (response && response.code == 200) {
  
    // If login is successful, set a JWT cookie and redirect to the blog page
    res.cookie('jwt', response.token, { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true });
  
    res.redirect('/blog');

  } 
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
  res.render('login', { message: 'An error occurred.' });
}
});
  






// Signup route
userRouter.get('/signup', (req, res) => {
  res.render('signup');
});

userRouter.post("/signup", async (req,res)=>{
  const response = await authController.createUser({
      email:req.body.email,
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      password:req.body.password
  })
  if(response.code === 200){
      res.redirect("/login")
  }else {
    // Pass the error message to the login page
    res.render('signup', { message: response.message });
  }
  // else{
  //     res.redirect("/existingUser")
  // }
})

module.exports = userRouter;



