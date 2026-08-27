import {Router} from 'express'
import { getHomesController } from '../controllers/homeController.js';
import { deleteGamesController, getGamesController, postGameController } from '../controllers/gamesController.js';
import { deleteMoviesController, getMoviesController, postMoviesController } from '../controllers/moviesController.js';
import { deleteDreamController, getDreamsController, postDreamController} from '../controllers/dreamsController.js';

const router = Router();

router.get('/', getHomesController)
router.get('/games', getGamesController)
router.get('/movies', getMoviesController)
router.get('/dreams', getDreamsController)


// ----------------

router.post('/dreams', postDreamController)
router.post('/games', postGameController)
router.post('/movies', postMoviesController)

// ----------------
router.delete('/dreams/:id', deleteDreamController)
router.delete('/games/:id', deleteGamesController)
router.delete('/movies/:id', deleteMoviesController)

export default router;