import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { capitalize } from '../../utils/helpers';
import { addPostAPI, editPostAPI } from '../../actions/post';

class PostForm extends Component {

  state = {
    author: '',
    title: '',
    category: '',
    body: '',
    hasError: false
  }

  componentDidMount() {
    if (this.props.post) {
      const { author, title, category, body } = this.props.post;
      this.setState({
        author,
        title,
        category,
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
    const { author, title, category, body } = this.state;
    return (author !== '' && title !== '' && category !== '' && body !== '');
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const { hasError, ...post } = this.state;
      if (this.props.edit) {
        this.props.editPost(this.props.post.id, post);
        this.props.onClose();
      } else {
        this.props.addPost(post);
        this.props.history.push('/');
      }
    } else {
      this.setState({
        hasError: true
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="p-3">
        { this.state.hasError && (
          <Alert color="danger">
            <strong> Some fields are missing to complete this post! </strong>
          </Alert>
        )}

        <FormGroup row>
          <Label for="author" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="text" name="author" id="author" placeholder="Name" value={this.state.author} onChange={this.handleChange} readOnly={this.props.edit} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="text" name="title" id="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="category" sm={2}>Category</Label>
          <Col sm={10}>
            <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleChange} readOnly={this.props.edit} >
              <option value="">Select One</option>
              {this.props.categories.map((category) => (
                <option key={category} value={category}>
                  {capitalize(category)}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="body" sm={2}>Content</Label>
          <Col sm={10}>
            <Input type="textarea" name="body" id="body" value={this.state.body} onChange={this.handleChange} />
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

PostForm.propTypes = {
  categories: PropTypes.array,
  edit: PropTypes.bool,
  addPost: PropTypes.func,
  editPost: PropTypes.func,
  onClose: PropTypes.func,
  post: PropTypes.object,
  history: PropTypes.object
};

PostForm.defaultProps = {
  categories: []
};

const mapStateToProps = ({ category }) => ({
  ...category
});

export default connect(
  mapStateToProps,
  { 
    addPost: addPostAPI,
    editPost: editPostAPI
  }
)(PostForm);
