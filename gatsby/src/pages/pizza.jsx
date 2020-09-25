import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/pizza/PizzaList';

const PizzaPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export default PizzaPage;

export const pageQuery = graphql`
  query AllPizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
