import React, { Component } from 'react';
import HeaderComponent from '../components/header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Header extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <HeaderComponent/>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)