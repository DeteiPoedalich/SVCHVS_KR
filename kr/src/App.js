import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/Homepage/HomePage.jsx'
import Heroes from './Pages/Heroes/Heroes.jsx';
import Items from './Pages/Items/Items.jsx';
import Hero from './Pages/Hero/Hero.jsx'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/heroes" element={<Heroes/>} />
          <Route path="/items" element={<Items/>} />
          <Route path="/teams" element={<HomePage/>} />
          <Route path="/hero/:HeroId" element={<Hero/>} />
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
