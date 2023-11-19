import React from "react";
import Logo from "./components/Logo";
import "./App.css";
import { PromotionsTable } from "./components/promotions/PromotionsTable";

const App = () => {
  return (
    <div className="App">
      <Logo />
      <PromotionsTable />
    </div>
  );
};

export default App;
