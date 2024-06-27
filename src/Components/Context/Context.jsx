import React, { createContext, useContext, useState } from "react";

export const productIdContext = createContext();

export const useProductId = () => {
  return useContext(productIdContext);
};

export const ProductIdProvider = ({ children }) => {
  const [productIds, setProductId] = useState(null);
  const [priceInfo, setPriceInfo] = useState({ cartTotal: 0, gst: 0 });
  const [cartProductIDs, setCartProductIDs] = useState([]);

  const addProductId = (newId) => {
    setProductId(newId);
    console.log(productIds);
  };
  const updatePrice = (newCartTotal, newGst) => {
    setPriceInfo({ cartTotal: newCartTotal, gst: newGst });
  };
  const addCartProductIDs = (newId) => {
    setCartProductIDs(newId);
  };
  return (
    <productIdContext.Provider
      value={{
        productIds,
        addProductId,
        priceInfo,
        updatePrice,
        cartProductIDs,
        addCartProductIDs,
      }}
    >
      {children}
    </productIdContext.Provider>
  );
};
