import { Request, Response, NextFunction} from 'express';
import axios from 'axios';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

//retrieves dom content from url
const fetchUrlContent = (url: string): Promise<string>  => {
    return axios.get('http://' + url)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
        return 'error';
    });
}

//cleans content to get as close to pure text from body of dom
const clean = (body: string): string => {
    const dom: any = new JSDOM(body);
    const innerText: string = dom.window.document.querySelector("body").textContent;
    const quotes: string = innerText.replace(/"((?:\\.|[^"\\])*)"/g, "").trim();
    const curlyBraces: string = quotes.replace(/{([^}]+)}/g, "").trim();
    const symbols: string =  curlyBraces.replace(/ *\([^)]*\) */g, "").trim();
    const alphabet: string = symbols.replace(/[^A-Za-z']+/g, " ").trim();
    const lowerCase: string = alphabet.toLowerCase();
    return lowerCase;
}

//cleans text for url's ending with .txt
const cleanTxt = (body: string): string => {
    const alphabet: string = body.replace(/[^A-Za-z']+/g, " ").trim();
    const lowerCase: string = alphabet.toLowerCase();
    return lowerCase;
}

//counts words and removes unecessary words greater that a length of 20
//-these words are usually  left over variable names and class names
const count = (cleanBody: string): Array<object> => {
    let map: any = {};

    const words: Array<string> = cleanBody.split(" ").filter(word => word !== "");

    for (let i = 0; i < words.length; i++) {
        const item: string = words[i];
        if (item.length <= 20) 
            map[item] = (map[item] + 1) || 1
    }

    return map;
}


//middleware that grabs the url input from the request and sets the response to an object of words with their count
async function GetWordCount (req :Request, res: Response, next: NextFunction) {
    const url: string = req.params.url;
    const enhancedURL: string = url.replace(/\@/, '/');
    var expression: RegExp = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

    if (!expression.test(enhancedURL)) {
        res.status(500);
        res.send({error: 'Error: invalid url'});
        next();
    } else {
        const content: string = await fetchUrlContent(enhancedURL);
        if (content === 'error') {
            res.locals.result = 'Error, something went wrong!'
        } else {
            const isTxt = (enhancedURL.slice(-4) !== '.txt');
            const cleanedContent: string = (isTxt) ? clean(content) : cleanTxt(content);
            const result: object = count(cleanedContent);
            res.locals.result = result; //response passed to next step in api process
        }
        next();
    }
}

export default GetWordCount;