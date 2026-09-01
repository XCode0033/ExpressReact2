import {Router} from 'express'
import { getHomesController } from '../controllers/homeController.js';
import { deleteGamesController, getGamesController, postGameController,findGameById } from '../controllers/gamesController.js';
import { deleteMoviesController, getMoviesController, postMoviesController, findMovieById } from '../controllers/moviesController.js';
import { deleteDreamController, getDreamsController, postDreamController, findDreamById} from '../controllers/dreamsController.js';
import { deleteBooks, getBooks, getBookById, postBooks } from '../controllers/bookController.js';
import { login, registerUser } from '../controllers/usersController.js';
import {requireAuth} from '../middleware/verifyAuth.js'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'
const router = Router();

router.get('/', getHomesController)
router.get('/games', getGamesController)
router.get('/movies', getMoviesController)
router.get('/dreams', getDreamsController)
router.get('/books', getBooks)
router.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
)
router.get('/auth/google/callback',
    passport.authenticate('google', {session: false, failureRedirect: 'http://localhost:5173/login'}),

    (req, res) => {
        const token = jwt.sign({id: req.user.id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.redirect(`http://localhost:5173/oauth?token=${token}`)
    }
)

router.get('/me', requireAuth, (req, res) => {
    res.json({user: req.user}) 
})


// ----------------
router.get('/dreams/:id', findDreamById)
router.get('/movies/:id', findMovieById)
router.get('/books/:id', getBookById)
router.get('/games/:id', findGameById)
// ----------------

router.post('/dreams', requireAuth, postDreamController)
router.post('/games',requireAuth , postGameController)
router.post('/movies', requireAuth ,postMoviesController)
router.post('/books', requireAuth ,postBooks)

// ----------------
router.post('/users/register', registerUser)
router.post('/users/login' ,login)

// ----------------
router.delete('/dreams/:id', requireAuth, deleteDreamController)
router.delete('/games/:id', requireAuth, deleteGamesController)
router.delete('/movies/:id', requireAuth, deleteMoviesController)
router.delete('/books/:id', requireAuth, deleteBooks)
export default router;