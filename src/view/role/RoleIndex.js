import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import QueueAnim from 'rc-queue-anim';
import {Row, Col, Button, Form, Input, Table, Popconfirm, message} from 'antd';

import RoleDetail from './RoleDetail';
import constant from '../../constant/constant';
import http from '../../util/http';
import style from '../style.css';

let toast;
let request;

class RoleIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentWillUnmount() {
    toast();

    request.cancel();
  }

  handleSearch() {
    let role_name = this.props.form.getFieldValue('role_name');
    let page_index = 1;

    this.handLoad(role_name, page_index);
  }

  handReload() {
    let role_name = this.props.role.role_name;
    let page_index = this.props.role.page_index;

    this.handLoad(role_name, page_index);
  }

  handLoad(role_name, page_index) {
    if (this.props.role.is_load) {
      return;
    }

    toast = message.loading(constant.load, 0);

    this.props.dispatch({
      type: 'role/start',
      data: {}
    });

    request = http({
      url: 'role/admin/list',
      data: {
        role_name: role_name,
        page_index: page_index,
        page_size: constant.pageSize
      },
      success: function (json) {
        for (let i = 0; i < json.data.length; i++) {
          json.data[i].key = json.data[i].role_id;
        }

        this.props.dispatch({
          type: 'role/list',
          data: {
            role_name: role_name,
            total: json.data.total,
            list: json.data,
            page_index: page_index
          }
        });
      }.bind(this),
      complete: function () {
        toast();

        this.props.dispatch({
          type: 'role/finish',
          data: {}
        });
      }.bind(this)
    }).post();
  }

  handleAdd() {
    this.props.dispatch({
      type: 'role/add',
      data: {}
    });
  }

  handleEdit() {
    console.log(this.refs.detail);
  }

  handleDel() {

  }

  handleSubmit(values) {
    if (this.props.role.is_load) {
      return;
    }

    toast = message.loading(constant.load, 0);

    this.props.dispatch({
      type: 'role/start',
      data: {}
    });

    request = http({
      url: 'role/' + this.props.role.action,
      data: values,
      success: function (data) {
        this.handleCancel();

        setTimeout(function () {
          this.handReload();
        }.bind(this), constant.timeout);
      }.bind(this),
      complete: function () {
        toast();

        this.props.dispatch({
          type: 'role/finish',
          data: {}
        });
      }.bind(this)
    }).post();
  }

  handleCancel() {
    this.props.dispatch({
      type: 'role/close',
      data: {}
    });
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
        <div key="0">
          <Row className={style.layoutContentHeader}>
            <Col span={8}>
              <h1>角色列表</h1>
            </Col>
            <Col span={16} className={style.layoutContentHeaderMenu}>
              <Button type="default" icon="search" size="default" className={style.layoutContentHeaderMenuButton}
                      loading={this.props.role.is_load}
                      onClick={this.handleSearch.bind(this)}>{constant.search}</Button>
              <Button type="primary" icon="plus-circle" size="default"
                      onClick={this.handleAdd.bind(this)}>{constant.add}</Button>
            </Col>
          </Row>
          <Form className={style.layoutContentHeaderSearch}>
            <Row>
              <Col span={8}>
                <FormItem hasFeedback {...constant.formItemLayout} className={style.formItem} label="产品名称">
                  {
                    getFieldDecorator('role_name', {
                      initialValue: ''
                    })(
                      <Input type="text" placeholder="请输入产品名称" className={style.formItemInput}/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span={8}>
              </Col>
              <Col span={8}>
              </Col>
            </Row>
          </Form>
          <Table columns={columns} dataSource={this.props.role.list} scroll={{y: constant.scrollHeight()}} bordered/>
          <RoleDetail is_load={this.props.role.is_load}
                      is_modal={this.props.role.is_modal}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleCancel={this.handleCancel.bind(this)}
                      ref="detail"/>
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
