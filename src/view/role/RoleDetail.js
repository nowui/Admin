import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Modal, Form} from 'antd';

import constant from '../../constant/constant';
import style from '../style.css';

class RoleDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {

  }

  handleCancel() {
    this.props.dispatch({
      type: 'role/cancel',
      data: {}
    });
  }

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={constant.detailTitle} maskClosable={false} width={constant.detailWidth} visible={this.props.role.is_modal} onCancel={this.handleCancel.bind(this)}>

      </Modal>
    );
  }
}

RoleDetail.propTypes = {

};

RoleDetail = Form.create({})(RoleDetail);

export default connect(({role}) => ({
  role,
}))(RoleDetail);
