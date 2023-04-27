import ReactDOM from 'react-dom/client';
import React from 'react';
import Router from './routers/router';
import './styles/global.css';

/**
 * @desc 把reactelements元素挂載到類名為root的dom上
 */
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Router/></React.StrictMode>);
