import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledSlicemastersListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const StyledSlicemaster = styled.div`
  a {
    text-decoration: none;
  }
  h2 {
    position: relative;
    z-index: 2;
    font-size: 4rem;
    margin-bottom: -2rem;
    text-align: center;
    transform: rotate(-2deg);
    &:hover {
      transform: rotate(2deg);
    }
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  .description {
    position: relative;
    z-index: 2;
    background: var(--yellow);
    margin: 2rem;
    margin-top: -6rem;
    padding: 1rem;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const Slicemaster = ({ slicemaster }) => (
  <StyledSlicemaster>
    <Link to={`/slicemasters/${slicemaster.slug.current}`}>
      <h2>
        <span className="mark">{slicemaster.name}</span>
      </h2>
    </Link>

    <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />

    <p className="description">
      <span>{slicemaster.description}</span>
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
