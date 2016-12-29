import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, Form, Input, Table, Popconfirm, message} from 'antd';

import ProductDetail from './ProductDetail';
import constant from '../../constant/constant';
import http from '../../util/http';
import style from '../style.css';

let request;
let toast;

class ProductIndex extends Component {
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
    if (this.props.product.loading) {
      return;
    }

    toast = message.loading(constant.load, 0);

    request = http({
      url: 'product/list',
      data: {
        product_name: '',
        page: 1,
        limit: 10
      },
      success: function (data) {
        this.props.dispatch({
          type: 'product/list',
          data: {
            total: data.total,
            list: data.list,
            page_index: index
          }
        });
      }.bind(this),
      complete: function () {
        this.props.dispatch({
          type: 'product/complete',
          data: {}
        });

        toast();
      }.bind(this)
    }).post();
  }

  handleAdd() {

  }

  handleEdit() {
    console.log(this.props.product);
  }

  handleDel() {

  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    const columns = [{
      title: '产品名称',
      dataIndex: 'product_name'
    }, {
      width: 100,
      title: constant.action,
      dataIndex: '',
      render: (text, record, index) => (
        <span>
          <a onClick={this.handleEdit.bind(this, record.product_id)}>{constant.edit}</a>
          <span className={style.divider}/>
          <Popconfirm title={constant.popconfirmTitle} okText={constant.popconfirmOK} cancelText={constant.popconfirmCancel} onConfirm={this.handleDel.bind(this, record.product_id)}>
            <a>{constant.del}</a>
          </Popconfirm>
        </span>
      )
    }];

    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        key: i,
        product_name: `Edward King ${i}`
      });
    }

    return (
      <div className={style.layoutMain}>
        <Row className={style.layoutMainHeader}>
          <Col span={8}>
            <h1>商品列表</h1>
          </Col>
          <Col span={16} className={style.layoutMainHeaderMenu}>
            <Button type="default" icon="search" size="default" className={style.layoutMainHeaderMenuButton}>{constant.search}</Button>
            <Button type="primary" icon="plus-circle" size="default" onClick={this.handleAdd.bind(this)}>{constant.add}</Button>
          </Col>
        </Row>
        <Form className={style.layoutMainSearch}>
          <Row>
            <Col span={8}>
              <FormItem label="产品名称" hasFeedback {...constant.formItemLayout} className={style.formItem}>
                {getFieldDecorator('product_name', {
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
        <Table columns={columns} dataSource={data} scroll={{y: constant.scrollHeight()}} bordered/>
        <ProductDetail>

        </ProductDetail>
      </div>
    );
  }
}

ProductIndex.propTypes = {};

ProductIndex = Form.create({})(ProductIndex);

export default connect(({product}) => ({
  product,
}))(ProductIndex);
