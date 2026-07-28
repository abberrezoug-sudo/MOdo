import { Restaurant } from "../models/restaurant.model.js";

class RestaurantRepository {
  async findRestaurant() {
    return Restaurant.findOne();
  }

  async createRestaurant(data: any) {
    return Restaurant.create(data);
  }

  async updateRestaurant(id: string, data: any) {
    return Restaurant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}

export default new RestaurantRepository();	
