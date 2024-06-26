import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer/>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();




