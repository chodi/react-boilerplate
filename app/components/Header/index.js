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
          <span style={{marginRight: '10px'}}><a href="/todo/list">SERVER RENDERED Todo</a></span>
          <HeaderLink to="/todo">
            Static-To Do
          </HeaderLink>
          <a href="/logout">logout</a>
        </NavBar>
      </div>
    );
  }
}

export default Header;
