import React, { Component } from "react";
import { BrowserRouter as router, Route, Router } from "react-router-dom";
import Ckeditor from "./Ckeditor";

import GMap from "./GMap";

export default function CreatePlan() {
  const saveTitleToLocal = (e) => {
    localStorage.setItem("title", e.target.value);
  };
  return (
    <div>
      <input
        className="title"
        placeholder="Title..."
        onChange={saveTitleToLocal}
      ></input>
      {<Ckeditor />}
      <h2 className="create_map_border">MAP</h2>
      <GMap />
    </div>
  );
}
