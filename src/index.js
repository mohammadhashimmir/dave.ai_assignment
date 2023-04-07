import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";


const first=document.querySelector("#root")

const second=ReactDOM.createRoot(first);

second.render(<App/>)