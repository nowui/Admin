export default {

  namespace: 'code',

  state: {
    loading: false,
    total: 0,
    list: [],
    page_index: 1,
  },

  reducers: {
    load(state, action) {
      return {
        ...state, ...{
          loading: true
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
    complete(state, action) {
      return {
        ...state, ...{
          loading: false
        }
      };
    }
  }

};
