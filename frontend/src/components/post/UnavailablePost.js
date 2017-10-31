import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

class UnavailablePost extends Component {

  componentDidMount() {
    setTimeout(() => this.props.history.replace('/'), 10000);
  }
  
  render() {
    return (
      <Alert color="danger" className="my-3 text-center">  
        <p><strong>This post is unavailable.</strong></p>
        <Link to="/" replace className="btn btn-block btn-primary">Back to homepage</Link>
      </Alert>
    );
  }
}

UnavailablePost.propTypes = {
  history: PropTypes.object
};

export default UnavailablePost;
