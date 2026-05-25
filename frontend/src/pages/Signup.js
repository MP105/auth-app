import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

  // State
  const [signInfo, setSignInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setSignInfo({
      ...signInfo,
      [name]: value
    });
  };

  // Handle Signup
  const handleSignup = async (e) => {

    e.preventDefault();

    const { name, email, password } = signInfo;

    // Validation
    if (!name || !email || !password) {
      return handleError('All fields are required');
    }

    try {

      // API URL
      const url = 'https://auth-app-production-63ff.up.railway.app/auth/signup';

      // API Call
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInfo)
      });

      // Response Convert
      const result = await response.json();

      console.log(result);

      const { success, message, error } = result;

      // Success
      if (success) {

        handleSuccess(message);

        setTimeout(() => {
          navigate('/login');
        }, 2000);

      }

      // Validation Error
      else if (error) {

        const details = error?.details[0]?.message;

        handleError(details);

      }

      // Other Error
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

      <form onSubmit={handleSignup}>

        <h1>Signup</h1>

        {/* Name */}

        <div>
          <label htmlFor='name'>Name</label>

          <input
            type='text'
            name='name'
            placeholder='Enter your name'
            autoFocus
            value={signInfo.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}

        <div>
          <label htmlFor='email'>Email</label>

          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={signInfo.email}
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
            value={signInfo.password}
            onChange={handleChange}
          />
        </div>

        {/* Button */}

        <button type='submit'>
          Signup
        </button>

        {/* Login Link */}

        <span>
          Already have an account ?
          <Link to='/login'> Login</Link>
        </span>

      </form>

      {/* Toast */}

      <ToastContainer />

    </div>
  );
}

export default Signup;