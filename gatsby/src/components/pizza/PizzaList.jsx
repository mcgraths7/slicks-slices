import React from 'react';
import { Link } from 'gatsby';

const Pizza = ({ pizza }) => (
  <div>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
  </div>
);

const PizzaList = ({ pizzas }) => {
  const renderedPizzas = () =>
    pizzas.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />);
  return <ul>{renderedPizzas()}</ul>;
};

export default PizzaList;
