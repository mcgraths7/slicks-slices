import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage = ({ data: { pizza } }) => {
  const { name, image, toppings } = pizza;
  return (
    <>
      <Helmet>
        <title>{`Slick's | ${name}`}</title>
      </Helmet>
      <PizzaGrid>
        <Img fluid={image.asset.fluid} alt={name} />
        <div>
          <h2 className="mark">
            {toppings.every((topping) => topping.vegetarian)
              ? `${name} 🌱`
              : name}
          </h2>
          <ul>
            {toppings.map((topping) => (
              <li key={topping.id}>
                {topping.vegetarian ? `${topping.name} 🌱` : topping.name}
              </li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
};

export default SinglePizzaPage;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      price
      toppings {
        id
        name
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
