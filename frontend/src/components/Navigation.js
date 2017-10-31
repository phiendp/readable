import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { capitalize } from '../utils/helpers';

class Navigation extends Component {

  state = {
    isOpen: false,
    dropdownOpen: false
  }
  
  toggleNav = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand href="/"> Readable </NavbarBrand>
            
            <Nav className="w-100" navbar>
              {this.props.categories.map((category) => (
                <NavItem key={category} >
                  <NavLink href={`/${category}`}>
                    {capitalize(category)}
                  </NavLink>
                </NavItem>
              ))}
              
              <NavItem className="ml-auto">
                <NavLink href="/new/">New Post</NavLink>
              </NavItem>
            </Nav>
        
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  categories: PropTypes.array
};

Navigation.defaultProps = {
  categories: []
};

const mapStateToProps = ({ category }) => ({
  ...category
});

export default connect(
  mapStateToProps,
  null
)(Navigation);
