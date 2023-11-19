import axios from "axios";
import { API } from "../consts /API.const";
import { IPromotionsRes, PromotionRequest } from "../consts /promotions.types";

export const fetchPromotions = async (
  pageNumber: number,
): Promise<IPromotionsRes> => {
  const requestData: PromotionRequest = {
    pageNumber,
    limit: 20,
  };
  try {
    const response = await axios.post(API.promotions, requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
