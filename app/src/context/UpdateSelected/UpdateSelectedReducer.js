const updateSelectedReducer = (state, action) => {
  return { ...state, updatedTime: action.updatedTime , tree: action.tree};
};

export default updateSelectedReducer;