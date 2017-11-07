import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
`;
export default class Content extends React.Component {
  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}
