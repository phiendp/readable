import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { getPostsAPI, sortPost } from '../../actions/post';
import { sort_by } from '../../utils/helpers';
import Post from './Post';
  
class PostList extends Component {

  componentDidMount() {
    if (this.props.match.params.category)
      this.props.getPosts(this.props.match.params.category);
    else
      this.props.getPosts();
  }

  handleSort = (sort) => {
    this.props.sortPost(sort);
  }
  
  render() {
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Sort Posts By
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem onClick={() => this.handleSort('timestamp')}>
              Date: Oldest First
            </DropdownItem>
          
            <DropdownItem onClick={() => this.handleSort('-timestamp')}>
              Date: Newest First
            </DropdownItem>
          
            <DropdownItem onClick={() => this.handleSort('-voteScore')}>
              Score: Highest First
            </DropdownItem>
          
            <DropdownItem onClick={() => this.handleSort('voteScore')}>
              Score: Lowest First
            </DropdownItem>
          </DropdownMenu>
        
        </UncontrolledDropdown>

        {
          this.props.posts.map((post) => 
            <Post key={post.id} post={post}/>
          )
        }
      </div>
    );
  }
}

PostList.propTypes = {
  match: PropTypes.object,  
  getPosts: PropTypes.func,
  sortPost: PropTypes.func,
  posts: PropTypes.array
};

const mapStateToProps = ({ post }) => {
  if (post.posts) {
    let posts = Object.keys(post.posts).map((postId) => post.posts[postId]).filter((post) => post);
    if (post.sortBy)
      posts.sort(sort_by(post.sortBy));
    return { posts };
  } else
    return { posts: [] };
};

export default connect(
  mapStateToProps,
  { 
    getPosts: getPostsAPI,
    sortPost: sortPost
  }
)(PostList);
