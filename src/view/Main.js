import React, {Component} from 'react';
import {Link} from 'dva/router';
import {Layout, Menu, Icon, Row, Col, Badge} from 'antd';

import style from './style.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    }
  }

  componentDidMount() {
    //console.log(this.props.route.childRoutes[0].path)
  }

  handleToggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleClick() {

  }

  render() {
    const {Header, Sider, Content, Footer} = Layout;
    const SubMenu = Menu.SubMenu;

    return (
      <Layout>
        <Sider
          onCollapse={this.handleToggle.bind(this)}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={this.state.collapsed ? '' : style.layoutSider}>
            <div className={style.logo}><h1>{this.state.collapsed ? '红' : '红萝梦'}</h1></div>
            <Menu
              theme="dark"
              defaultOpenKeys={['sub1']}
              selectedKeys={['1']}
              mode={this.state.collapsed ? 'vertical' : 'inline'}
              onClick={this.handleClick.bind(this)}
            >
              <SubMenu key="sub1" title={<span><Icon type="mail"/><span className="nav-text">商品管理</span></span>}>
                <Menu.Item key="1"><Link to="role/index">商品列表</Link></Menu.Item>
                <Menu.Item key="2"><Link to="code/index">商品分类列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to="category/index">收藏列表</Link></Menu.Item>
                <Menu.Item key="4">品牌列表</Menu.Item>
                <Menu.Item key="13">品牌分类列表</Menu.Item>
                <Menu.Item key="14">品牌代理申请列表</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore"/><span className="nav-text">订单管理</span></span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting"/><span className="nav-text">红圈管理</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
              <SubMenu key="sub5" title={<span><Icon type="setting"/><span className="nav-text">活动管理</span></span>}>
              </SubMenu>
              <SubMenu key="sub6" title={<span><Icon type="setting"/><span className="nav-text">页面管理</span></span>}>
              </SubMenu>
              <SubMenu key="sub7" title={<span><Icon type="setting"/><span className="nav-text">会员管理</span></span>}>
              </SubMenu>
              <SubMenu key="sub8" title={<span><Icon type="setting"/><span className="nav-text">权限管理</span></span>}>
              </SubMenu>
              <SubMenu key="sub9" title={<span><Icon type="setting"/><span className="nav-text">系统管理</span></span>}>
              </SubMenu>
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header className={style.layoutHeader}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleToggle.bind(this)}
            />
            <Link to=''><Icon type="user" className={style.user}/></Link>
            <Badge count={5} className={style.notification}>
              <Link to=''><Icon type="notification" className={style.notificationMessage}/></Link>
            </Badge>
            <Link to=''><Icon type="poweroff" className={style.logout}/></Link>
          </Header>
          <Content style={{height: document.documentElement.clientHeight - 60 - 20 - 20}}
                   className={style.layoutContent}>
            {this.props.children}
          </Content>
          <Footer className={style.layoutFooter}>
            Copyright ©2017 Created by Shanghai Star Channel IT Co.,LTD
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

Main.propTypes = {};

export default Main;
