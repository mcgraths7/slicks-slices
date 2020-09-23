import React from 'react';
import styled from 'styled-components';

import 'normalize.css';
import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';
import stripes from '../../assets/images/stripes.svg';

const StyledBorder = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  background: var(--white) url(${stripes});
  background-size: 160rem;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.09);
  border: 5px solid var(--white);
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const StyledLayout = styled.div`
  background: var(--white);
  padding: 2rem;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <StyledBorder>
      <StyledLayout>
        <Nav />
        {children}
        <Footer />
      </StyledLayout>
    </StyledBorder>
  </>
);

export default Layout;
