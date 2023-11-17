import React from "react";
import Logo from "./components/Logo";
import { PromotionsTable } from "./components/PromotionsTable";
import "./App.css";
import { InfiniteScrollTable } from "./components/PromostionsTableV2";

const App = () => {
  return (
    <div className="App">
      <Logo />
      <InfiniteScrollTable />
      {/*<PromotionsTable />*/}
    </div>
  );
};

export default App;
