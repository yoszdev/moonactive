import { Collection, MongoClient, ObjectId } from "mongodb";
import {
  DB_SCHEMA,
  IComplexObjectToUpdate,
  IPageInfo,
  IPromotionResponse,
  PROMOTIONS_COLLECTION,
} from "../consts/types";

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

export const mongoConnect = async (): Promise<MongoClient> => {
  try {
    return await client.connect();
  } catch (e) {
    console.error(e);
  }
};

export const mongoDisconnect = async (
  connection: MongoClient,
): Promise<void> => {
  try {
    if (connection) {
      await client.close();
    }
  } catch (e) {
    console.error(e);
  }
};

export const fetchDataFromPromotionsCollection = async (
  client: MongoClient,
  pageInfo: IPageInfo,
): Promise<IPromotionResponse> => {
  const database = client.db(DB_SCHEMA);
  const promotionsCollection: Collection = database.collection(
    PROMOTIONS_COLLECTION,
  );

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

export const updatePromotionDocument = async (
  client: MongoClient,
  complexObjectToUpdate: IComplexObjectToUpdate,
) => {
  const database = client.db(DB_SCHEMA);
  const promotionsCollection: Collection = database.collection(
    PROMOTIONS_COLLECTION,
  );
  const objectId = new ObjectId(complexObjectToUpdate._id);
  const updateOperation = {
    $set: {},
  };
  complexObjectToUpdate.genericColumns.map((item) => {
    updateOperation.$set[item.key] = item.value;
  });
  await promotionsCollection.updateOne({ _id: objectId }, updateOperation);
};

export const addColumn = async (
  client: MongoClient,
  columnName: string,
  columnValue: string | number,
) => {
  const database = client.db(DB_SCHEMA);
  const promotionsCollection: Collection = database.collection(
    PROMOTIONS_COLLECTION,
  );
  await promotionsCollection.updateMany(
    {},
    { $set: { [columnName]: columnValue } },
  );
};

export const deleteColum = async (client: MongoClient, columnName: string) => {
  const database = client.db(DB_SCHEMA);
  const promotionsCollection: Collection = database.collection(
    PROMOTIONS_COLLECTION,
  );
  await promotionsCollection.updateMany({}, { $unset: { [columnName]: "" } });
};
