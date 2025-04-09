import React from "react";
import CarOptions from "./CarOptions";
import LinkScraper from "./LinkScraper";
import { BrowserRouter, Route , Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LinkScraper />}/>
          <Route path="/details" element={<CarOptions />}/>
        </Routes>
      </BrowserRouter>
      {/* <LinkScraper /> */}
    </div>
  );
}

export default App;
