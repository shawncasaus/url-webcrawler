"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const responseString = 'Hello World!!!';
const add = (num1, num2) => {
    return (num1 + num2);
};
app.get('/', (req, res, next) => {
    res.send(responseString);
});
app.listen(5000, () => console.log('Server Running'));
