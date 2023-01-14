import React from "react";
import ProductList from "./productlist.jsx";
import YourOutfitList from "./youroutfitlist.jsx";

function RelatedItems () {
  return (
    <div>
      <h1>Related Items Section</h1>
    <div>
      <ProductList />
      <YourOutfitList />
    </div>
    </div>
  )
};

export default RelatedItems;