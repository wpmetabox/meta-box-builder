import createDataContext from '../createDataContext';
import updateSelectedReducer from './UpdateSelectedReducer';

const updateSelectedList = dispatch => (tree) => {
  dispatch({ updatedTime: (new Date()).getTime(), tree })
};

export const { Provider, Context, actions } = createDataContext(
  updateSelectedReducer,
  { updateSelectedList },
  { updatedTime: null, tree: { id: 'root', items: [] } }
);