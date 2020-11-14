const conditionalReducer = ( state, action ) => {
  const key = Object.keys( action )[ 0 ];
  let updatingValue = { ...state[ key ] };
  if ( action[ key ].label && action[ key ].id ) {
    updatingValue = action[ key ];
  } else {
    if ( action[ key ].label ) {
      updatingValue.label = action[ key ].label;
    }
    if ( action[ key ].id ) {
      updatingValue.id = action[ key ].id;
    }
  }

  return { ...state, [ key ]: updatingValue };
};

export default conditionalReducer;