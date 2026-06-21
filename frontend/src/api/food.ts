import { apiClient } from './axios';

export interface FoodPartner {
  _id: string;
  name: string;
  contactName: string;
}

export interface Food {
  _id: string;
  name: string;
  description: string;
  video: string;
  foodPartner: FoodPartner | string;
  likeCount: number;
  savesCount: number;
}

export const foodApi = {
  getAllFood: async (): Promise<Food[]> => {
    const response = await apiClient.get('/food/food');
    return response.data.foodItems;
  }
};
