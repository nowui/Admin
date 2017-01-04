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

  handleClick() {

  }

  render() {
    const SubMenu = Menu.SubMenu;

    return (
      <div className={style.layout}>
        <div className={style.layoutSider}>
          <div className={style.logo}><h1>红萝梦</h1></div>
          <Menu
            theme="dark"
            defaultOpenKeys={['sub1']}
            selectedKeys={['1']}
            mode="inline"
            className={style.layoutSiderMemu}
            onClick={this.handleClick.bind(this)}
          >
            <SubMenu key="sub1" title={<span><Icon type="mail"/><span>商品管理</span></span>}>
              <Menu.Item key="1"><Link to="role/index">商品列表</Link></Menu.Item>
              <Menu.Item key="2"><Link to="code/index">商品分类列表</Link></Menu.Item>
              <Menu.Item key="3">收藏列表</Menu.Item>
              <Menu.Item key="4">品牌列表</Menu.Item>
              <Menu.Item key="13">品牌分类列表</Menu.Item>
              <Menu.Item key="14">品牌代理申请列表</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>订单管理</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting"/><span>红圈管理</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><Icon type="setting"/><span>活动管理</span></span>}>
            </SubMenu>
            <SubMenu key="sub6" title={<span><Icon type="setting"/><span>页面管理</span></span>}>
            </SubMenu>
            <SubMenu key="sub7" title={<span><Icon type="setting"/><span>会员管理</span></span>}>
            </SubMenu>
            <SubMenu key="sub8" title={<span><Icon type="setting"/><span>权限管理</span></span>}>
            </SubMenu>
            <SubMenu key="sub9" title={<span><Icon type="setting"/><span>系统管理</span></span>}>
            </SubMenu>
          </Menu>
        </div>
        <div className={style.layoutContent}>
          <div className={style.layoutHeader}>
            <Row>
              <Col span={12}>
                <h1>
                  <div className={style.logo}></div>
                </h1>
              </Col>
              <Col span={12} className={style.layoutHeaderMenu}>
                <Link to='/logout'><Icon type="poweroff" className={style.logout}/></Link>
              </Col>
            </Row>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {};

export default Main;
