import express from 'express'
import router from './routers/router.js';
const PORT = 3000

const app = express();





app.use('/api', router)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/api`)
})