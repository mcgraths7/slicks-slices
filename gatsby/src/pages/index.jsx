import React from 'react';

import SEO from '../components/SEO';

const HomePage = () => (
  <>
    <SEO title="Home" description="The index page." />
    <div className="center">
      <h2>The Best Pizza in Brooklyn!</h2>
      <p>Come on by every day from 11am to 11pm</p>
    </div>
  </>
);

export default HomePage;
