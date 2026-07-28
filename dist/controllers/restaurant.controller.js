import restaurantService from "../services/restaurant.service.js";
import cloudinaryService from "../services/cloudinary.service.js";
export const createRestaurant = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Restaurant image is required."
            });
        }
        const uploadedImage = await cloudinaryService.uploadImage(req.file, "restaurants");
        const restaurant = await restaurantService.createRestaurant({
            ...req.body,
            image: {
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id,
            },
        });
        return res.status(201).json({
            success: true,
            data: restaurant
        });
    }
    catch (error) {
        console.error("FULL ERROR:");
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const getRestaurant = async (req, res) => {
    const restaurant = await restaurantService.getRestaurant();
    res.json({
        success: true,
        data: restaurant,
    });
};
//# sourceMappingURL=restaurant.controller.js.map