import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const StyledTopping = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    align-items: center;
    border-radius: 2px;
    background: var(--grey);
    &:hover {
      background: var(--yellow);
    }
    .count {
      background: var(--white);
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

const countPizzasPerTopping = (pizzas) => {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      const existing = acc[topping.id];
      if (existing) {
        existing.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  return Object.values(counts).sort((a, b) => b.count - a.count);
};

const ToppingsFilter = () => {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
            vegetarian
          }
        }
      }
    }
  `);
  const pizzaCounts = countPizzasPerTopping(pizzas.nodes);
  // TODO list:
  /* 
    1. Get a list of all the toppings --DONE
    2. Get the pizzas each topping belongs to --done
    3. Count the number of pizzas --done
    4. Loop over and display each topping and pizza count
    5. Allow user to click on a topping
  */
  return (
    <StyledTopping>
      {pizzaCounts.map((topping) => (
        <Link to={topping.name} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </StyledTopping>
  );
};

export default ToppingsFilter;
