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
    actions.createPage({
      path: `topping/${topping.name}`,
      component: ToppingsTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const PaginatedSlicemastersPageTemplate = path.resolve(
    './src/pages/slicemasters.jsx'
  );
  const SlicemasterPageTemplate = path.resolve(
    './src/templates/Slicemaster.jsx'
  );

  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_SLICEMASTERS_PER_PAGE, 10);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, idx) => {
    actions.createPage({
      path: `slicemasters/${idx + 1}`,
      component: PaginatedSlicemastersPageTemplate,
      context: {
        skip: idx * pageSize,
        currentPage: idx + 1,
        pageSize,
        pageCount,
      },
    });
  });
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `slicemasters/${slicemaster.slug.current}`,
      component: SlicemasterPageTemplate,
      context: {
        slug: slicemaster.slug.current,
        name: slicemaster.name,
      },
    });
  });
};

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const ale = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await ale.json();

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
    actions.createNode({ ...beer, ...nodeMeta });
  }
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}

// Sourcing - putting data into gatsby

// Node - piece of data
