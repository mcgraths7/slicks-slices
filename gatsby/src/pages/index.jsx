import React from 'react';
// import styled from 'styled-components';

import SEO from '../components/SEO';
import useLatestData from '../hooks/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';
import { HomePageGrid } from '../styles/Grids';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters currently slicing</span>
      </h2>
      <p>Standing by ready to slice you up!</p>

      {!slicemasters && (
        <LoadingGrid count={Object.values(slicemasters).length} />
      )}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now. Try again later!</p>
      )}
      {slicemasters && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={Object.values(hotSlices).length} />}
      {hotSlices && !hotSlices?.length && <p>Case is empty! Sorry!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <>
      <SEO title="Home" description="The index page." />
      <div className="center">
        <h1>The Best Pizza in Brooklyn!</h1>
        <p>Come on by every day from 11am to 11pm</p>
        <HomePageGrid className="center">
          <CurrentlySlicing className="subgrid" slicemasters={slicemasters} />
          <HotSlices className="subgrid" hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
};

export default HomePage;
