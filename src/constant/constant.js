export default {
  formItemLayout: {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  },
  scrollHeight: function () {
    return document.documentElement.clientHeight - 310 - (document.documentElement.clientHeight - 310) % 51;
  },
  pageSize: 10,
  action: '操作',
  search: '搜索',
  add: '新增',
  edit: '修改',
  del: '删除',
  load: '正在加载中..',
  detailTitle: '表单',
  detailWidth: 1000,
  popconfirmTitle: '删除将无法恢复, 您确定要继续吗?',
  popconfirmOK: '确定',
  popconfirmCancel: '取消'
};
