import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, Form, Input, Table, Popconfirm, message} from 'antd';

import constant from '../../constant/constant';
import http from '../../util/http';
import style from '../style.css';

let request;
let toast;

class CodeIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.handLoad(1);
  }

  componentWillUnmount() {
    request.cancel();

    toast();
  }

  handLoad(index) {
    if (this.props.code.loading) {
      return;
    }

    toast = message.loading(constant.load, 0);

    request = http({
      url: 'code/list',
      data: {
        table_name: this.props.form.getFieldValue('table_name'),
        page: 1,
        limit: 10
      },
      success: function (json) {
        this.props.dispatch({
          type: 'code/list',
          data: {
            total: json.total,
            list: json.data,
            page_index: index
          }
        });
      }.bind(this),
      complete: function () {
        this.props.dispatch({
          type: 'code/complete',
          data: {}
        });

        toast();
      }.bind(this)
    }).post();
  }

  handleSearch() {
    this.handLoad(1);
  }

  handleEdit(table_name) {
    if (this.props.code.loading) {
      return;
    }

    toast = message.loading(constant.load, 0);

    request = http({
      url: 'code/save',
      data: {
        table_name: table_name
      },
      success: function (json) {

      }.bind(this),
      complete: function () {
        this.props.dispatch({
          type: 'code/complete',
          data: {}
        });

        toast();
      }.bind(this)
    }).post();
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    const columns = [{
      title: '数据库表明',
      dataIndex: 'table_name'
    }, {
      width: 100,
      title: constant.action,
      dataIndex: '',
      render: (text, record, index) => (
        <span>
          <a onClick={this.handleEdit.bind(this, record.table_name)}>执行</a>
        </span>
      )
    }];

    return (
      <div className={style.layoutMain}>
        <Row className={style.layoutMainHeader}>
          <Col span={8}>
            <h1>代码生成</h1>
          </Col>
          <Col span={16} className={style.layoutMainHeaderMenu}>
            <Button type="default" icon="search" size="default" onClick={this.handleSearch.bind(this)}>{constant.search}</Button>
          </Col>
        </Row>
        <Form className={style.layoutMainSearch}>
          <Row>
            <Col span={8}>
              <FormItem label="数据库表明" hasFeedback {...constant.formItemLayout} className={style.formItem}>
                {getFieldDecorator('table_name', {
                  initialValue: ''
                })(
                  <Input type="text" placeholder="请输入数据库表明" className={style.formItemInput}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} dataSource={this.props.code.list} scroll={{y: constant.scrollHeight()}} bordered/>
      </div>
    );
  }
}

CodeIndex.propTypes = {};

CodeIndex = Form.create({})(CodeIndex);

export default connect(({code}) => ({
  code,
}))(CodeIndex);
