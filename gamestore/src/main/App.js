import './App.css';
import Header from '../header/Header';
import GameFlex from './GameFlex';
import ItemDetail from '../modal/ItemDetail';
import { useState } from "react"

function App() {
  const [cart, setCart] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='relactive'>
      <Header cart={cart}></Header>
      <GameFlex cart={cart} setCart={setCart} setModalOpen={setModalOpen}></GameFlex>
      {modalOpen && <ItemDetail cart={cart} setCart={setCart} setModalOpen={setModalOpen}></ItemDetail>}
    </div>
  );
}

export default App;