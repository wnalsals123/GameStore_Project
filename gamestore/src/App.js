import './App.css';

function App() {
  return (
    <div className="bg-neutral-400 px-5 py-5">
      <nav className="relative max-w-7xl mx-auto">
        <img className="w-12 inline-block" src="https://cdn-icons-png.flaticon.com/512/686/686589.png" alt="logo"></img>
        <span className="pl-5 text-2xl align-middle sm:text-3xl">Game Store</span>
        <div className="hidden ml-10 inline-block sm:inline-block">
          <a className="ml-5 text-lg" href="#!">특별 할인</a>
          <a className="ml-5 text-lg" href="#!">신작</a>
          <a className="ml-5 text-lg" href="#!">커뮤니티</a>
        </div>
        <div className="absolute top-1 right-0">
          <a className="ml-6" href="#!cart"><img className="w-10 inline-block" src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="cart"></img></a>
          <a className="ml-6" href="#!user"><img className="w-10 inline-block" src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1660047106~hmac=959f21fbd63be4f9c154601d4e5a2359" alt="user"></img></a>
        </div>
      </nav>
    </div>
  );
}

export default App;