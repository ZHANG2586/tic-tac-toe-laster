import ReactDOM from "react-dom/client";
import React from "react";
import Router from "./routers/router";
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Router/></React.StrictMode>)