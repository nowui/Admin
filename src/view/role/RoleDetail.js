import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Form, Row, Col, Button, Input, InputNumber, message} from 'antd';

import constant from '../../constant/constant';
import http from '../../util/http';
import style from '../style.css';

let toast;
let request;

class RoleDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    if (typeof(toast) != 'undefined') {
      toast();
    }

    if (typeof(request) != 'undefined') {
      request.cancel();
    }
  }

  handleCancel() {
    this.props.dispatch({
      type: 'role/cancel',
      data: {}
    });
  }

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      if (this.props.role.is_load) {
        return;
      }

      this.props.dispatch({
        type: 'role/' + this.props.action,
        data: {}
      });

      toast = message.loading(constant.load, 0);

      request = http({
        url: 'role/' + this.props.action,
        data: values,
        success: function (data) {

        }.bind(this),
        complete: function () {
          this.props.dispatch({
            type: 'role/complete',
            data: {}
          });

          toast();
        }.bind(this)
      }).post();
    });
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={'角色表单'} maskClosable={false} width={constant.detailWidth}
             visible={this.props.role.is_modal} onCancel={this.handleCancel.bind(this)}
             footer={[
               <Button key="back" type="ghost" size="default" icon="cross-circle"onClick={this.handleCancel.bind(this)}>关闭</Button>,
               <Button key="submit" type="primary" size="default" icon="check-circle" onClick={this.handleSubmit.bind(this)}>确定</Button>
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
                  <InputNumber type="text" className={style.formItemInput}  placeholder={constant.placeholder + '排序'} min={0} max={999}/>
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
  action: React.PropTypes.string.isRequired
};

RoleDetail = Form.create({})(RoleDetail);

export default connect(({role}) => ({
  role,
}))(RoleDetail);
