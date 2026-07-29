import menuItemRepository from "../repositories/menu-item.repository.js";
import sectionRepository from "../repositories/section.repository.js";
import { AppError } from "../utils/app-error.js";
import { validateObjectId } from "../utils/validate-object-id.js";
import { CreateMenuItemDto } from "../validators/create-menu-item.validator.js";
import { UpdateMenuItemDto } from "../validators/update-menu-item.validator.js";
import menuItemSupplementRepository from "../repositories/menu-item-supplement.repository.js";
class MenuItemService {
  async createMenuItem(data: CreateMenuItemDto) {
    validateObjectId(data.sectionId);

    const section = await sectionRepository.findById(data.sectionId);

    if (!section) {
      throw new AppError("Section not found.", 404);
    }

    const existingMenuItem =
      await menuItemRepository.findByNameAndSection(
        data.name,
        data.sectionId
      );

    if (existingMenuItem) {
      throw new AppError(
        "Menu item already exists in this section.",
        409
      );
    }

    return menuItemRepository.create(data);
  }

 async getMenuItems() {
  const menuItems =
    await menuItemRepository.findAll();

  return Promise.all(
    menuItems.map((item) =>
      this.attachSupplements(item)
    )
  );
}
 async getMenuItem(id: string) {
  validateObjectId(id);

  const menuItem =
    await menuItemRepository.findById(id);

  if (!menuItem) {
    throw new AppError(
      "Menu item not found.",
      404
    );
  }

  return this.attachSupplements(menuItem);
}
  async getMenuItemsBySection(sectionId: string) {
    validateObjectId(sectionId);

    return menuItemRepository.findBySection(sectionId);
  }

  async updateMenuItem(
    id: string,
    data: UpdateMenuItemDto
  ) {
    validateObjectId(id);

    const menuItem =
      await menuItemRepository.update(id, data);

    if (!menuItem) {
      throw new AppError("Menu item not found.", 404);
    }

    return menuItem;
  }

  async deleteMenuItem(id: string) {
    validateObjectId(id);

    const menuItem =
      await menuItemRepository.delete(id);

    if (!menuItem) {
      throw new AppError("Menu item not found.", 404);
    }

    return menuItem;
  }
  private async attachSupplements(menuItem: any) {
  const supplements =
    await menuItemSupplementRepository.findByMenuItem(
      menuItem._id.toString()
    );

  return {
    ...menuItem,

    supplements: supplements.map((item: any) => ({
      _id: item.supplementId._id,
      name: item.supplementId.name,
      description: item.supplementId.description,
      image: item.supplementId.image,

      price:
        item.extraPrice ??
        item.supplementId.price,

      maxQuantity: item.maxQuantity,
    })),
  };
}
}

export default new MenuItemService();