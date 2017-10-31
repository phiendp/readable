import { RECEIVE_CATEGORIES } from '../actions/index';


const categoryReducer = (state={}, action) => {
  const { categories } = action;
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories
      };
    default:
      return state;
  }
};

export default categoryReducer;
