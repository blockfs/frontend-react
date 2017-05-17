import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import FileListItem from 'containers/FileListItem';

function FilesList({ error, files }) {

  console.log("FILESLIST: ", files)

  // if (loading) {
  //   return <List component={LoadingIndicator} />;
  // }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (files !== false) {
    return <List items={files} component={FileListItem} />;
  }

  return null;
}

FilesList.propTypes = {
  error: PropTypes.any,
  files: PropTypes.any,
};

export default FilesList;
