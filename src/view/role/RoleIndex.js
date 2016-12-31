import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button, Form, Input, Table, Popconfirm, message} from 'antd';

import RoleDetail from './RoleDetail';
import constant from '../../constant/constant';
import http from '../../util/http';
import style from '../style.css';

let request;
let toast;

class RoleIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentWillUnmount() {
    request.cancel();

    toast();
  }

  handLoad(index) {
    if (this.props.role.is_load) {
      return;
    }

    this.props.dispatch({
      type: 'role/load',
      data: {}
    });

    toast = message.loading(constant.load, 0);

    request = http({
      url: 'role/list',
      data: {
        role_name: '',
        page_index: index,
        page_size: constant.pageSize
      },
      success: function (data) {
        this.props.dispatch({
          type: 'role/list',
          data: {
            total: data.total,
            list: data.list,
            page_index: index
          }
        });
      }.bind(this),
      complete: function () {
        this.props.dispatch({
          type: 'role/complete',
          data: {}
        });

        toast();
      }.bind(this)
    }).post();
  }

  handleSearch() {
    this.handLoad(1);
  }

  handleAdd() {
    this.props.dispatch({
      type: 'role/add',
      data: {}
    });
  }

  handleEdit() {
    console.log(this.props.role);
  }

  handleDel() {

  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    const columns = [{
      title: '产品名称',
      dataIndex: 'role_name'
    }, {
      width: 100,
      title: constant.action,
      dataIndex: '',
      render: (text, record, index) => (
        <span>
          <a onClick={this.handleEdit.bind(this, record.role_id)}>{constant.edit}</a>
          <span className={style.divider}/>
          <Popconfirm title={constant.popconfirmTitle} okText={constant.popconfirmOK}
                      cancelText={constant.popconfirmCancel} onConfirm={this.handleDel.bind(this, record.role_id)}>
            <a>{constant.del}</a>
          </Popconfirm>
        </span>
      )
    }];

    return (
      <QueueAnim>
        <div key="0" className={style.layoutMain}>
          <Row className={style.layoutMainHeader}>
            <Col span={8}>
              <h1>角色列表</h1>
            </Col>
            <Col span={16} className={style.layoutMainHeaderMenu}>
              <Button type="default" icon="search" size="default" className={style.layoutMainHeaderMenuButton} loading={this.props.role.is_load} onClick={this.handleSearch.bind(this)}>{constant.search}</Button>
              <Button type="primary" icon="plus-circle" size="default" onClick={this.handleAdd.bind(this)}>{constant.add}</Button>
            </Col>
          </Row>
          <Form className={style.layoutMainSearch}>
            <Row>
              <Col span={8}>
                <FormItem label="产品名称" hasFeedback {...constant.formItemLayout} className={style.formItem}>
                  {getFieldDecorator('role_name', {
                    initialValue: ''
                  })(
                    <Input type="text" placeholder="请输入产品名称" className={style.formItemInput}/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
              </Col>
              <Col span={8}>
              </Col>
            </Row>
          </Form>
          <Table columns={columns} dataSource={this.props.role.list} scroll={{y: constant.scrollHeight()}} bordered/>
          <RoleDetail>

          </RoleDetail>
        </div>
      </QueueAnim>
    );
  }
}

RoleIndex.propTypes = {};

RoleIndex = Form.create({})(RoleIndex);

export default connect(({role}) => ({
  role,
}))(RoleIndex);
