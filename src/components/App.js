import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import CreatePlan from "./CreatePlan";
import Link2 from "./Link2";
import { Route, Routes } from "react-router-dom";
import Ckeditor from "./Ckeditor";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePlan" element={<CreatePlan />} />
        <Route path="/Link2" element={<Link2 />} />
      </Routes>
    </div>
  );
}

export default App;
