import React from "react";
import Overview from "./Components/overview/overview.jsx";
import Questions from "./Components/questions.jsx";
import Ratings from "./Components/ratings.jsx";
import RelatedItems from "./Components/relateditems.jsx";

function App () {
  
    return(
      <div className="App">
        <Overview />
        <RelatedItems />
        <Questions />
        <Ratings />
      </div>
    );
  
};

export default App;