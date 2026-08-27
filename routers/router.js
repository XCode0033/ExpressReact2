import {Router} from 'express'
import { getHomesController } from '../controllers/homeController.js';
import { getGamesController } from '../controllers/gamesController.js';
import { getMoviesController } from '../controllers/moviesController.js';
import { getDreamsController } from '../controllers/dreamsController.js';
const router = Router();

router.get('/', getHomesController)
router.get('/games', getGamesController)
router.get('/movies', getMoviesController)
router.get('/dreams', getDreamsController)


export default router;