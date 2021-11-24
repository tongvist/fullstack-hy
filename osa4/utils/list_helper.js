const logger = require('./logger');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;

  blogs.forEach(blog => {
    total += blog.likes;
  });

  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return -1;
  }

  let maxLikes = 0;

  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
    }
  });

  return blogs.find(blog => blog.likes === maxLikes);

};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    };
  }

  let blogAuthors = [];
  let authors = [];

  blogs.forEach(blog => {
    const author = blog.author;

    if(!authors.includes(blog.author)) {
      authors.push(blog.author);
      blogAuthors.push({ author: blog.author, blogs: 1 });
    } else {
      let idx = blogAuthors.findIndex(el => el.author === blog.author);
      blogAuthors[idx].blogs++;
    }
  });

  let most = 0;

  for (let i = 0; i < blogAuthors.length; i++) {

    if (most === 0 || blogAuthors[i].blogs > most.blogs) {
      most = blogAuthors[i];
    }
    continue;
  }

  return most;
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
};