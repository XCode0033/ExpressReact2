import {Routes, Route, Link, Navigate} from 'react-router-dom'
import GamePage from './Pages/GamePage'
import Homepage from './Pages/Homepage';
import MoviePage from './Pages/MoviePage';
import DreamPage from './Pages/DreamPage';

const App = () => {
  return ( 
    <>
    
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/games" element={<GamePage />} />
      <Route path='/movies' element={<MoviePage />} />
      <Route path='/dreams' element={<DreamPage />} />
    </Routes>
    </>

   );
}
 
export default App;