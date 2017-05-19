/**
 * BlockListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';
import BlockWrapper from './BlockWrapper';
import BlockModal from 'components/BlockModal';
import JSONTree from 'react-json-tree'

export class BlockListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const block = this.props.item
    const modalContent = <JSONTree data={block} invertTheme={true} />
    const content = (
      <Wrapper>
        <BlockWrapper>
          <BlockModal title={`Block ${block.block_number} : (${block.created_at})`} content={modalContent}/>
        </BlockWrapper>
      </Wrapper>
    );
    return (
      <ListItem key={`block-list-block-${block.block_number}`} item={content} />
    );
  }
}

BlockListItem.propTypes = {
  item: React.PropTypes.object,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(BlockListItem);
