import express from "express";
import {
  fetchDataFromPromotionsCollection,
  mongoConnect,
  mongoDisconnect,
  updatePromotionDocument,
} from "../../services/mongodb.service";
import { MongoClient } from "mongodb";
export const promotionsRouter = express.Router();

promotionsRouter.post("/promotions", async (req, res) => {
  const { pageNumber, limit } = req.body;
  try {
    const connection: MongoClient = await mongoConnect();
    const promotions = await fetchDataFromPromotionsCollection(connection, {
      pageNumber,
      limit,
    });
    res.send(promotions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

promotionsRouter.post("/update-promotion", async (req, res) => {
  const { _id, genericColumns } = req.body;
  console.log("complexObjectToUpdate", genericColumns); // [{key, value}]
  console.log("_id", _id); // [{key, value}]

  //todo pass in runType
  const updateDocument = {
    _id,
    genericColumns,
  };
  let connection: MongoClient;
  try {
    connection = await mongoConnect();
    await updatePromotionDocument(connection, updateDocument);
    res.send("dddd");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoDisconnect(connection);
  }
});
