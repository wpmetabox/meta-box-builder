import createDataContext from '../createDataContext';
import conditionalReducer from './ConditionalReducer';

const updateConditionalList = dispatch => ( type, payload ) => {
  dispatch( { type, payload } );
};

export const { Provider, Context, actions } = createDataContext(
  conditionalReducer,
  { updateConditionalList },
  {}
);