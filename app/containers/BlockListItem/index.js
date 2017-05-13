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
// import IssueIcon from './IssueIcon';
// import IssueLink from './IssueLink';
// import RepoLink from './RepoLink';
import Wrapper from './Wrapper';

export class BlockListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {


    // Put together the content of the repository
    // const content = (
    //   <Wrapper>
    //     <RepoLink href={item.html_url} target="_blank">
    //       {nameprefix + item.name}
    //     </RepoLink>
    //     <IssueLink href={`${item.html_url}/issues`} target="_blank">
    //       <IssueIcon />
    //       <FormattedNumber value={item.open_issues_count} />
    //     </IssueLink>
    //   </Wrapper>
    // );

    // Render the content into a list item
    // return (
    //   <ListItem key={`block-list-item-${item.full_name}`} item={content} />
    // );
    const block = this.props.item
    return (<div>Block {block.block_number} ({block.created_at}) : {block.tx_id}  <hr /></div>)
  }
}

BlockListItem.propTypes = {
//  block: React.PropTypes.object,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(BlockListItem);
