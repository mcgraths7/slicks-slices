import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/pizza/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzaPage = ({ data, pageContext }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter activeToppingId={pageContext.toppingId} />
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export default PizzaPage;

export const pageQuery = graphql`
  query($toppingId: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $toppingId } } } }
    ) {
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
          vegetarian
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
