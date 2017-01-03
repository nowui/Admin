export default {

  namespace: 'role',

  state: {
    is_load: false,
    is_modal: false,
    action: '',
    role_id: '',
    role_name: '',
    item: {},
    list: [],
    total: 0,
    page_index: 1
  },

  reducers: {
    start(state, action) {
      return {
        ...state, ...{
          is_load: true
        }
      };
    },
    list(state, action) {
      return {
        ...state, ...{
          total: action.data.total,
          list: action.data.list,
          page_index: action.data.page_index
        }
      };
    },
    add(state, action) {
      return {
        ...state, ...{
          is_modal: true,
          action: 'save'
        }
      };
    },
    edit(state, action) {
      return {
        ...state, ...{
          is_modal: true,
          action: 'update'
        }
      };
    },
    close(state, action) {
      return {
        ...state, ...{
          is_modal: false
        }
      };
    },
    finish(state, action) {
      return {
        ...state, ...{
          is_load: false
        }
      };
    }
  }

};
