import { Restaurant } from "../models/restaurant.model.js";
class RestaurantRepository {
    async findRestaurant() {
        return Restaurant.findOne();
    }
    async createRestaurant(data) {
        return Restaurant.create(data);
    }
    async updateRestaurant(id, data) {
        return Restaurant.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
}
export default new RestaurantRepository();
//# sourceMappingURL=restaurant.repository.js.map