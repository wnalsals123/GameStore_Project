import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './main/App';
import ItemDetail from './modal/ItemDetail';
import Login from './modal/Login';
import SignUp from './modal/SignUp';
import Cart from './modal/Cart';
import MyPage from './modal/MyPage';
import Community from './community/Community';
import NotFound from './etc/NotFound'
import NotFoundGame from './etc/NotFoundGame'
import reportWebVitals from './test/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="games/:gameid" element={<ItemDetail />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="singup" element={<SignUp />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="mypage" element={<MyPage />}></Route>
        </Route>
        <Route path="community" element={<Community />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="games/NotFound" element={<NotFoundGame />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();