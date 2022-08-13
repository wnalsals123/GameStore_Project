import './App.css';
import Header from '../header/Header';
import GameFlex from './GameFlex';
import { useState } from "react"

function App() {
  const [cart, setCart] = useState(0)

  return (
    <div className='relactive'>
      <Header cart={cart}></Header>
      <GameFlex cart={cart} setCart={setCart}></GameFlex>
    </div>
  );
}

export default App;