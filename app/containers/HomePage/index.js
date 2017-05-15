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

import { makeSelectBlocks, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import BlocksList from 'components/BlocksList';
import BlockListItem from 'containers/BlockListItem';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadBlocks, blocksLoaded } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import Wrapper from './Wrapper';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(properties) {
    super(properties);
    this.state = {loading: true, error: false, blocks: []};
    this.setSocketConnection = this.setSocketConnection.bind(this)
  }

  componentDidMount() {
    // this.props.showBlocks()
    this.setSocketConnection()
  }

  setSocketConnection(){
    // console.log(this.props.loadedBlocks)
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
             this.props.loadedBlocks(allBlocks)
             this.forceUpdate()
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

    return (
      <article>
        <Helmet
          title="BlockFS"
          meta={[
            { name: '', content: '' },
          ]}
        />
        <div>
          {
          // <CenteredSection>
          //   <H2>
          //     <FormattedMessage {...messages.startProjectHeader} />
          //   </H2>
          //   <p>
          //     <FormattedMessage {...messages.startProjectMessage} />
          //   </p>
          // </CenteredSection>
          }
          <Section>
            <H2>
              Blocks
            </H2>
            <Wrapper>
              <BlocksList {...this.state} />
            </Wrapper>
          </Section>
        </div>
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
  };
}

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
