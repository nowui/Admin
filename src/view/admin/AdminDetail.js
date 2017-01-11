import React, {Component, PropTypes} from 'react';
import {Modal, Form, Row, Col, Spin, Button, Input, InputNumber} from 'antd';

import constant from '../../constant/constant';
import style from '../style.css';

class AdminDetail extends Component {
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
      <Modal title={'管理员表单'} maskClosable={false} width={constant.detail_width}
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
                <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="名称">
                  {
                    getFieldDecorator('admin_name', {
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
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="帐号">
                {
                  getFieldDecorator('user_account', {
                    initialValue: ''
                  })(
                    <Input type="text" placeholder={constant.placeholder + '帐号'}/>
                  )
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem hasFeedback {...constant.formItemLayoutDetail} className={style.formItem} label="密码">
                {
                  getFieldDecorator('user_password', {
                    initialValue: ''
                  })(
                    <Input type="text" placeholder={constant.placeholder + '密码'}/>
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

AdminDetail.propTypes = {
  is_load: React.PropTypes.bool.isRequired,
  is_detail: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired
};

AdminDetail = Form.create({})(AdminDetail);

export default AdminDetail;
