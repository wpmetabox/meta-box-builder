import createDataContext from '../createDataContext';
import conditionalReducer from './ConditionalReducer';

const updateConditionalList = dispatch => ( payload, type ) => {
  dispatch( { type, payload } );
};

export const { Provider, Context, actions } = createDataContext(
  conditionalReducer,
  { updateConditionalList },
  {}
);