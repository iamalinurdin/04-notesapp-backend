import express from "express";
import router from "./routes.js";
import cors from "cors";

const app = express();
const port = 3000;
const host = "localhost";

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
