import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TODO from 'containers/TODO';
import NotFoundPage from 'containers/NotFoundPage/Loadable';


const { Header, Sider, Content } = Layout;
const MITEM = Menu.Item;
export class NavigationList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      activeKey: 'NAVIGATION01',
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
    let RenderComponent = NotFoundPage;

    switch (this.state.activeKey) {
      case 'NAVIGATION01':
        RenderComponent = TODO;
        break;
      default:
        RenderComponent = NotFoundPage;
    }
    return (
      <div>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" onClick={this.onChangeMenu} activeKey={this.state.activeITem} defaultSelectedKeys={['NAVIGATION01']}>
              <MITEM key="NAVIGATION01">
                <Icon type="user" />
                <span>NAVIGATION 1</span>
              </MITEM>
              <MITEM key="NAVIGATION02">
                <Icon type="video-camera" />
                <span>NAVIGATION 2</span>
              </MITEM>
              <MITEM key="NAVIGATION03">
                <Icon type="upload" />
                <span>NAVIGATION 3</span>
              </MITEM>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <span style={{ fontSize: '20px', marginLeft: '20px' }}>{this.state.activeKey}</span>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflowY: 'auto' }}>
              <RenderComponent />
            </Content>
          </Layout>
        </Layout>

      </div>
    );
  }
}

NavigationList.propTypes = {
  getTodo: PropTypes.func,
  allTodos: PropTypes.any,
};

export default connect()(NavigationList);
