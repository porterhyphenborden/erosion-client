import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './components/App/App';
import { ErosionContextProvider } from './ErosionContext'
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <ErosionContextProvider>
            <App />
        </ErosionContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
