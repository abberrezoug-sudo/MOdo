import { MenuItem } from "../models/menu-item.model.js";

class MenuItemRepository {
  async create(data: any) {
    return MenuItem.create(data);
  }

async findAll() {
  return MenuItem.aggregate([
    {
      $lookup: {
        from: "sections",
        localField: "sectionId",
        foreignField: "_id",
        as: "section",
      },
    },
    {
      $unwind: "$section",
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $project: {
        __v: 0,
        "section.__v": 0,
      },
    },
  ]);
}
  async findById(id: string) {
    return MenuItem.findById(id)
      .populate("sectionId", "name");
  }

  async findBySection(sectionId: string) {
    return MenuItem.find({ sectionId })
      .sort({ createdAt: 1 });
  }

 async findByNameAndSection(
  name: string,
  sectionId: string
) {
  return MenuItem.findOne({
    name: name.trim(),
    sectionId,
  });
}

  async update(id: string, data: any) {
    return MenuItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return MenuItem.findByIdAndDelete(id);
  }
}

export default new MenuItemRepository();