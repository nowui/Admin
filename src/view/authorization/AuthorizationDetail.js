import React, {Component, PropTypes} from 'react';
import {Modal, Form, Row, Col, Spin, Button, Input} from 'antd';

import constant from '../../constant/constant';
import style from '../style.css';

class AuthorizationDetail extends Component {
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

  handleReset() {
    this.props.form.resetFields();
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={'授权表单'} maskClosable={false} width={constant.detail_width}
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
                <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="授权token">
                  {
                    getFieldDecorator('authorization_token', {
                      rules: [{
                        required: true,
                        message: constant.required
                      }],
                      initialValue: ''
                    })(
                      <Input type="textarea" placeholder={constant.placeholder + '授权token'} rows={12}/>
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="创建时间">
                  {
                    getFieldDecorator('authorization_create_time', {
                      rules: [{
                        required: true,
                        message: constant.required
                      }],
                      initialValue: ''
                    })(
                      <Input type="text" placeholder={constant.placeholder + '创建时间'}/>
                    )
                  }
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="失效时间">
                  {
                    getFieldDecorator('authorization_expire_time', {
                      rules: [{
                        required: true,
                        message: constant.required
                      }],
                      initialValue: ''
                    })(
                      <Input type="text" placeholder={constant.placeholder + '失效时间'}/>
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

AuthorizationDetail.propTypes = {
  is_load: React.PropTypes.bool.isRequired,
  is_detail: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired
};

AuthorizationDetail = Form.create({
  withRef: true
})(AuthorizationDetail);

export default AuthorizationDetail;
