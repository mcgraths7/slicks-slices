import React from 'react';
import { graphql } from 'gatsby';

import SlicemasterList from '../components/SlicemasterList';

const SliceMasters = ({ data: { slicemasters } }) => (
  <SlicemasterList slicemasters={slicemasters.nodes} />
);

export default SliceMasters;

export const pageQuery = graphql`
  query {
    slicemasters: allSanityPerson {
      nodes {
        id
        name
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
    }
  }
`;
