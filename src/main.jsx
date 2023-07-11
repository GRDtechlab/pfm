import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App.jsx'
import './index.css';
import pfmStore from './store/pfm-store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
{/* Step 2: Provide store here created inside pfm-store.js file */}
    <Provider store={pfmStore} >
        <App />
    </Provider>
  </React.StrictMode>,
)
