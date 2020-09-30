import React from 'react';
import { graphql } from 'gatsby';

import SlicemasterList from '../components/SlicemasterList';

const SliceMasters = ({ data }) => {
  console.log(data);
  return <SlicemasterList slicemasters={data.slicemasters.nodes} />;
};

export default SliceMasters;

export const pageQuery = graphql`
  query($skip: Int = 0, $pageSize: Int = 3) {
    slicemasters: allSanityPerson(skip: $skip, limit: $pageSize) {
      totalCount
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
