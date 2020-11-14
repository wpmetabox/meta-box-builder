import createDataContext from '../createDataContext';
import conditionalReducer from './ConditionalReducer';

const updateConditionalList = dispatch => ( payload ) => {
  dispatch( payload );
};

export const { Provider, Context, actions } = createDataContext(
  conditionalReducer,
  { updateConditionalList },
  {}
);