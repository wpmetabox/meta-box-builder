const conditionalReducer = ( state, action ) => {
  if ( action.type === 'initial' ) {
    return action.payload;
  } else {
    const payload = action.payload;
    const key = Object.keys( payload )[ 0 ];
    let updatingValue = { ...state[ key ] };
    if ( payload[ key ].label && payload[ key ].id ) {
      updatingValue = payload[ key ];
    } else {
      if ( payload[ key ].label ) {
        updatingValue.label = payload[ key ].label;
      }
      if ( payload[ key ].id ) {
        updatingValue.id = payload[ key ].id;
      }
    }

    return { ...state, [ key ]: updatingValue };
  }

};

export default conditionalReducer;