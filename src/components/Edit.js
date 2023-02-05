import React, { Component } from "react";
import { BrowserRouter as router, Route, Router } from "react-router-dom";
import Ckeditor from "./Ckeditor";

import GMap2 from "./GMap2";
import { getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Edit() {
  return (
    <div>
      <input className="title" placeholder="Title..."></input>
      {<Ckeditor />}
      <h2 className="create_map_border">MAP</h2>
      <GMap2 />
    </div>
  );
}
