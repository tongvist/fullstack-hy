import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export const Users = () => {
  const blogs = useSelector(state => state.blogs);

  const getUserData = () => {
    let result = [];

    blogs.forEach(blog => {
      const userInList = result.find(e => e.name === blog.user.name);
      if (!userInList) {
        result.push({
          name: blog.user.name,
          blogs: 1,
          id: blog.user.id
        });
      } else {
        result = result.map(u => u.name !== blog.user.name ? u : { ...u, blogs: u.blogs + 1 });
      }
    });

    return result;
  };

  return (
    <div>
      <h1>Users</h1>
      <Table hover>
        <tbody>
          <tr>
            <td></td>
            <th>Blogs created</th>
          </tr>
          {
            getUserData().map(user => {
              const url = `/users/${user.id}`;
              return (
                <tr key={user.name}>
                  <td>
                    <Link to={ url }>
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.blogs}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </div>
  );
};

export default Users;