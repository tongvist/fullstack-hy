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

module.exports = {
  dummy, totalLikes, favoriteBlog
};