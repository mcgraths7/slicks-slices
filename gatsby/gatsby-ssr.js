import React from 'react';

import { OrderProvider } from './src/components/OrderContext';
import Layout from './src/components/layout/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
