/* eslint-disable no-shadow */
import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const PizzaTemplate = path.resolve('./src/templates/Pizza.jsx');
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          slug {
            current
          }
          name
        }
      }
    }
  `);
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('Creating pizza page for ', pizza.name);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: PizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const ToppingsTemplate = path.resolve('./src/pages/pizza.jsx');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.toppings.nodes.forEach((topping) => {
    // console.log(`Creating page for ${topping.id} - ${topping.name}`);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: ToppingsTemplate,
      context: {
        toppingId: topping.id,
      },
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const SlicemasterTemplate = path.resolve('./src/templates/Slicemaster.jsx');
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `slicemasters/${slicemaster.slug.current}`,
      component: SlicemasterTemplate,
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
};

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  console.log('turning 🍻 into nodes');
  // 1. fetch a list of beers
  const ale = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await ale.json();

  // 2. Loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3 create a node for that beer
    actions.createNode({ ...beer, ...nodeMeta });
  }
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // console.log('Creating pages!');
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}

// Sourcing - putting data into gatsby

// Node - piece of data
