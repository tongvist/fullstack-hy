import React, { useState } from 'react'

const Blog = ({ blog, handleUpdate }) => {
  const [displayMode, setDisplayMode] = useState('short');
  const [currentLikes, setCurrentLikes] = useState(blog.likes);

  const handleLike = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id};
    handleUpdate(updatedBlog);
    setCurrentLikes(currentLikes + 1);
  }
  
  if (displayMode === 'short') {
    return (
      <div className='blog'>
        <p className='inline-p'>"{ blog.title }" by { blog.author }</p>
        <button onClick={ () => setDisplayMode('full') }>View</button>
      </div>  
  )};

  return (
    <div className='blog'>
      <p className='inline-p'>"{ blog.title }"</p>
      <button onClick={ () => setDisplayMode('short') }>Hide</button>

      <p>Author: { blog.author }</p>
      
      <p>URL: { blog.url }</p>
      
      <p className='inline-p'>Likes: { currentLikes }</p>
      <button onClick={ handleLike }>like</button>
      
      <p>Added by: { blog.user.name }</p>
    </div>
  );
};

export default Blog;