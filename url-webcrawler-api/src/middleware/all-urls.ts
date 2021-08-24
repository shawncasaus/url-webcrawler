import { Request, Response, NextFunction} from 'express';
const URL = require('../models/Url');

//gets urls from db
const GetAllURLS = async (req :Request, res: Response, next: NextFunction) => {
    let urls: any = {};

    await URL.find({}, (err: any, url: any) => {
        urls[url.id] = url;
    });

    res.locals.result = urls;
    next();
}

export default GetAllURLS;