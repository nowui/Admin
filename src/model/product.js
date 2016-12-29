export default {

  namespace: 'product',

  state: {
    loading: false,
    total: 0,
    list: [],
    page_index: 1,
  },

  reducers: {
    list(state, action) {
      return {
        ...state, ...{
          total: action.data.total,
          list: action.data.list,
          page_index: action.data.page_index
        }
      };
    }
  }

};
