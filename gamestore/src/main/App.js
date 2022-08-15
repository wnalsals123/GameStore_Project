import './App.css';
import Header from '../header/Header';
import GameFlex from './GameFlex';
import { useEffect, useState } from "react"
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState(0)
  const location = useLocation()

  useEffect(()=>{
    location.pathname === '/' && (document.body.style.overflow = 'auto')
  }, [location])
  
  return (
    <div className='relactive'>
      <Header cart={cart}></Header>
      <GameFlex cart={cart} setCart={setCart}></GameFlex>
      <Outlet context={[cart, setCart]}></Outlet>
    </div>
  );
}

export default App;