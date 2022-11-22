import express from "express";
import validate from "../middleware/validate";
import { movieSchema, movieType } from "../zodSchema/movieSchema";

export const movieRoute = express();

let movieList: movieType[] = [];

movieList.push({
  id: "123",
  name: "avengere",
  genre: "action",
  duration: 190,
  rating: 3,
});

// get Fync
movieRoute.get(`/`, (req, res) => {
  return res.json(movieList);
});

// search Func
movieRoute.get(`/search/:id`, (req, res) => {
  const { id } = req.params;

  const searchArr = movieList.filter((ser) => {
    if (ser.name === id || ser.genre === id) {
      return ser;
    }
  });

  return res.json(searchArr);
});

// Post
movieRoute.post(`/`, validate(movieSchema), (req, res) => {
  const newMovie = req.body as movieType;
  movieList.push(newMovie);

  return res.json({
    message: "Movie Added !",
  });
});

// update
movieRoute.put(`/:id`, validate(movieSchema), (req, res) => {
  const { id } = req.params;
  const UpdatedObj = req.body as movieType;

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

// delete
movieRoute.delete(`/:id`, (req, res) => {
  const { id } = req.params;

  const newArr = movieList.filter((del) => {
    return del.id !== id && del.name !== id;
  });

  movieList = newArr;

  return res.json({
    message: "movie deleted !",
  });
});
