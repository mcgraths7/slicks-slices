import React from 'react';

import SEO from '../components/SEO';

const OrderPage = () => (
  <>
    <SEO title="Order Ahead" description="The orders page" />
    <form>
      <fieldset>
        <legend>Your info</legend>
      </fieldset>
      <fieldset>
        <legend>Menu</legend>
      </fieldset>
    </form>
  </>
);

export default OrderPage;
