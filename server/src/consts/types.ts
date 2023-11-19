import { Document, WithId } from "mongodb";
import { Array, Record, Static, String } from "runtypes";

export const PROMOTIONS_COLLECTION = "promotions";
export const DB_SCHEMA = "operations";

export interface IPageInfo {
  limit: number;
  pageNumber: number;
}

export interface IPromotionResponse {
  documents: WithId<Document>[];
  hasMoreData: boolean;
}

const GenericColumnRecord = Record({
  key: String,
  value: String,
});

export const UpdatePromotionRecord = Record({
  _id: String,
  genericColumns: Array(GenericColumnRecord),
});

export type IComplexObjectToUpdate = Static<typeof UpdatePromotionRecord>;
