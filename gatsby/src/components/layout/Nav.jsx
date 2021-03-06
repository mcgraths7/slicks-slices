import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const StyledNav = styled.nav`
  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    margin-top: -6rem;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }

  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1.2deg;
      &:hover {
        --rotate: -1.2deg;
      }
    }
    &:nth-child(2) {
      --rotate: -2.2deg;
      &:hover {
        --rotate: 2.2deg;
      }
    }
    &:nth-child(4) {
      --rotate: 2.2deg;
      &:hover {
        --rotate: -2.2deg;
      }
    }
    &:hover {
      --rotate: 2deg;
    }
  }
  a {
    display: block;
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
    &[aria-current='page'] {
      color: var(--red);
    }
  }
  @media (max-width: 768px) {
    --cols: 4;
    margin-bottom: 2rem;
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--cols), 1fr);
      justify-items: center;
      height: auto;
    }
    .logo-item {
      order: 0;
      grid-column: 1 / -1;
      transform: translateY(20%);
    }
  }
  @media (max-width: 440px) {
    --cols: 2;
    font-size: 1.2rem;
  }
`;

const Nav = () => (
  <StyledNav>
    <ul>
      <li>
        <Link to="/">Slick's Home</Link>
      </li>
      <li>
        <Link to="/pizza">Pizza</Link>
      </li>
      <li className="logo-item">
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slicemasters">Slicemasters</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead!</Link>
      </li>
    </ul>
  </StyledNav>
);

export default Nav;
