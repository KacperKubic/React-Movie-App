import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';
import Watched from './Components/Watched';
import ToWatch from './Components/ToWatch';
import Favourite from './Components/Favourite';
import MovieDetails from './Components/MovieDetails';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/movies/:id' element={<MovieDetails/>}/>
          <Route path='/watched' element={<Watched/>}/>
          <Route path='/toWatch' element={<ToWatch/>}/>
          <Route path='/favourite' element={<Favourite/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
