import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

  // State
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  };

  // Handle Login
  const handleLogin = async (e) => {

    e.preventDefault();

    const { email, password } = loginInfo;

    // Validation
    if (!email || !password) {
      return handleError('All fields are required');
    }

    try {

      // API URL
      const url = 'https://auth-app-production-63ff.up.railway.app/auth/login';

      // API Call
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      // Response Convert
      const result = await response.json();

      console.log(result);

      const { success, message, name ,jwtToken } = result;

      // Success
      if (success) {

        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/home');
        }, 2000);

      }

      // Error
      else {

        handleError(message);

      }

    } catch (err) {

      console.log(err);

      handleError('Something went wrong');

    }
  };

  return (

    <div className='container'>

      <form onSubmit={handleLogin}>

        <h1>Login</h1>

        {/* Email */}

        <div>
          <label htmlFor='email'>Email</label>

          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={loginInfo.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}

        <div>
          <label htmlFor='password'>Password</label>

          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            value={loginInfo.password}
            onChange={handleChange}
          />
        </div>

        {/* Button */}

        <button type='submit'>
          Login
        </button>

        {/* Signup Link */}

        <span>
          Don't have an account ?
          <Link to='/signup'> Signup</Link>
        </span>

      </form>

      {/* Toast */}

      <ToastContainer />

    </div>
  );
}

export default Login;