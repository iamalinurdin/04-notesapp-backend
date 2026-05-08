import express from "express";
import router from "./routes.js";
import cors from "cors";
import process from "process";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

app.use(
  cors({
    origin: true,
  }),
);
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
