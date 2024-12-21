import express from "express";
import {
  getHighestRated,
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieStats,
  getMovieByGenre,
} from "./../controllers/moviesController.mjs";

const router = express.Router();

router.route("/highest-rated").get(getHighestRated, getAllMovies);
router.route("/movies").get(getAllMovies);
router
  .route("/movies/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);
router.route("/movies/stats").get(getMovieStats);
router.route("/movies/genre/:genre").get(getMovieByGenre);
router.route("/movies/create").post(createMovie);

export default router;
