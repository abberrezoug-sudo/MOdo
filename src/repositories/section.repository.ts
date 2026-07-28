import { Section } from "../models/section.model.js";
import { CreateSectionDto } from "../validators/section.validator.js";

class SectionRepository {
  async create(data: CreateSectionDto) {
    return Section.create(data);
  }

  async findAll() {
    return Section.find().sort({ displayOrder: 1, createdAt: 1 });
  }

  async findById(id: string) {
    return Section.findById(id);
  }

  async findByName(name: string) {
    return Section.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    });
  }

  async update(id: string, data: Partial<CreateSectionDto>) {
    return Section.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return Section.findByIdAndDelete(id);
  }
}

export default new SectionRepository();