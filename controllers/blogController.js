const Blog = require('../models/Blog');
const User = require('../models/User');


const createBlog = async (req, res) => {
  try {
    const { title, description, body, tags } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const author = req.email.body;
    const newBlog = new Blog({
      title,
      description,
      body,
      author,
      tags,
      _id: user._id,
    });
    const blogPost = await newBlog.save();
    user.blog = user.blog.concat(blogPost._id);
    await user.save();
    res.status(200).json({ blogPost });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


const getABlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const blog = await Blog.findById(_id).where({ state: "published" });
    if (!blog) {
      res.status(404).json("NO blog found!");
    }
    blog.readCount++;
    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const queryObj = { ...req.query };



    //FILTERING
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = Blog.find(queryObj);

    //SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);

    } else {
      query = query.sort("-createdAt");

    }

    //PAGINATION
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numOfArticle = await blogs
        .countDocuments()
        .where({ state: "published" });
      if (skip >= numOfArticle) throw new Error("page does not exist");
    }
    query = query.skip(skip).limit(limit);


    const publishedBlogs = await blogs
      .find(query)
      .where({ state: "published" })
      .populate("user", { firstName: 1, lastName: 1, _id: 1 });

    res.status(200).json(publishedBlogs);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const updateBlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.user;
    const { title, description, state, tags, body } = req.body;


    const blog = await Blog.findById(_id);

    if (blog.user._id.toString() === user.id) {
      try {
        const updatedBlog = await Blog.findByIdAndUpdate(
          _id,
          { title, description, state, tags, body, readingTime },
          { new: true }
        );

        await updatedBlog.save();
        res.status(200).json(updatedBlog);
      } catch (error) {
        res.status(500).json(error.message);
      }
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const _id = req.User._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const userBlogs = await Blog
    .findById(_id)
      .skip(skip)
      .limit(limit);
    return res.status(200).json(userBlogs);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = req.User;

    const blog = await Blog.findById(_id);

    if (blog.user._id.toString() === user._id) {
      try {
        await Blog.deleteOne();
        res
          .status(200)
          .json({ status: "success", message: "blog deleted successfully" });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createBlog,
  getABlog,
  getAllBlogs,
  updateBlog,
  getUserBlogs,
  deleteBlog,
};
