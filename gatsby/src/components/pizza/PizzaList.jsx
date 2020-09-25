import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import ToppingsFilter from '../ToppingsFilter';

const StyledPizzasListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const StyledPizzaGrid = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

const Pizza = ({ pizza }) => {
  const { fluid } = pizza.image.asset;
  return (
    <StyledPizzaGrid>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={fluid} alt={pizza.name} />
    </StyledPizzaGrid>
  );
};

const PizzaList = ({ pizzas }) => {
  const renderedPizzas = () =>
    pizzas.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />);
  return (
    <>
      <ToppingsFilter />
      <StyledPizzasListGrid>{renderedPizzas()}</StyledPizzasListGrid>
    </>
  );
};

export default PizzaList;
