import { useLazyQuery, useMutation, } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN, ME } from '../queries';

const Login = ({ show, setToken, setUser }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  });

  const [getUser] = useLazyQuery(ME);
  
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
    }
  }, [result.data]) // eslint-disable-line
  
  const submit = async (event) => {
    event.preventDefault();
    
    login({variables: { username, password }});
    const user = await getUser();

    setUser(user.data.me);

    event.target.reset();
    setUsername('');
    setPassword('');
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={ submit }>
        <div>
          username
          <input type='text' onChange={({ target }) => setUsername(target.value)}></input>
        </div>

        <div>
          password
          <input type='password' onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;