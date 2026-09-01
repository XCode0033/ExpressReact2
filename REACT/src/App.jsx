import { Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import GamePage from './Pages/Games/GamePage'
import GameDetail from './Pages/Games/GameDetail';
import Homepage from './Pages/Homepage';
import MoviePage from './Pages/Movies/MoviePage';
import DreamPage from './Pages/Dreams/DreamPage';
import CrudPage from './Pages/CrudPage';
import { MoviesProvider } from './Context/MovieContext';
import BookPage from './Pages/Book/BookPage';
import BookDetail from './Pages/Book/BookDetail';
import OAuthLanding from './Pages/OAuthLanding';
import LoginPage from './Pages/LoginPage';
import DreamDetail from './Pages/Dreams/DreamDetail';
const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* ---------- */}

        <Route path="/games" element={<GamePage />} />
        <Route path='/games/:id' element={<GameDetail />} />

        {/* ---------- */}

        <Route path='/movies' element={
          <MoviesProvider>
            <MoviePage />
          </MoviesProvider>} />

          {/* ------- */}
        <Route path='/dreams' element={<DreamPage />} />
        <Route path='/dreams/:id' element={<DreamDetail />} />
        {/* ---------- */}

        <Route path='/crud' element={<CrudPage />} />

        {/* ---------- */}

        <Route path='/books' element={<BookPage />} />
        <Route path='/books/:id' element={<BookDetail />} />
        {/* ---------- */}

        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth' element={<OAuthLanding />} />
      </Routes>
    </>
  );
}

export default App;
