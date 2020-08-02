const updateSelectedReducer = (state, action) => {
  return { ...state, updatedTime: action.updatedTime };
};

export default updateSelectedReducer;