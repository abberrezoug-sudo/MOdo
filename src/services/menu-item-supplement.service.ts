import menuItemSupplementRepository from "../repositories/menu-item-supplement.repository.js";
import menuItemRepository from "../repositories/menu-item.repository.js";
import supplementRepository from "../repositories/supplement.repository.js";
import { AppError } from "../utils/app-error.js";
import { validateObjectId } from "../utils/validate-object-id.js";
import { CreateMenuItemSupplementDto } from "../validators/create-menu-item-supplement.validator.js";
import { UpdateMenuItemSupplementDto } from "../validators/update-menu-item-supplement.validator.js";

class MenuItemSupplementService {
  async create(
    data: CreateMenuItemSupplementDto
  ) {
    validateObjectId(data.menuItemId);
    validateObjectId(data.supplementId);
//verifier l'existance de menu et l'existance de suplement
    const menuItem = await menuItemRepository.findById(
      data.menuItemId
    );

    if (!menuItem) {
      throw new AppError("Menu item not found.", 404);
    }

    const supplement = await supplementRepository.findById(
      data.supplementId
    );

    if (!supplement) {
      throw new AppError("Supplement not found.", 404);
    }

    const existing =
      await menuItemSupplementRepository.findByMenuItemAndSupplement(
        data.menuItemId,
        data.supplementId
      );

    if (existing) {
      throw new AppError(
        "This supplement is already assigned to this menu item.",
        409
      );
    }
// cree suplement de menuIt
    return menuItemSupplementRepository.create(data);
  }

  async getAll() {
    //SHow all menuWithThierr suplement
    return menuItemSupplementRepository.findAll();
  }

  async getById(id: string) {
    validateObjectId(id);

    const item =
      await menuItemSupplementRepository.findById(id);

    if (!item) {
      throw new AppError(
        "Menu item supplement not found.",
        404
      );
    }

    return item;
  }

  async getByMenuItem(menuItemId: string) {
    validateObjectId(menuItemId);

    return menuItemSupplementRepository.findByMenuItem(
      menuItemId
    );
  }

  async update(
    id: string,
    data: UpdateMenuItemSupplementDto
  ) {
    validateObjectId(id);

    const item =
      await menuItemSupplementRepository.update(
        id,
        data
      );

    if (!item) {
      throw new AppError(
        "Menu item supplement not found.",
        404
      );
    }

    return item;
  }

  async delete(id: string) {
    validateObjectId(id);

    const item =
      await menuItemSupplementRepository.delete(id);

    if (!item) {
      throw new AppError(
        "Menu item supplement not found.",
        404
      );
    }

    return item;
  }
}

export default new MenuItemSupplementService();