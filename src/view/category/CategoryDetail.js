import React, {Component, PropTypes} from 'react';
import {Modal, Form, Row, Col, Spin, Button, Input, InputNumber} from 'antd';

import constant from '../../constant/constant';
import style from '../style.css';

class CategoryDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.handleSubmit(values);
    });
  }

  handleCancel() {
    this.props.handleCancel();
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={'分类表单'} maskClosable={false} width={constant.detail_width}
             visible={this.props.is_detail} onCancel={this.handleCancel.bind(this)}
             footer={[
               <Button key="back" type="ghost" size="default" icon="cross-circle"
                       onClick={this.handleCancel.bind(this)}>关闭</Button>,
               <Button key="submit" type="primary" size="default" icon="check-circle"
                       loading={this.props.is_load}
                       onClick={this.handleSubmit.bind(this)}>确定</Button>
             ]}
      >
        <Spin spinning={this.props.is_load}>
          <Row>
            <Col span={8}>
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="分类名称">
                {
                  getFieldDecorator('category_name', {
                    rules: [{
                      required: true,
                      message: constant.required
                    }],
                    initialValue: ''
                  })(
                    <Input type="text" placeholder={constant.placeholder + '分类名称'}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="分类键值">
                {
                  getFieldDecorator('category_key', {
                    initialValue: ''
                  })(
                    <Input type="text" placeholder={constant.placeholder + '分类键值'}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="分类数值">
                {
                  getFieldDecorator('category_value', {
                    initialValue: ''
                  })(
                    <Input type="text" placeholder={constant.placeholder + '分类数值'}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="分类描述">
                {
                  getFieldDecorator('category_remark', {
                    initialValue: ''
                  })(
                    <Input type="text" placeholder={constant.placeholder + '分类描述'}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="分类排序">
                {
                  getFieldDecorator('category_sort', {
                    rules: [{
                      required: true,
                      message: constant.required
                    }],
                    initialValue: 0
                  })(
                    <InputNumber type="text" className={style.formItemInput} placeholder={constant.placeholder + '分类排序'}
                                 min={0} max={999}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
        </Spin>
      </Modal>
    );
  }
}

CategoryDetail.propTypes = {
  is_load: React.PropTypes.bool.isRequired,
  is_detail: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired
};

CategoryDetail = Form.create({})(CategoryDetail);

export default CategoryDetail;
