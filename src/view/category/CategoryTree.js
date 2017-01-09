import React, {Component, PropTypes} from 'react';
import {Modal, Row, Col, Button, Table} from 'antd';

import constant from '../../constant/constant';
import style from '../style.css';

class CategoryTree extends Component {
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

  handSave() {
    this.props.dispatch({
      type: 'category/fetch',
      data: {
        is_detail: true,
        action: 'save'
      }
    });
  }

  handleCancel() {
    this.props.handleCancel();
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '30%',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    }];

    const data = [{
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [{
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      }, {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [{
          key: 121,
          name: 'Jimmy Brown',
          age: 16,
          address: 'New York No. 3 Lake Park',
        }],
      }, {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [{
          key: 131,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park',
          children: [{
            key: 1311,
            name: 'Jim Green jr.',
            age: 25,
            address: 'London No. 3 Lake Park',
          }, {
            key: 1312,
            name: 'Jimmy Green sr.',
            age: 18,
            address: 'London No. 4 Lake Park',
          }],
        }],
      }],
    }, {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];

    return (
      <Modal title={'分类列表'} maskClosable={false} width={constant.detail_width}
             visible={this.props.is_tree} onCancel={this.handleCancel.bind(this)}
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

          </Col>
          <Col span={16} className={style.layoutContentHeaderMenu}>
            <Button type="primary" icon="plus-circle" size="default"
                    onClick={this.handSave.bind(this)}>{constant.save}</Button>
          </Col>
        </Row>
        <Table className={style.layoutContentHeaderTable} columns={columns} dataSource={data} pagination={false} scroll={{y: constant.scrollModalHeight()}} size="middle" bordered/>
      </Modal>
    );
  }
}

CategoryTree.propTypes = {
  is_load: React.PropTypes.bool.isRequired,
  is_tree: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired
};

export default CategoryTree;
