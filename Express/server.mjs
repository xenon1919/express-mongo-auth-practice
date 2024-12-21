import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.mjs";

dotenv.config({ path: "./config.env" });

console.log(process.env);

mongoose
  .connect(process.env.CONN_STR)
  .then((conn) => {
    console.log("DB Connection Successful");
  })
  .catch((error) => {
    console.log("Some error has occurred");
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server has started...");
});
