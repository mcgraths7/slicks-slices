import React from 'react';
import { Link } from 'gatsby';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Slick' Home</Link>
      </li>
      <li>
        <Link to="/pizza">Pizza</Link>
      </li>
      <li>
        <Link to="/">LOGO</Link>
      </li>
      <li>
        <Link to="/slicemasters">Slicemasters</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead!</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
