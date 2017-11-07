import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { redirect, reroute } from 'containers/NavigationList/actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from './styles.css';
import Sider from './Sider';

const MITEM = Menu.Item;

const SidebarWrapper = styled.div`
  height: 100%;
`;

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      activeKey: 'Home',
    };
  }
  onChangeMenu = ({ key }) => {
    this.setState({ activeKey: key })
    // this.props.onReroute(key);
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
          <Menu className={styles['sidebar-wrapper']} theme="dark" mode="inline" onClick={this.onChangeMenu} activeKey={this.state.activeKey} defaultSelectedKeys={['Home']}>
            <MITEM key="Home">
              <Link style={{ color: '#fff' }} to="/dashboard">
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </MITEM>
            <MITEM key="MyTodos">
              <Link style={{ color: '#fff' }} to="/mytodos">
                <Icon type="check-circle-o" />
                <span>My Todos</span>
              </Link>
            </MITEM>
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


SideBar.propTypes = {
  onRedirect: PropTypes.func,
  onReroute: PropTypes.func,
  selectedNav: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    onRedirect: (route) => dispatch(redirect(route)),
    onReroute: (route) => dispatch(reroute(route)),
  };
}
export default connect(null, mapDispatchToProps)(SideBar);
