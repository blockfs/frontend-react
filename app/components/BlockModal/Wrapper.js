import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: scroll;
  height:300px;
  ul {
    overflow: scroll;
    padding: 2em;
    background: white;
    li {
      background: white;
    }
  }
`;

export default Wrapper;
