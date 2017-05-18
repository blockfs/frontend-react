/**
 * FileListItem
 *
 * Lists the file
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';
import LineWrapper from './LineWrapper';
import File from './File';
import Dir from './Dir';

export class FileListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const file = this.props.item
    let content = ''
    if (file) {
      content = (
        <Wrapper>
          <LineWrapper key={file.id}>
            {file.type == 'd' ? <Dir>{file.name}</Dir> : <File>{file.name} ({file.info.substring(0,20)}...)</File>}
          </LineWrapper>
        </Wrapper>
      );
    } else {
      content = (<div></div>)
    }

    return (
      <ListItem key={`file-list-${file}`} item={content} />
    );
  }
}

FileListItem.propTypes = {
  item: React.PropTypes.object,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(FileListItem);
