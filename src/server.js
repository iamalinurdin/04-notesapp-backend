import server from "./server/index.js";
import process from "process";

const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
