import React from 'react';
import { ItemsGrid, GridItem } from '../styles/Grids';

const ItemGrid = ({ items }) => {
  console.log('?');
  return (
    <ItemsGrid>
      {items.map((item) => (
        <GridItem>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            width="500"
            height="400"
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </GridItem>
      ))}
    </ItemsGrid>
  );
};

export default ItemGrid;
