export interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}

export interface PromotionRequest {
  pageNumber: number;
  limit: number;
}
export interface IDocumentAbstract {
  _id: string;
}

export interface IDocument extends IDocumentAbstract {
  [key: string]: any;
}

export interface IPromotionsRes {
  documents: IDocument[];
  hasMoreData: boolean;
}
