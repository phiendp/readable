import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories } from '../actions/category';
import { getPostsAPI } from '../actions/post';
import Navigation from './Navigation';
import PostList from './post/PostList';
import PostForm from './post/PostForm';
import PostDetails from './post/PostDetails';


class App extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/new" component={PostForm} />
          <Route exact path="/:category" component={PostList} />
          <Route path="/:category/:postId" component={PostDetails} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func,
  getPosts: PropTypes.func,
};

export default  withRouter(connect(
  null,
  {
    getCategories: getCategories,
    getPosts: getPostsAPI
  }
)(App));
