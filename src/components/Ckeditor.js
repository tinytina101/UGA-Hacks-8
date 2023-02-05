import React, { Component, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

class Ckeditor extends Component {
  state = {
    text: "",
  };
  render() {
    return (
      <div className="App">
        <CKEditor
          editor={ClassicEditor}
          //data="<p>Hello from CKEditor 5!</p>"
          config={{ placeholder: "Start Travel Plans notes here..." }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            this.setState({
              text: data,
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <div>
          {
            localStorage.setItem("ck", this.state.text)

            /*
          <h1>COntext</h1>
          /**um can prob not use the parse... and directly return the html from database 
          <p>{parse(this.state.text)}</p>
          */
          }
        </div>
      </div>
    );
  }
}

export default Ckeditor;
