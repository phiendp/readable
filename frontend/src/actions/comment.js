import api from '../utils/api';
import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from './index';


const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const getCommentsAPI = (parentId) => (dispatch) => {
  api.getComments(parentId).then(
    (comments) => dispatch(receiveComments(comments))
  );
};

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const addCommentAPI = (comment) => (dispatch) => {
  api.addComment(comment).then(
    (comment) => dispatch(addComment(comment))
  );
};

const voteComment = ({ id, voteScore }) => ({
  type: VOTE_COMMENT,
  id,
  voteScore
});

export const voteCommentAPI = (id, vote) => (dispatch) => {
  api.voteComment(id, vote).then(
    (comment) => dispatch(voteComment(comment))
  );
};

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
});

export const editCommentAPI = (id, comment) => (dispatch) => {
  api.editComment(id, comment).then(
    (comment) => dispatch(editComment(comment))
  );
};

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
});

export const deleteCommentAPI = (id) => (dispatch) => {
  api.deleteComment(id).then(
    (comment) => dispatch(deleteComment(comment))
  );
};
