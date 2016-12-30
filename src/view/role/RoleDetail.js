import React, {Component, PropTypes} from 'react';
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

  render() {
    const FormItem = Form.Item;
    const {getFieldDecorator} = this.props.form;

    return (
      <Modal title={constant.detailTitle} visible={false} width={constant.detailWidth}>

      </Modal>
    );
  }
}

RoleDetail.propTypes = {

};

RoleDetail = Form.create({})(RoleDetail);

export default RoleDetail;
