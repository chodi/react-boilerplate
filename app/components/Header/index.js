import React from 'react';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';

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
          <a href='http://localhost:3000/logout'>logout</a>
        </NavBar>
      </div>
    );
  }
}

export default Header;
