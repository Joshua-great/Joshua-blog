const express = require('express');
const blogController = require('../controllers/blogController');
const { body } = require('express-validator');
const blogRouter = express.Router();
const isAuthenticated = require("../middleware/auth");
blogRouter
  .route("/")
  .get(blogController.getAllBlogs)
  .post(isAuthenticated, blogController.createBlog);

blogRouter.route("/:id").get(blogController.getABlog);

blogRouter
  .route("/blog/:id")
  .get(isAuthenticated, blogController.getUserBlogs)
  .put(isAuthenticated, blogController.updateBlog)
  .delete(isAuthenticated, blogController.deleteBlog);

module.exports = blogRouter;