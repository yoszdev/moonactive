import express, { json } from "express";
import cors from "cors";
import "dotenv/config";

const app: express.Application = express();
const port = process.env.PORT || 8000;

import { promotionsRouter } from "./routes/promostions/promostions";
app.use(json());
app.use(cors());
app.use("/api", promotionsRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});
