import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Installation.module.scss';
import WineGlass from '../assets/WineGlass';

function Installation() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function installAll() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5050/install');

      if (!response.ok) {
        //  Throw new error
        console.log('Error installing');
      }

      setLoading(false);
      navigate('/signupPage');
    } catch (err) {
      //  Better error handler here
      console.log(err);
    }
  }

  async function portForward() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5050/portforward');

      if (!response.ok) {
        //  Throw new error
        console.log('Unable to Port-Forward');
      }

      setLoading(false);
      navigate('/loginPage');
    } catch (err) {
      //  Better error handler here
      console.log(err);
    }
  }

  let render = (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.box}>
          <button className={styles.primary} onClick={installAll}>
            Get Started
          </button>
          <button className={styles.secondary} onClick={portForward}>
            <i>already have an account?</i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  if (loading)
    render = (
      <React.Fragment>
        <WineGlass />
        <h1>Aerating...</h1>
      </React.Fragment>
    );

  return <React.Fragment>{render}</React.Fragment>;
}

export default Installation;
