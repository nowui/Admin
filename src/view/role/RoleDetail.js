import React, {Component, PropTypes} from 'react';
import {Modal, Form, Row, Col, Button, Input, InputNumber} from 'antd';

import constant from '../../constant/constant';
import style from '../style.css';

class RoleDetail extends Component {
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

    this.props.form.resetFields();
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={'角色表单'} maskClosable={false} width={constant.detailWidth}
             visible={this.props.is_modal} onCancel={this.handleCancel.bind(this)}
             footer={[
               <Button key="back" type="ghost" size="default" icon="cross-circle"
                       onClick={this.handleCancel.bind(this)}>关闭</Button>,
               <Button key="submit" type="primary" size="default" icon="check-circle"
                       loading={this.props.is_load}
                       onClick={this.handleSubmit.bind(this)}>确定</Button>
             ]}
      >
        <Row>
          <Col span={8}>
            <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="名称">
              {
                getFieldDecorator('role_name', {
                  rules: [{
                    required: true,
                    message: constant.required
                  }],
                  initialValue: ''
                })(
                  <Input type="text" placeholder={constant.placeholder + '名称'}/>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="键值">
              {
                getFieldDecorator('role_key', {
                  initialValue: ''
                })(
                  <Input type="text" placeholder={constant.placeholder + '键值'}/>
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem {...constant.formItemLayoutDetail} className={style.formItem} label="排序">
              {
                getFieldDecorator('role_sort', {
                  rules: [{
                    type: 'number',
                    required: true,
                    message: constant.required
                  }],
                  initialValue: 0
                })(
                  <InputNumber type="text" className={style.formItemInput} placeholder={constant.placeholder + '排序'}
                               min={0} max={999}/>
                )
              }
            </FormItem>
          </Col>
        </Row>
      </Modal>
    );
  }
}

RoleDetail.propTypes = {
  is_load: React.PropTypes.bool.isRequired,
  is_modal: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired
};

RoleDetail = Form.create({})(RoleDetail);

export default RoleDetail;
