import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import useForm from '../hooks/useForm';
import usePizza from '../hooks/usePizza';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import StyledOrderForm from '../styles/OrderStyles';
import StyledMenuItem from '../styles/MenuItemStyles';
import PizzaOrder from '../components/PizzaOrder';

const OrderPage = ({ data }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas: pizzas.nodes,
    inputs: values,
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
          {pizzas.map((pizza) => (
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
                  <button
                    type="button"
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >{`${size} - ${formatMoney(
                    calculatePizzaPrice(pizza.price, size)
                  )}`}</button>
                ))}
              </div>
            </StyledMenuItem>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your total is:{' '}
            {formatMoney(calculateOrderTotal(order, pizzas)) || '$0.00'}
          </h3>
          <button type="submit">Place Order</button>
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
