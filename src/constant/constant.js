export default {
  formItemLayout: {
    labelCol: {span: 7},
    wrapperCol: {span: 17}
  },
  formItemLayoutDetail: {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  },
  scrollHeight: function () {
    return document.documentElement.clientHeight - 340 - (document.documentElement.clientHeight - 340) % 51;
  },
  timeout: 500,
  duration: 0.3,
  page_size: 10,
  action: '操作',
  search: '搜索',
  save: '新增',
  update: '修改',
  delete: '删除',
  load: '正在加载中..',
  detail_width: 1000,
  popconfirm_title: '删除将无法恢复, 您确定要继续吗?',
  popconfirm_ok: '确定',
  popconfirm_cancel: '取消',
  required: '不能为空',
  placeholder: '请输入'
};
