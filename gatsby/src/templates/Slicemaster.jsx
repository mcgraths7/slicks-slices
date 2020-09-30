import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto - fill, minmax(400px, 1fr));
`;

const SingleSlicemasterPage = ({ data: { slicemaster } }) => {
  const { name, image, description } = slicemaster;
  return (
    <SlicemasterGrid>
      <Img fluid={image.asset.fluid} alt={name} />
      <div>
        <h2 className="mark">{name}</h2>
        <p>{description}</p>
      </div>
    </SlicemasterGrid>
  );
};

export default SingleSlicemasterPage;

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
