import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const Tittle = styled.h1`
  font-style: normal;
  font-weight: 300;
  font-size: 50px;
  line-height: 120%;
  color: #282828;
  margin-bottom: 15px;
`;

const Subtitle = styled.h3`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 100%;
  color: #282828;
`;

const Header = () => (
  <Box>
    <Tittle>Crypto Exchange</Tittle>
    <Subtitle>Exchange fast and easy</Subtitle>
  </Box>
);

export default Header;
