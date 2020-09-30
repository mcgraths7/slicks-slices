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
  // TODO
  // 1. Query all slicemasters
  // 2. Turn each into a page
  // 3. figure out how many pages based on number of sm per page
  // 4. Loop from 1-n and create pages
  // 5. Paginate
  const SlicemasterTemplate = path.resolve('./src/pages/slicemasters.jsx');
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
  console.log(
    `There are ${data.slicemasters.totalCount} people across ${pageCount} pages with ${pageSize} per page`
  );
  Array.from({ length: pageCount }).forEach((_, idx) => {
    console.log(`Creating page ${idx + 1}`);
    actions.createPage({
      path: `slicemasters/${idx + 1}`,
      component: SlicemasterTemplate,
      context: {
        skip: idx * pageSize,
        currentPage: idx + 1,
        pageSize,
        pageCount,
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
