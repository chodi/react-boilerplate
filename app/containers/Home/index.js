/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { logout } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.PureComponent { // eslint-disable-line react
  handleOnclick = () => {
    this.props.handleOnclick();
  }
  render() {
    const { loading, error, repos } = this.props;
    return (
      <article>
          <title>WElcom to REact Page</title>
        <div>
          <button onClick={this.handleOnclick}>LOGOUT</button>
        </div>
      </article>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  handleOnclick: PropTypes.func,
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    handleOnclick: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
