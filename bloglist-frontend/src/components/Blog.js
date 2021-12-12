import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [displayMode, setDisplayMode] = useState('short');
  
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
      
      <p className='inline-p'>Likes: { blog.likes }</p>
      <button>like</button>
      
      <p>Added by: { blog.user.name }</p>
    </div>
  );
};

export default Blog;