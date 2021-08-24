import express, { Application, Request, Response, NextFunction} from 'express';
import GetWordCount from './middleware/get-word-count';
import StoreURL from './middleware/save-url';
import GetAllURLS from './middleware/all-urls';

const connectDB = require('../configs/db');
const morgan = require('morgan');
const app: Application = express();
const PORT = process.env.PORT || 5000;
connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//gets object of word count from passed through url
app.get('/api/get-words/:url', GetWordCount, (req :Request, res: Response, next: NextFunction) => {
    res.send(res.locals.result);
});

//stores url into db
app.post('/api/store-url/:url', StoreURL, (req :Request, res: Response, next: NextFunction) => {
    res.send(res.locals.result);
});

//stores url into db
app.get('/api/all-urls', GetAllURLS, (req :Request, res: Response, next: NextFunction) => {
    res.send(res.locals.result);
});


app.listen(PORT, () => console.log('Server running on port ', PORT));