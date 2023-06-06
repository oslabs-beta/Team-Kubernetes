import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.scss';

function HomePage() {
  const [state, setState] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const usernameChangeEvent = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeEvent = (event) => {
    setPassword(event.target.value);
  };
  const navigateSignup = function () {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('/login', {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });

      // if (response.ok) {
      console.log(username, password);
      navigate('/dashboard');
      //   }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.loginBox}>
        <h2 className={styles.header}>Welcome Back</h2>

        <input
          type='text'
          value={username}
          onChange={usernameChangeEvent}
          placeholder='Username'
          className={styles.input}
        ></input>

        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={passwordChangeEvent}
          className={styles.input}
        ></input>
        <button onClick={navigateSignup} className={styles.secondaryButton}>
          Sign Up
        </button>
        <input
          type='submit'
          value='Login'
          className={styles.primaryButton}
        ></input>
      </form>
    </div>
  );
}

export default HomePage;
