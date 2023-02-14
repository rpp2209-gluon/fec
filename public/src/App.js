import React, { useState } from "react";
import Overview from "./Components/overview/overview.jsx";
import QuestionAnswer from "./Components/QuestionAnswer/QuestionAnswer.jsx";
import Ratings from "./Components/ratings.jsx";
import RelatedItems from "./Components/relateditems/relateditems.jsx";

function App () {
    return(
      <div className="App">
        <Overview currentProductId={window.location.pathname.slice(1)}/>
        <RelatedItems currentProductId={window.location.pathname.slice(1)}/>
        <QuestionAnswer currentProductId={window.location.pathname.slice(1)}/>
        <Ratings currentProductId={window.location.pathname.slice(1)}/>
      </div>
    );

};

export default App;