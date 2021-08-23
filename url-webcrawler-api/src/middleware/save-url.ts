import { Request, Response, NextFunction} from 'express';

async function StoreURL (req :Request, res: Response, next: NextFunction) {
    const url: string = req.params.url;
    const enhancedURL: string = url.replace(/\@/, '/');
    var expression: RegExp = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

    if (!expression.test(enhancedURL)) {
        res.status(500);
        res.send({error: 'Error: invalid url'});
        next();
    } else {
        res.locals.result = enhancedURL;
        next();
    }
}

export default StoreURL;