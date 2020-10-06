import React from 'react';

import { GridItem, ItemsGrid } from '../styles/Grids';

const LoadingGrid = ({ count }) => (
  <ItemsGrid>
    {Array.from({ length: count }, (_, idx) => (
      <GridItem key={`loading-${idx}`}>
        <p>
          <span className="mark">Loading...</span>
        </p>
        <img
          src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
          className="loading"
          alt="Loading"
          width="400"
          height="500"
        />
      </GridItem>
    ))}
  </ItemsGrid>
);

export default LoadingGrid;
