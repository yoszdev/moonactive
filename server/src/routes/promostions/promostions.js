"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_service_1 = require("../../services/mongodb.service");
exports.promotionsRouter = express_1.default.Router();
exports.promotionsRouter.post("/promotions", async (req, res) => {
    const { pageNumber, limit } = req.body;
    try {
        const connection = await (0, mongodb_service_1.mongoConnect)();
        const promotions = await (0, mongodb_service_1.fetchDataFromPromotionsCollection)(connection, {
            pageNumber,
            limit,
        });
        res.send(promotions);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.promotionsRouter.post("/update-promotion", async (req, res) => {
    const { _id, genericColumns } = req.body;
    console.log("complexObjectToUpdate", genericColumns);
    console.log("_id", _id);
    const updateDocument = {
        _id,
        genericColumns,
    };
    let connection;
    try {
        connection = await (0, mongodb_service_1.mongoConnect)();
        await (0, mongodb_service_1.updatePromotionDocument)(connection, updateDocument);
        res.send("dddd");
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
    finally {
        await (0, mongodb_service_1.mongoDisconnect)(connection);
    }
});
//# sourceMappingURL=promostions.js.map