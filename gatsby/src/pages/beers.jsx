import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const StyledBeerGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StyledBeer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 1rem;
  }
`;

const Beer = ({ beer }) => (
  <StyledBeer>
    <div>
      <img src={beer.image} alt={beer.name} />
    </div>
    <div>
      <h3>{beer.name}</h3>
      <p>{beer.price}</p>
      <p
        title={`${beer.rating.average.toFixed(2)} out of 5 stars based on ${
          beer.rating.reviews
        } reviews`}
      >
        {`⭐️`.repeat(Math.round(beer.rating.average))}
        <span style={{ filter: `grayscale(100%)` }}>
          {`⭐️`.repeat(5 - Math.round(beer.rating.average))}
        </span>
        <span>({beer.rating.reviews})</span>
      </p>
    </div>
  </StyledBeer>
);

const BeersPage = ({ data: { beers } }) => {
  const { nodes } = beers;

  return (
    <>
      <h2 className="center">
        We have {nodes.length} beers available every day. Dine in only!
      </h2>
      <StyledBeerGrid>
        {nodes && nodes.map((beer) => <Beer key={beer.id} beer={beer} />)}
      </StyledBeerGrid>
    </>
  );
};

export default BeersPage;

export const pageQuery = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;
