import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledSlicemastersListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto 500px auto;
`;

const StyledSlicemaster = styled.div`
  position: relative;
  h2,
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  h2 {
    position: relative;
    margin-bottom: -2rem;
    z-index: 2;
  }
  p {
    position: relative;
    z-index: 2;
    margin-top: -4rem;
    padding: 1rem;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
`;

const Slicemaster = ({ slicemaster }) => (
  <StyledSlicemaster>
    <Link to={`/slicemasters/${slicemaster.slug.current}`}>
      <h2 className="center">
        <span className="mark">{slicemaster.name}</span>
      </h2>
    </Link>

    <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />

    <p className="center">
      <span className="mark">{slicemaster.description}</span>
    </p>
  </StyledSlicemaster>
);

const SlicemasterList = ({ slicemasters }) => {
  const renderedSlicemasters = () =>
    slicemasters.map((slicemaster) => (
      <Slicemaster key={slicemaster.id} slicemaster={slicemaster} />
    ));
  return (
    <StyledSlicemastersListGrid>
      {renderedSlicemasters()}
    </StyledSlicemastersListGrid>
  );
};

export default SlicemasterList;
