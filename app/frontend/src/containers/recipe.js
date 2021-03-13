import React, { Component } from 'react';
import RecipeComponent from '../components/recipe';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Recipe extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RecipeComponent/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)