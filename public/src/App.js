import React, { useState } from "react";
import Overview from "./Components/overview/overview.jsx";
import Questions from "./Components/questions.jsx";
import Ratings from "./Components/ratings.jsx";
import RelatedItems from "./Components/relateditems/relateditems.jsx";

function App () {
  const [currentProduct, setCurrentProduct] = useState({"id":71697,"campus":"hr-rpp","name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00","created_at":"2022-05-11T19:38:15.373Z","updated_at":"2022-05-11T19:38:15.373Z"})

    return(
      <div className="App">
        <Overview />
        <RelatedItems currentProduct={currentProduct}/>
        <Questions />
        <Ratings />
      </div>
    );

};

export default App;