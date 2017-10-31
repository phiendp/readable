import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

import { getPostAPI } from '../../actions/post';
import { getCommentsAPI } from '../../actions/comment';
import Post from './Post';
import UnavailablePost from './UnavailablePost';
import Comment from '../comment/Comment';
import CommentForm from '../comment/CommentForm';


class PostDetails extends Component {

  handleDelete = () => {
    this.props.history.replace('/');
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
    this.props.getComments(this.props.match.params.postId);
  }

  render() {
    const { post, pending } = this.props;
    const displayPost = pending ? <Loading /> : (
      post ? (
        <div>
          <Post post={post} onDelete={this.handleDelete} />
          <div className="my-3 p-4 h3">
            {post.body}
          </div>

          <Card>
            <ListGroup className="list-group-flush">
            {
              this.props.comments.map((comment) =>
              <ListGroupItem className="comment" key={comment.id}>
                <Comment comment={comment} />
              </ListGroupItem>
              )
            }
            </ListGroup>
          
            <CardHeader>Add a Comment</CardHeader>
            <CardBody>
              <CommentForm parentId={this.props.match.params.postId} />
            </CardBody>
          </Card>
        </div>

      ) : (
        <UnavailablePost history={this.props.history} />
      )
    );
    return (
      <div>
        {displayPost}
      </div>
    );
  }
}

PostDetails.propTypes = {
  post: PropTypes.object,
  pending: PropTypes.bool,
  getPost: PropTypes.func,
  getComments: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  comments: PropTypes.array
};

PostDetails.defaultProps = {
  comments: []
};

const mapStateToProps = ({ post, comment }) => {
  let props = {
    pending: post.pending
  };
  if (post.posts) {
    props.post = post.posts[Object.keys(post.posts)[0]];
  }
  if (comment.comments) {
    props.comments = Object.keys(comment.comments).map((commentId) => comment.comments[commentId]).filter((comment) => comment);
  }
  return props;
};

export default connect(
  mapStateToProps,
  { 
    getPost: getPostAPI,
    getComments: getCommentsAPI,
  }
)(PostDetails);
