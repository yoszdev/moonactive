import { Collection, Document, MongoClient, ObjectId, WithId } from "mongodb";
const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);
export interface IPageInfo {
  limit: number;
  pageNumber: number;
}

export interface IPromotionResponse {
  documents: WithId<Document>[];
  hasMoreData: boolean;
}

export interface IComplexObjectToUpdate {
  _id: string;
  genericColumns: IGenericColumn[];
}

export interface IGenericColumn {
  key: string;
  value: string;
}

export const PROMOTIONS_COLLECTION = "promotions";
export const DB_SCHEMA = "operations";
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
  console.log("complexObjectToUpdate", complexObjectToUpdate);
  const database = client.db(DB_SCHEMA);
  const promotionsCollection: Collection = database.collection(
    PROMOTIONS_COLLECTION,
  );

  const objectId = new ObjectId(complexObjectToUpdate._id);

  // const yy = {};
  // const xx = complexObjectToUpdate.genericColumns.map((item) => {
  //   yy[item.key] = item.value;
  // });
  // console.log("yy", yy);

  // const xcxc = new Map(complexObjectToUpdate.genericColumns, {})

  // The update operation
  const updateOperation = {
    $set: {
      // Your update fields and values go here
      // promotionName: "smolt2",
      // ...
    },
  };

  complexObjectToUpdate.genericColumns.map((item) => {
    updateOperation.$set[item.key] = item.value;
  });

  console.log("updateOperation", updateOperation);
  // const result = await promotionsCollection.updateOne(
  //   { _id: objectId },
  //   updateOperation,
  // );
  // console.log("result", result);

  // Update a single document
  // await promotionsCollection.updateOne({ _id: objectId }, updateOperation, (err, result) => {
  //   if (err) {
  //     console.error('Error updating document:', err);
  //     return;
  //   }

  // console.log("Document updated successfully");
};
