import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import Heroes from './Pages/Heroes.jsx';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/heroes" element={<Heroes/>} />
          <Route path="/items" element={<HomePage/>} />
          <Route path="/teams" element={<HomePage/>} />
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
