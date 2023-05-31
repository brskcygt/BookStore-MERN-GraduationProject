import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div class="book">
        <div class="book__pg-shadow"></div>
        <div class="book__pg"></div>
        <div class="book__pg book__pg--2"></div>
        <div class="book__pg book__pg--3"></div>
        <div class="book__pg book__pg--4"></div>
        <div class="book__pg book__pg--5"></div>
      </div>
    </div>
  );
}

export default Loading;
