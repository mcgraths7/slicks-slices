import React, { useState } from 'react';

// Create order context

const OrderContext = React.createContext();

export default function OrderProvider({ children }) {
  const [order, setOrder] = useState('Poop');
  return <OrderContext.Provider>{children}</OrderContext.Provider>;
}
