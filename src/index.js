import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import KakaoAdfit from './component/KakoAdfit';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <App />
      <KakaoAdfit style={{position:'relative',bottom:'0'}}/>
    </BrowserRouter>
);

