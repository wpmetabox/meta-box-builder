import createDataContext from '../createDataContext';
import updateSelectedReducer from './UpdateSelectedReducer';

const updateSelectedList = dispatch => () => {
  dispatch({ updatedTime: (new Date()).getTime() })
};

export const { Provider, Context, actions } = createDataContext(
  updateSelectedReducer,
  { updateSelectedList },
  { updatedTime: '' }
);