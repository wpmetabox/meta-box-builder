const fieldTypesReducer = (state, action) => {
    const type = action.type;
    return { ...state,[type]: action.payload};
  };
  
  export default fieldTypesReducer;