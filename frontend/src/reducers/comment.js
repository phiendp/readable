import { RECEIVE_COMMENTS, ADD_COMMENT, VOTE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/index';


const commentReducer = (state={}, action) => {
  const { comments, comment } = action;
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: comments.reduce((accu, curr) => {
          accu[curr.id] = curr;
          return accu;
        }, {})
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment
        }
      };

    case EDIT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment
        }
      };
      
      case DELETE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: null
        }
      };

    case VOTE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.id]: {
            ...state.comments[action.id],
            voteScore: action.voteScore
          }
        }
      };

    default:
      return state;
  }
};

export default commentReducer;
