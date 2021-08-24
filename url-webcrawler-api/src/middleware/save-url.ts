import { Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
const { v4: uuidv4 } = require('uuid');
const URL = require('../models/Url');

//creates url object for storage in db
const getUrlObject = (url: string): object => {
    return {
        id: uuidv4(),
        url: url,
        createdAt: Date.now()
    };
}

//stores url in db
const StoreURL = async (req :Request, res: Response, next: NextFunction) => {
    const url: string = req.params.url;
    const enhancedURL: string = url.replace(/\@/, '/');
    var expression: RegExp = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

    if (!expression.test(enhancedURL)) {
        res.status(500);
        res.send({error: 'Error: invalid url'});
        next();
    } else {
        const urlObject: object = getUrlObject(enhancedURL);

        try {
            let thisUrl: string = await URL.findOne({url: enhancedURL});

            if (thisUrl) {
                res.status(200);
                res.locals.result = `${enhancedURL} is already in the db.`;
            } else {
                thisUrl = URL.create(urlObject);
                res.status(200);
                res.locals.result = `${enhancedURL} was successfully added to the db`;
            }
        } catch (err) {
            res.status(500);
            res.send({err: 'oops... something went wrong'});
        }
        next();
    }
}

export default StoreURL;