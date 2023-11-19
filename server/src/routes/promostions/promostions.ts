import express from "express";
import {
  addColumn,
  deleteColum,
  fetchDataFromPromotionsCollection,
  mongoConnect,
  mongoDisconnect,
  updatePromotionDocument,
} from "../../services/mongodb.service";
import { MongoClient } from "mongodb";
import { UpdatePromotionRecord } from "../../consts/types";
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
  let connection: MongoClient;
  try {
    const validInput = UpdatePromotionRecord.validate(req.body);
    if (!validInput.success) {
      throw new Error("Invalid input");
    }
    const { _id, genericColumns } = req.body;
    const updateDocument = {
      _id,
      genericColumns,
    };
    connection = await mongoConnect();
    await updatePromotionDocument(connection, updateDocument);
    res.send("Updated promotion successfully");
  } catch (error) {
    if (error.message === "Invalid input") {
      res.status(400).send("Invalid input");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } finally {
    await mongoDisconnect(connection);
  }
});

promotionsRouter.post("/add-column", async (req, res) => {
  const { columnName, columnValue } = req.body;
  let connection: MongoClient;
  try {
    connection = await mongoConnect();
    await addColumn(connection, columnName, columnValue);
    res.send("Column added");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoDisconnect(connection);
  }
});

promotionsRouter.post("/delete-column", async (req, res) => {
  const { columnName } = req.body;
  let connection: MongoClient;
  try {
    connection = await mongoConnect();
    await deleteColum(connection, columnName);
    res.send("Column deleted");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await mongoDisconnect(connection);
  }
});
