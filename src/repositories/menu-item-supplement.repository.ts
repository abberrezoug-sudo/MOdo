import { MenuItemSupplement } from "../models/menu-item-supplement.model.js";
class MenuItemSupplementRepository{
    async create(data:any){
        return MenuItemSupplement.create(data)
    }
    async findAll(){
        return MenuItemSupplement.find()
         .populate("menuItemId", "name")
         .populate("supplementId")
    }
     async findById(id: string) {
    return MenuItemSupplement.findById(id)
      .populate("menuItemId", "name")
      .populate("supplementId");
  }
    async findByMenuItem(menuItemId: string) {
    return MenuItemSupplement.find({
      menuItemId,
    }).populate("supplementId");
  }
  async findByMenuItemAndSupplement(
    menuItemId: string,
    supplementId: string
  ) {
    return MenuItemSupplement.findOne({
      menuItemId,
      supplementId,
    });
  }
  async update(id: string, data: any) {
    return MenuItemSupplement.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("menuItemId", "name")
      .populate("supplementId");
  }

  async delete(id: string) {
    return MenuItemSupplement.findByIdAndDelete(id);
  }
}
export default new MenuItemSupplementRepository();