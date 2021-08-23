import express, { Application, Request, Response, NextFunction} from 'express';
import path from 'path';
import moment from 'moment';
import GetWordCount from './middleware/get-word-count';
import StoreURL from './middleware/save-url'

const app: Application = express();
const PORT = process.env.PORT || 5000;

//gets object of word count from passed through url
app.get('/api/get-words/:url', GetWordCount, (req :Request, res: Response, next: NextFunction) => {
    res.send(res.locals.result);
});

//stores url into db
app.post('/api/store-url/:url', StoreURL, (req :Request, res: Response, next: NextFunction) => {
    res.send(res.locals.result);
});

//stores url into db
app.get('/api/all-urls', (req :Request, res: Response, next: NextFunction) => {
    res.send({urls: 'urls'});
});


app.listen(PORT, () => console.log('Server running on port ', PORT));