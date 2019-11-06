const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');
const User = require('../models/user');


blogsRouter.get('/comments', async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = new Comment({ blogId: request.params.id, comment: request.body.comment });
    const resp = await comment.save();
    response.status(201).json(resp.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const resp = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' });
    if (resp === null) {
      return response.status(400).json({ error: 'bad request' });
    }
    response.json(resp.toJSON()).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const blog = await Blog.findById(request.params.id);
    if (decodedToken.id === blog.user.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      const user = await User.findById(decodedToken.id);
      user.blogs = user.blogs.filter((x) => x.toString() !== request.params.id.toString());
      await User.findByIdAndUpdate(user.id, user, { new: true, runValidators: true, context: 'query' });
      response.status(204).end();
    } else {
      response.status(403).json({ error: 'forbidden' });
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    /* eslint-disable no-underscore-dangle */
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
