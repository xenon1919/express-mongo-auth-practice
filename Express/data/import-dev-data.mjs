import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Movie from "../models/movieModel.mjs";

dotenv.config({ path: "./config.env" });

//Connect to MongoDB
mongoose
  .connect(process.env.CONN_STR)
  .then((conn) => {
    console.log("DB Connection Successful");
  })
  .catch((error) => {
    console.log("Some error has occurred");
  });

//Read movies.json file
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf8"));

//Delete existing move documents from the collection
const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Movies deleted");
  } catch (err) {
    console.log("Error deleting movies");
  }
};

const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Movies imported");
  } catch (err) {
    console.log("Error importing movies");
  }
  process.exit();
};

if (process.argv[2] === "--delete") {
  deleteMovies();
} else if (process.argv[2] === "--import") {
  importMovies();
} else {
  console.log("Please specify an action: --delete or --import");
}
