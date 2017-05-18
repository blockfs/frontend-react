/**
 * FileIFrame
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import Wrapper from './Wrapper';

export class FileIFrame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {

    const iframeStyle = {
      width: '100%',
      minHeight: '20em',
      'overFlow': 'scroll'
    }

    return (
      <Wrapper key={this.props.iframeKey}>
        <iframe src={`http://${window.location.hostname}:8002/`} style={iframeStyle}/>
      </Wrapper>
    )
  }
}

FileIFrame.propTypes = {
  iframeKey: React.PropTypes.number,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(FileIFrame);
