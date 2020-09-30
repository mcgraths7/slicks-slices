import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import useForm from '../hooks/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import StyledOrderForm from '../styles/OrderStyles';
import StyledMenuItem from '../styles/MenuItemStyles';

const OrderPage = ({ data: { pizzas } }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  return (
    <>
      <SEO title="Order Ahead" description="The orders page" />
      <StyledOrderForm>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.nodes.map((pizza) => (
            <StyledMenuItem key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button type="button">{`${size} - ${calculatePizzaPrice(
                    pizza.price,
                    size
                  )}`}</button>
                ))}
              </div>
            </StyledMenuItem>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </StyledOrderForm>
    </>
  );
};

export default OrderPage;

export const orderQuery = graphql`
  query {
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
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 100, maxHeight: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
