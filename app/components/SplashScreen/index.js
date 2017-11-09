import React from 'react';
import imgPath from 'assets/images/wizyroom_blue.png';
import style from './styles.css';

const styles = {
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  label: {
    // paddingTop: 100,
  },
};
/* eslint-disable jsx-a11y/label-has-for */
const SplashScreen = () => (
  <div style={styles.container}>
    <div className={style.logo}>
      <img src={imgPath} style={{height: 40}} />
    </div>
    <div className={style.loading}>
        <div className={style.status}>
            <div className={style.message}>
               LOADING...
            </div>
        </div>
    </div>
  </div>
);

export default SplashScreen;
