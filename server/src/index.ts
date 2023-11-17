import express, { json } from "express";
import cors from "cors";
import "dotenv/config";

const app: express.Application = express();
const port = process.env.PORT || 8000;

import { promotionsRouter } from "./routes/promostions/promostions";
app.use(json());
app.use(cors());
app.use("/api", promotionsRouter);

//todo health check
// app.get("/", async (req: express.Request, res: express.Response) => {
//   const connection = await mongoConnect();
//   await fetchDataFromPromotionsCollection(connection, {
//     pageNumber: 1,
//     limit: 20,
//   });
//   res.send("Welcome to Express & TypeScript Server");
// });

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});
