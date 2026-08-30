import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import GamePage from './Pages/GamePage'
import Homepage from './Pages/Homepage';
import MoviePage from './Pages/MoviePage';
import DreamPage from './Pages/DreamPage';
import CrudPage from './Pages/CrudPage';
import { MoviesProvider } from './Context/MovieContext';
import BookPage from './Pages/BookPage';
import OAuthLanding from './Pages/OAuthLanding';
import LoginPage from './Pages/LoginPage';
const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/games" element={<GamePage />} />

        <Route path='/movies' element={
          <MoviesProvider>
            <MoviePage />
          </MoviesProvider>} />

        <Route path='/dreams' element={<DreamPage />} />
        <Route path='/crud' element={<CrudPage />} />
        <Route path='/books' element={<BookPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth' element={<OAuthLanding />} />
      </Routes>
    </>
  );
}

export default App;
