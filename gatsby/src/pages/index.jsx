import React from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';

function CurrentlySlicing() {
  return <div>CurrentlySlicing</div>;
}

function HotSlices() {
  return <div>Hot Slices</div>;
}

const HomePage = () => (
  <>
    <SEO title="Home" description="The index page." />
    <div className="center">
      <h1>The Best Pizza in Brooklyn!</h1>
      <p>Come on by every day from 11am to 11pm</p>
      <CurrentlySlicing />
      <HotSlices />
    </div>
  </>
);

export default HomePage;
