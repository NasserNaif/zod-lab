import express from "express";
import { balanceRoute } from "./Router/balanceRouter";
import { movieRoute } from "./Router/movieRating";
import { studentRoute } from "./Router/studentRouter";
const app = express();
app.use(express.json());

app.use(`/movie`, movieRoute);

app.use(`/customer`, balanceRoute);

app.use(`/student`, studentRoute);

app.listen(5001);
