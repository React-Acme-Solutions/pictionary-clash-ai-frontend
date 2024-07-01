// App.jsx
import React from "react";
import FrontPage from "./components/Front/Front-Page";
import "./styles/global-styles.scss";
import DrawingCanvas from "./drawingCanvas";

const App = () => {
  return (
    <div className="app">
        <h1>TEAL KINGDOM</h1>
      {/*<FrontPage />*/}
        {/*integrate additional component here as needed*/}
        {/*This is our entry point*/}
        <DrawingCanvas/>
    </div>
  );
};

export default App;
