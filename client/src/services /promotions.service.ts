import axios from "axios";
import { API } from "../consts /API.const";

interface PromotionRequest {
  pageNumber: number;
  limit: number;
}
interface IDocumentAbstract {
  _id: string;
}

interface IDocument extends IDocumentAbstract {
  [key: string]: any;
}

interface IPromotionsRes {
  documents: IDocument[];
  hasMoreData: boolean;
}
export const fetchPromotions = async (
  pageNumber: number,
): Promise<IPromotionsRes> => {
  const requestData: PromotionRequest = {
    pageNumber,
    limit: 10,
  };
  try {
    // const response = await axios.post(API.promotions, requestData);
    // console.log("response.data;", response.data);
    // return response.data;
    return {
      documents: [
        {
          _id: "653fa5567fc2b8f0ac48fde8",
          promotionName: "smolt",
          type: "epic",
          startDate: "2024-05-27T16:05:26.920Z",
          endDate: "2024-09-05T06:07:28.717Z",
          userGroupName: "herring",
          maiow: "1",
        },
        {
          _id: "653fa5567fc2b8f0ac48fde9",
          promotionName: "fright",
          type: "epic",
          startDate: "2023-12-14T13:20:27.085Z",
          endDate: "2024-07-09T20:36:58.409Z",
          userGroupName: "dose",
          maiow: "2",
        },
        {
          _id: "653fa5567fc2b8f0ac48fdea",
          promotionName: "ladle",
          type: "basic",
          startDate: "2024-08-21T20:27:54.151Z",
          endDate: "2025-03-25T02:25:13.383Z",
          userGroupName: "petticoat",
          maiow: "3",
        },
        {
          _id: "653fa5567fc2b8f0ac48fdeb",
          promotionName: "turn",
          type: "common",
          startDate: "2024-03-23T11:16:39.139Z",
          endDate: "2024-07-14T04:59:52.570Z",
          userGroupName: "semiconductor",
          maiow: "4",
        },
        {
          _id: "653fa5567fc2b8f0ac48fdec",
          promotionName: "footstep",
          type: "common",
          startDate: "2024-10-09T03:39:07.371Z",
          endDate: "2024-11-09T19:05:51.343Z",
          userGroupName: "son",
          maiow: "5",
        },
        {
          _id: "653fa5567fc2b8f0ac48fded",
          promotionName: "soccer",
          type: "basic",
          startDate: "2024-05-10T11:27:06.523Z",
          endDate: "2025-01-05T11:33:06.841Z",
          userGroupName: "cria",
          maiow: "6",
        },
        {
          _id: "653fa5567fc2b8f0ac48fdee",
          promotionName: "anteater",
          type: "epic",
          startDate: "2023-10-02T15:30:58.684Z",
          endDate: "2024-04-02T15:56:48.968Z",
          userGroupName: "miracle",
        },
      ],
      hasMoreData: false,
    };
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw error;
  }
};
