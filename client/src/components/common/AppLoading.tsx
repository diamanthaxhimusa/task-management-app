import React from 'react';
import styled from 'styled-components';

interface IAppLoadingProps {}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h6`
  color: #111;
  font-weight: normal;
  letter-spacing: 0.25rem;
  text-transform: uppercase;
  margin: 1.5rem 0;
`;

const AppLoading: React.FC<IAppLoadingProps> = () => {
  return (
    <Wrapper>
      <Title>Loading</Title>
    </Wrapper>
  );
};

export default AppLoading;
