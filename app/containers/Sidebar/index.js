import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from './styles.css';
import Sider from './Sider';

const MITEM = Menu.Item;

const SidebarWrapper = styled.div`
  height: 100%;
`;

const ROUTE = {
  '/home': 'Home',
  '/': 'Home',
  '/mytodos': 'MyTodos',
  '/settings': 'Settings',
};

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    const { location: { pathname } } = props;
    this.state = {
      collapsed: false,
      activeKey: ROUTE[pathname],
    };
  }
  onChangeMenu = ({ key }) => {
    this.setState({ activeKey: key });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      activeITem: '1',
    });
  }

  render() {
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsed={this.state.collapsed}
          className={styles['sidebar-wrapper']}
        >
          <Menu className={styles['sidebar-wrapper']} theme="dark" mode="inline" onClick={this.onChangeMenu} activeKey={this.state.activeKey} defaultSelectedKeys={[this.state.activeKey]}>
            <MITEM key="Home">
              <Link style={{ color: '#fff' }} to="/home">
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </MITEM>
            {
              // <MITEM key="MyTodos">
              //   <Link style={{ color: '#fff' }} to="/mytodos">
              //     <Icon type="check-circle-o" />
              //     <span>My Todos</span>
              //   </Link>
              // </MITEM>
            }
            <MITEM key="Settings">
              <Link style={{ color: '#fff' }} to="/settings">
                <Icon type="setting" />
                <span>Settings</span>
              </Link>
            </MITEM>
            <MITEM key="Navigation04">
              <Icon type="logout" />
              <span><a href="/logout">logout</a></span>
            </MITEM>
          </Menu>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(null)(SideBar);
