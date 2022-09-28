import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Components/Homepage';
import MovieDetails from './Components/MovieDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/movies/:id' element={<MovieDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
