import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import SlicemasterList from '../components/SlicemasterList';
import Pagination from '../components/Pagination';

const SliceMasters = ({ data, pageContext }) => {
  const { pageSize, currentPage } = pageContext;
  const { totalCount } = data.slicemasters;
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <Helmet>
        <title>Slick's | Slicemasters</title>
      </Helmet>
      <Pagination
        pageSize={
          pageSize || parseInt(process.env.GATSBY_SLICEMASTERS_PER_PAGE, 10)
        }
        currentPage={currentPage || 1}
        totalCount={totalCount}
        base="/slicemasters"
      />
      <SlicemasterList slicemasters={slicemasters} />
    </>
  );
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
