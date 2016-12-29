import React, {Component} from 'react';
import {Link} from 'dva/router';
import {Menu, Icon, Row, Col} from 'antd';

import style from './style.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    //console.log(this.props.route.childRoutes[0].path)
  }

  render() {
    const SubMenu = Menu.SubMenu;

    return (
      <div className={style.layout}>
        <div className={style.layoutHeader}>
          <Row>
            <Col span={12}>
              <h1>
                <div className={style.logo}>红萝梦 - 全球美妆网红KOL代理</div>
              </h1>
            </Col>
            <Col span={12} className={style.layoutHeaderMenu}>
              <Link to='/logout'><Icon type="poweroff" className={style.logout}/></Link>
            </Col>
          </Row>
        </div>
        <div className={style.layoutSider}>
          <Menu
            onClick={this.handleClick}
            defaultOpenKeys={['sub1']}
            selectedKeys={['1']}
            mode="inline"
            className={style.layoutSiderMemu}
          >
            <SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigtion Two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting"/><span>Navigation Three</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {};

export default Main;
