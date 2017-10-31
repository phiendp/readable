import { RECEIVE_POSTS, RECEIVE_POST, RECEIVE_POST_PENDING, RECEIVE_POST_FAIL } from '../actions/index';
import { ADD_POST, VOTE_POST, EDIT_POST, DELETE_POST, SORT_POST } from '../actions/index';


const initState = {
  pending: false,
  sortBy: 'voteScore'
};

const postReducer = (state=initState, action) => {
  const { posts, post } = action;
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: posts.reduce((accu, curr) => {
          accu[curr.id] = curr;
          return accu;
        }, {})
      };

    case RECEIVE_POST:
      return {
        ...state,
        posts: {
          [post.id]: post
        },
        pending: false
      };

    case RECEIVE_POST_PENDING:
      return {
        ...state,
        pending: true
      };

    case RECEIVE_POST_FAIL:
      return {
        ...state,
        pending: false
      };

    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };

    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };

    case DELETE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: null
        }
      };

    case VOTE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            voteScore: action.voteScore
          }
        }
      };

    case SORT_POST:
      return {
        ...state,
        sortBy: action.sort
      };
    default:
      return state;
  }
};

export default postReducer;
