"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoute = void 0;
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const movieSchema_1 = require("../zodSchema/movieSchema");
exports.movieRoute = (0, express_1.default)();
let movieList = [];
movieList.push({
    id: "123",
    name: "avengere",
    genre: "action",
    duration: 190,
    rating: 3,
});
exports.movieRoute.get(`/`, (req, res) => {
    return res.json(movieList);
});
exports.movieRoute.get(`/search/:id`, (req, res) => {
    const { id } = req.params;
    const searchArr = movieList.filter((ser) => {
        if (ser.name === id || ser.genre === id) {
            return ser;
        }
    });
    return res.json(searchArr);
});
exports.movieRoute.post(`/`, (0, validate_1.default)(movieSchema_1.movieSchema), (req, res) => {
    const newMovie = req.body;
    movieList.push(newMovie);
    return res.json({
        message: "Movie Added !",
    });
});
exports.movieRoute.put(`/:id`, (0, validate_1.default)(movieSchema_1.movieSchema), (req, res) => {
    const { id } = req.params;
    const UpdatedObj = req.body;
    movieList.map((upd) => {
        if (upd.id === id || upd.name === id) {
            upd.id = UpdatedObj.id;
            upd.name = UpdatedObj.name;
            upd.genre = UpdatedObj.genre;
            upd.duration = UpdatedObj.duration;
            upd.rating = UpdatedObj.rating;
        }
        return res.json({
            message: "movie Updated !",
        });
    });
});
exports.movieRoute.delete(`/:id`, (req, res) => {
    const { id } = req.params;
    const newArr = movieList.filter((del) => {
        return del.id !== id && del.name !== id;
    });
    movieList = newArr;
    return res.json({
        message: "movie deleted !",
    });
});
