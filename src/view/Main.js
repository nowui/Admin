import React, {Component} from 'react';
import {Link} from 'dva/router';
import {Layout, Menu, Icon, Badge} from 'antd';

import database from '../util/database';
import style from './style.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      openKeys: [],
      selectedKeys: []
    }
  }

  componentDidMount() {
    for (let i = 0; i < database.getMenu().length; i++) {
      for (let k = 0; k < database.getMenu()[i].children.length; k++) {
        if (database.getMenu()[i].children[k].category_value == '/' + this.props.routes[2].path) {
          this.setState({
            openKeys: [database.getMenu()[i].category_id],
            selectedKeys: [database.getMenu()[i].children[k].category_id]
          });

          break
        }
      }
    }
  }

  componentWillUnmount() {

  }

  handleToggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleClick(item) {
    this.setState({
      selectedKeys: [item.key]
    });
  }

  handleChange(item) {
    this.setState({
      openKeys: item
    });
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
              mode={this.state.collapsed ? 'vertical' : 'inline'}
              openKeys={this.state.openKeys}
              selectedKeys={this.state.selectedKeys}
              onClick={this.handleClick.bind(this)}
              onOpenChange={this.handleChange.bind(this)}
            >
              {
                database.getMenu().map(function (item) {
                  return (
                    <SubMenu key={item.category_id}
                             title={<span><Icon
                               className={'anticon ' + item.category_remark}/>{item.category_name}</span>}>
                      {
                        item.children.map(function (children) {
                          return (
                            <Menu.Item key={children.category_id}><Link
                              to={children.category_value}>{children.category_name}</Link></Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                })
              }
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
            <Link to='/login'><Icon type="poweroff" className={style.logout}/></Link>
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
