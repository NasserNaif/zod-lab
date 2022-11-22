"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balanceRouter_1 = require("./Router/balanceRouter");
const movieRating_1 = require("./Router/movieRating");
const studentRouter_1 = require("./Router/studentRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(`/movie`, movieRating_1.movieRoute);
app.use(`/customer`, balanceRouter_1.balanceRoute);
app.use(`/student`, studentRouter_1.studentRoute);
app.listen(5001);
