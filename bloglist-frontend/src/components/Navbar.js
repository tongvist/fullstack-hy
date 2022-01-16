import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
      <div className='logged-in-user'>
        {user.name}
        <Button variant='light' className='logout-btn' onClick={ handleLogout }>Log Out</Button>
      </div>
    </div>
  );
};

export default Navbar;