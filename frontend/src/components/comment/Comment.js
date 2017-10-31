import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';  
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaPencil from 'react-icons/lib/fa/pencil';  
import FaTrashO from 'react-icons/lib/fa/trash-o'; 
import { ButtonGroup, Alert, Button, Modal } from 'reactstrap';
import Moment from 'react-moment';

import CommentForm from './CommentForm';
import { voteCommentAPI, deleteCommentAPI } from '../../actions/comment';

class Comment extends Component {

  state = {
    edit: false,
    delete: false 
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  toggleDelete = () => {
    this.setState({
      delete: !this.state.delete
    });
  }

  handleVote = (vote) => {
    this.props.voteComment(this.props.comment.id, vote);
  }

  handleDelete = () => {
    this.props.deleteComment(this.props.comment.id);
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="d-flex flex-row w-100">
        <ButtonGroup size="sm" vertical>
          <Button color="primary" onClick={() => this.handleVote('upVote')}><FaThumbsOUp /></Button>
          <Button color="info">{comment.voteScore}</Button>
          <Button color="secondary" onClick={() => this.handleVote('downVote')}><FaThumbsODown /></Button>
        </ButtonGroup>
        
        <div className="ml-3">
          <p>{comment.body}</p>
          <p>
            <span className="mr-2">{comment.author}</span>
            <Moment fromNow className="text-muted">
              {comment.timestamp}
            </Moment>
          </p>
        </div>

        <ButtonGroup size="sm" vertical className="align-self-center ml-auto">
          <Button color="info" onClick={this.toggleEdit}><FaPencil /></Button>
          <Button onClick={this.toggleDelete}><FaTrashO /></Button>
        </ButtonGroup>
        
        <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
          <CommentForm edit comment={this.props.comment} onClose={this.toggleEdit} />
        </Modal>
        
        <Modal isOpen={this.state.delete} toggle={this.toggleDelete}>
          <Alert color="danger" className="m-0">
            <strong>Are you Sure?</strong> This cannot be undone.<br />
            <Button color="danger" block onClick={this.handleDelete}>Delete this Comment</Button>
            <Button color="secondary" block onClick={this.toggleDelete}>I changed my mind.</Button>
          </Alert>
        </Modal>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  voteComment: PropTypes.func,
  deleteComment: PropTypes.func
};

export default connect(
  null,
  { 
    voteComment: voteCommentAPI,
    deleteComment: deleteCommentAPI
  }
)(Comment);
