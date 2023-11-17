"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotionDocument = exports.fetchDataFromPromotionsCollection = exports.mongoDisconnect = exports.mongoConnect = exports.DB_SCHEMA = exports.PROMOTIONS_COLLECTION = void 0;
const mongodb_1 = require("mongodb");
const connectionString = process.env.MONGO_URI || "";
const client = new mongodb_1.MongoClient(connectionString);
exports.PROMOTIONS_COLLECTION = "promotions";
exports.DB_SCHEMA = "operations";
const mongoConnect = async () => {
    try {
        return await client.connect();
    }
    catch (e) {
        console.error(e);
    }
};
exports.mongoConnect = mongoConnect;
const mongoDisconnect = async (connection) => {
    try {
        if (connection) {
            await client.close();
        }
    }
    catch (e) {
        console.error(e);
    }
};
exports.mongoDisconnect = mongoDisconnect;
const fetchDataFromPromotionsCollection = async (client, pageInfo) => {
    const database = client.db(exports.DB_SCHEMA);
    const promotionsCollection = database.collection(exports.PROMOTIONS_COLLECTION);
    const limit = pageInfo.limit;
    const pageNumber = pageInfo.pageNumber;
    const skip = (pageNumber - 1) * limit;
    const query = {};
    const documents = await promotionsCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray();
    const hasMoreData = documents.length >= limit;
    return { documents, hasMoreData };
};
exports.fetchDataFromPromotionsCollection = fetchDataFromPromotionsCollection;
const updatePromotionDocument = async (client, complexObjectToUpdate) => {
    console.log("complexObjectToUpdate", complexObjectToUpdate);
    const database = client.db(exports.DB_SCHEMA);
    const promotionsCollection = database.collection(exports.PROMOTIONS_COLLECTION);
    const objectId = new mongodb_1.ObjectId(complexObjectToUpdate._id);
    const updateOperation = {
        $set: {},
    };
    complexObjectToUpdate.genericColumns.map((item) => {
        updateOperation.$set[item.key] = item.value;
    });
    console.log("updateOperation", updateOperation);
};
exports.updatePromotionDocument = updatePromotionDocument;
//# sourceMappingURL=mongodb.service.js.map