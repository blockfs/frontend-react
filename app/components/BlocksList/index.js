import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import BlockListItem from 'containers/BlockListItem';

function BlocksList({ loading, error, blocks }) {

  console.log("BLOCKLIST: ", blocks)

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (blocks !== false) {
    return <List items={blocks} component={BlockListItem} />;
  }

  return null;
}

BlocksList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  blocks: PropTypes.any,
};

export default BlocksList;
