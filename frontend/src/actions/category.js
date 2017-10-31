import api from '../utils/api';

import { RECEIVE_CATEGORIES } from './index';


const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => (dispatch) => {
  api.getCategories().then(
    (categories) => dispatch(receiveCategories(categories))
  );
};
