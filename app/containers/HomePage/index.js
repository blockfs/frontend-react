/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectBlocks, makeSelectFiles, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import BlocksList from 'components/BlocksList';
import FilesList from 'components/FilesList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadBlocks, blocksLoaded, loadFiles } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import Wrapper from './Wrapper';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(properties) {
    super(properties);
    this.state = {loading: true, error: false, blocks: [], files: []};
    this.setSocketConnection = this.setSocketConnection.bind(this)
  }

  componentDidMount() {
    this.setSocketConnection()
    this.props.showFiles()
  }

  setSocketConnection(){
    const socket = new WebSocket("ws://" + '127.0.0.1:8000' + "/chat/");
    console.log("I am starting socket")
    socket.onmessage = (e) => {
       if (e.data != "Subscribed to all messages.") {
           let data = JSON.parse(e.data)
           // only use block data
           if(data.block_number){
             console.log('-------------------------------')
             console.log("WEB-SOCKET BLOCK DATA: ", data)
             var allBlocks = this.state.blocks
             allBlocks.unshift(data)
             this.setState({blocks: allBlocks, loading: false})
             console.log("STATE BLOCKS: ", this.state.blocks)
             // assume there's need to refresh file list everytime we hear something from socket
             this.props.showFiles()
             this.props.loadedBlocks(allBlocks)
           }
        }
    }
    socket.onopen = function() {
      console.log("want to subscribe");
      socket.send("subscribe");
    }
    // Call onopen directly if socket is already open
    if (socket.readyState == WebSocket.OPEN) socket.onopen();
  }

  render() {

    const { loading, error, blocks } = this.props;
    const BlockListProps = {
      loading,
      error,
      blocks,
    };

    const { files } = this.props;
    const FileListProps = {
      error,
      files,
    };

    return (
      <article>
        <Helmet
          title="BlockFS"
          meta={[
            { name: '', content: '' },
          ]}
        />
        <Section>
          <Wrapper>
            <H2>
              Files
            </H2>
            <FilesList {...FileListProps} />
          </Wrapper>
          <Wrapper>
            <H2>
              Blocks
            </H2>
            <BlocksList {...BlockListProps} />
          </Wrapper>
        </Section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  blocks: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ])
};

export function mapDispatchToProps(dispatch) {
  return {
    loadedBlocks: (blocks) => {
      dispatch(blocksLoaded(blocks));
    },
    showBlocks: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadBlocks());
    },
    showFiles: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadFiles());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  files: makeSelectFiles(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
