import api from '../utils/api';
import { RECEIVE_POSTS, RECEIVE_POST, RECEIVE_POST_PENDING, RECEIVE_POST_FAIL } from './index';
import { ADD_POST, EDIT_POST, DELETE_POST, VOTE_POST, SORT_POST } from './index';


const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getPostsAPI = (category) => (dispatch) => {
  if(category)
    api.getPostsByCategory(category).then(
      (posts) => dispatch(receivePosts(posts))
    );
  else
    api.getPosts().then(
      (posts) => dispatch(receivePosts(posts))
    );
};

const receivePostPending = () => ({
  type: RECEIVE_POST_PENDING
});

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
});

const receivePostFail = () => ({
  type: RECEIVE_POST_FAIL
});

export const getPostAPI = (id) => (dispatch) => {
  dispatch(receivePostPending());
  api.getPostById(id).then(
    (post) => {
      if (post && post !== {}) {
        dispatch(receivePost(post));
      } else {
        dispatch(receivePostFail());
      }
    }
  ).catch(() => dispatch(receivePostFail()));
};

const addPost = (post) => ({
  type: ADD_POST,
  post
});

export const addPostAPI = (post) => (dispatch) => {
  api.addPost(post).then(
    (post) => dispatch(addPost(post))
  );
};

const votePost = ({ id, voteScore }) => ({
  type: VOTE_POST,
  id,
  voteScore
});

export const votePostAPI = (id, vote) => (dispatch) => {
  api.votePost(id, vote).then(
    (post) => dispatch(votePost(post))
  );
};

const editPost = (post) => ({
  type: EDIT_POST,
  post
});

export const editPostAPI = (id, post) => (dispatch) => {
  api.editPost(id, post).then(
    (post) => dispatch(editPost(post))
  );
};

const deletePost = (id) => ({
  type: DELETE_POST,
  id
});

export const deletePostAPI = (id) => (dispatch) => {
  api.deletePost(id).then(
    () => dispatch(deletePost(id))
  );
};

export const sortPost = (sort) => ({
  type: SORT_POST,
  sort
});
