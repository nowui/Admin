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

  }

  handLoad(index) {
    if (this.props.role.is_load) {
      return;
    }

    toast = message.loading(constant.load, 0);

    this.props.dispatch({
      type: 'role/start',
      data: {}
    });

    request = http({
      url: 'role/get',
      data: {
        role_id: this.props.role.role_id
      },
      success: function (data) {

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

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

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

          setTimeout(function() {
            this.props.handReload();
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
    });
  }

  handleCancel() {
    if (typeof(toast) != 'undefined') {
      toast();
    }

    if (typeof(request) != 'undefined') {
      request.cancel();
    }

    this.props.dispatch({
      type: 'role/close',
      data: {}
    });

    this.props.form.resetFields();
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={'角色表单'} maskClosable={false} width={constant.detailWidth}
             visible={this.props.role.is_modal} onCancel={this.handleCancel.bind(this)}
             footer={[
               <Button key="back" type="ghost" size="default" icon="cross-circle"
                       onClick={this.handleCancel.bind(this)}>关闭</Button>,
               <Button key="submit" type="primary" size="default" icon="check-circle"
                       loading={this.props.role.is_load}
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
  handReload: React.PropTypes.func.isRequired
};

RoleDetail = Form.create({})(RoleDetail);

export default connect(({role}) => ({
  role,
}))(RoleDetail);
