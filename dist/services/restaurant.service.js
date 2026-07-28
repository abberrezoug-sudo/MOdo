import restaurantRepository from "../repositories/restaurant.repository.js";
class RestaurantService {
    async createRestaurant(data) {
        const existingRestaurant = await restaurantRepository.findRestaurant();
        if (existingRestaurant) {
            throw new Error("Restaurant profile already exists.");
        }
        return restaurantRepository.createRestaurant(data);
    }
    async getRestaurant() {
        return restaurantRepository.findRestaurant();
    }
    async updateRestaurant(id, data) {
        return restaurantRepository.updateRestaurant(id, data);
    }
}
export default new RestaurantService();
//# sourceMappingURL=restaurant.service.js.map