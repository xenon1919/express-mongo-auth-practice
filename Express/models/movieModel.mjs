import mongoose from "mongoose";
import fs from "fs";
import validator from "validator";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required field!"],
      unique: true,
      maxlength: [100, "Movie name must not have more than 100 characters"],
      minlength: [4, "Movie name must have at least 4 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required field!"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required field!"],
    },
    ratings: {
      type: Number,
      validate: {
        validator(value) {
          return value >= 1 && value <= 10;
        },
        message: "Ratings ({VALUE}) should be above 1 and below 10",
      },
    },
    totalRating: {
      type: Number,
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required field!"],
    },
    releaseDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    genres: {
      type: [String],
      required: [true, "Genres is required field!"],
    },
    directors: {
      type: [String],
      required: [true, "Directors is required field!"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required field!"],
    },
    actors: {
      type: [String],
      required: [true, "Actors are required field!"],
    },
    price: {
      type: Number,
      required: [true, "Price is required field!"],
    },
    createdBy: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Field for duration in hours
movieSchema.virtual("durationInHours").get(function () {
  return this.duration / 60;
});

// Pre-save middleware
movieSchema.pre("save", function (next) {
  this.createdBy = "MANOJJHA";
  next();
});

// Post-save middleware
movieSchema.post("save", function (doc, next) {
  const content = `A new movie document with name ${doc.name} has been created by ${doc.createdBy}\n`;
  fs.writeFileSync("./Log/log.txt", content, { flag: "a" }, (err) => {
    if (err) console.log(err.message);
  });
  next();
});

// Pre-find middleware
movieSchema.pre(/^find/, function (next) {
  this.find({ releaseDate: { $lte: Date.now() } });
  this.startTime = Date.now();
  next();
});

// Post-find middleware
movieSchema.post(/^find/, function (docs, next) {
  this.find({ releaseDate: { $lte: Date.now() } });
  this.endTime = Date.now();

  const content = `Query took ${
    this.endTime - this.startTime
  } milliseconds to fetch the documents.`;
  fs.writeFileSync("./Log/log.txt", content, { flag: "a" }, (err) => {
    if (err) console.log(err.message);
  });

  next();
});

// Pre-aggregate middleware
movieSchema.pre("aggregate", function (next) {
  console.log(
    this.pipeline().unshift({ $match: { releaseDate: { $lte: new Date() } } })
  );
  next();
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
