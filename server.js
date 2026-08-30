import express from 'express'
import router from './routers/router.js';
import bodyParser from 'body-parser';
import passport from './config/passport.js';
const PORT = 3000

const app = express();
app.use(express.json())
app.use(passport.initialize())



app.use('/api', router)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api`)
})