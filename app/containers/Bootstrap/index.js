import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'components/SplashScreen';
import mapStateToProps from './selectors';
import { getCredentials } from './actions';

class Bootstrap extends React.Component {
  componentDidMount() {
    this.props.onGetCredentials();
  }
  render() {
    return (
      <div>
        {
          this.props.isLoading ? <SplashScreen /> : this.props.children
        }
      </div>
    );
  }
}
Bootstrap.propTypes = {
  onGetCredentials: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

function mapDispatchToProps(dispatch) {
  return {
    onGetCredentials: () => dispatch(getCredentials()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap);
