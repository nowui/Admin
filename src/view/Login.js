import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button} from 'antd';

import style from './Login.css';

const Login = Form.create({})(React.createClass({

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Form className={style.form}>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{required: true, message: '请填写用户名'}],
          })(
            <Input placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请填写密码'}],
          })(
            <Input type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={style.button} onClick={this.handleSubmit}>Log in</Button>
        </FormItem>
      </Form>
    );
  }
}));

Login.propTypes = {};

export default connect()(Login);
