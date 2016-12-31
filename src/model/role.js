export default {

  namespace: 'role',

  state: {
    is_load: false,
    is_modal: false,
    total: 0,
    list: [],
    page_index: 1,
  },

  reducers: {
    load(state, action) {
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
          is_modal: true
        }
      };
    },
    edit(state, action) {
      return {
        ...state, ...{
          is_modal: true
        }
      };
    },
    cancel(state, action) {
      return {
        ...state, ...{
          is_modal: false
        }
      };
    },
    complete(state, action) {
      return {
        ...state, ...{
          is_load: false
        }
      };
    }
  }

};
