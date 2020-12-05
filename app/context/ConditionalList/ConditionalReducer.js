const conditionalReducer = ( state, action ) => {
  switch ( action.type ) {
    case 'initial':
      return action.payload;
    case 'add':
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
    case 'remove':
      let newResult = { ...state };
      delete newResult[ action.payload.id ];
      return newResult;
    default:
      break;
  }
};

export default conditionalReducer;