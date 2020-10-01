import React from 'react';
import Img from 'gatsby-image';
import StyledMenuItem from '../styles/MenuItemStyles';

import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((p) => p.id === singleOrder.id);
        return (
          <StyledMenuItem key={singleOrder.id}>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <h2>{`${pizza.name} - ${singleOrder.size}`}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
            </p>
            <button
              type="button"
              className="remove"
              title={`remove ${singleOrder.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(index)}
            >
              ✘
            </button>
          </StyledMenuItem>
        );
      })}
    </>
  );
}
