import axios from 'axios';
import uuid from 'uuid/v1'


const URL = 'http://localhost:3001';

const generateToken = () => {
  const token = Math.random().toString(36).substr(-8);
  localStorage.setItem('token', token);
  return token;
};

const token = localStorage.getItem('token') || generateToken();
axios.defaults.headers.common['Authorization'] = token;

const api = {};

const getCommentCount = (postArr) => {
  const promiseArr = postArr.map(
    (post) => api.getComments(post.id)
  );
  return axios.all(promiseArr).then(
    (resultArr) => resultArr.map((result) => result.length)
  ).then((lengthArr) => 
    lengthArr.map((length, index) => {
      postArr[index].comments = length;
      return postArr[index];
    })
  );
};

api.getPosts = () => axios.get(`${URL}/posts`)
.then((res) => getCommentCount(res.data));

api.getPostsByCategory = (category) => axios.get(`${URL}/${category}/posts`)
.then((res) => getCommentCount(res.data));

api.addPost = (post) => {
  const id = uuid();
  const timestamp = Date.now();
  post = { ...post, id, timestamp };
  return axios.post(`${URL}/posts`, post)
  .then((res) => res.data);
};

api.getPostById = (id) => axios.get(`${URL}/posts/${id}`)
.then((res) => {
  if (res.data.id) {
    return res.data;
  } else {
    return Promise.reject(new Error());
  }
});

api.editPost = (id, post) => axios.put(`${URL}/posts/${id}`, post)
.then((res) => res.data);

api.deletePost = (id) => axios.delete(`${URL}/posts/${id}`);

api.votePost = (id, vote) => axios.post(`${URL}/posts/${id}`, {option: vote})
.then((res) => res.data);

api.getComments = (id) => axios.get(`${URL}/posts/${id}/comments`)
.then((res) => res.data);

api.addComment = (comment) => {
  const id = uuid();
  const timestamp = Date.now();
  comment = { ...comment, id, timestamp };
  return axios.post(`${URL}/comments`, comment)
  .then((res) => res.data);
};

api.editComment = (id, comment) => axios.put(
  `${URL}/comments/${id}`,
  comment
).then((res) => res.data);

api.deleteComment = (id) => axios.delete(`${URL}/comments/${id}`)
.then((res) => res.data);

api.voteComment = (id, vote) => axios.post(
  `${URL}/comments/${id}`,
  { option: vote }
).then((res) => res.data);

api.getCategories = () => axios.get(`${URL}/categories`)
.then((res) => res.data.categories)
.then((categories) => categories.map((category) => category.name));


export default api;
