import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  const user = useSelector(state => state.user);

  return (
    <div className='nav'>
      <Link to='/'>
        <p className='nav-link'>Blogs</p>
      </Link>
      <Link to='/users'>
        <p className='nav-link'>Users</p>
      </Link>
      <p className='logged-in-user'>{user.name} logged in</p>
      <button onClick={ handleLogout }>logout</button>
    </div>
  );
};

export default Navbar;