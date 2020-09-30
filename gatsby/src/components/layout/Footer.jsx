import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
`;

const Footer = () => (
  <StyledFooter>
    <p>&copy; Slick's Slices {new Date().getFullYear()}</p>
  </StyledFooter>
);

export default Footer;
