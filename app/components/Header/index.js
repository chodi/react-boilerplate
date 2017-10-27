import React from 'react';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';

const DOMAIN = process.env.DOMAIN;// || 'http://localhost:3000';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <HeaderLink to="/home">
            Welcome
          </HeaderLink>
          <a href={`${DOMAIN}/logout`}>logout</a>
        </NavBar>
      </div>
    );
  }
}

export default Header;
