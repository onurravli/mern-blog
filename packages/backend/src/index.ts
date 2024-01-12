import express from "express";
import dotenv from "dotenv";
import { postsRouter } from "./routers";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server listening on ${port}.`);
});
