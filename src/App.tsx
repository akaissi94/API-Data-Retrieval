import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Search from "./Components/Search";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header name="Google Books API Data Retrieval"></Header>
      </header>
      <div className="App-main">
        <Search />
      </div>
    </div>
  );
};

export default App;
