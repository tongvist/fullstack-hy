import React from 'react';
import { useSelector } from 'react-redux';

export const Users = () => {
  const blogs = useSelector(state => state.blogs);

  const getUserData = () => {
    let result = [];

    blogs.forEach(blog => {
      const userInList = result.find(e => e.name === blog.user.name);
      if (!userInList) {
        result.push({
          name: blog.user.name,
          blogs: 1
        });
      } else {
        result = result.map(u => u.name !== blog.user.name ? u : { ...u, blogs: u.blogs + 1 });
      }
    });

    console.log('result', result);
    return result;
  };

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <td></td>
          <th>Blogs created</th>
        </tr>
        {
          getUserData().map(user => {
            return (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.blogs}</td>
              </tr>
            );
          })
        }
      </table>
    </div>
  );
};

export default Users;