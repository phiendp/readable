import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { addCommentAPI, editCommentAPI } from '../../actions/comment';

class CommentForm extends Component {

  state = {
    author: '',
    body: '',
    hasError: false
  }

  componentDidMount() {
    if (this.props.comment) {
      const { author, body } = this.props.comment;
      this.setState({
        author,
        body
      });
    }
  }
  

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  validateForm = () => {
    const { author, body } = this.state;
    return (author !== '' &&  body !== '');
  }

  handleReset = () => {
    this.setState({
      author: '',
      body: '',
      hasError: false
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      let { hasError, ...comment } = this.state;
      if (this.props.edit) {
        this.props.editComment(this.props.comment.id, comment);
        this.props.onClose();
      } else {
        comment.parentId = this.props.parentId;
        this.props.addComment(comment);
      }
      this.handleReset();
    } else {
      this.setState({
        hasError: true
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className={this.props.edit ? "w-100 p-3" : "w-100"}>
        {this.state.hasError && (
          <Alert color="danger">
            <strong>Oops!</strong> All fields are required to add a comment.
          </Alert>
        )}

        <FormGroup row>
          <Label for="author" sm={2}>Name</Label>
          <Col sm={10}>
            <Input 
              type="text" 
              name="author" 
              id="author" 
              placeholder="Name" 
              value={this.state.author} 
              onChange={this.handleChange} 
              readOnly={this.props.edit} 
            />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="body" sm={2}>Comment</Label>
          <Col sm={10}>
            <Input 
              type="textarea" 
              name="body" 
              id="body" 
              value={this.state.body} 
              onChange={this.handleChange} 
              placeholder="Your Comment"
            />
          </Col>
        </FormGroup>
        
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="primary">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  edit: PropTypes.bool,
  editComment: PropTypes.func,
  onClose: PropTypes.func,
  comment: PropTypes.object,
  addComment: PropTypes.func
};

export default connect(
  null,
  { 
    addComment: addCommentAPI,
    editComment: editCommentAPI
  }
)(CommentForm);
