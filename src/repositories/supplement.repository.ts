import { Supplement } from "../models/supplement.model.js";

class SupplementRepository {
  async create(data: any) {
    return Supplement.create(data);
  }

  async findAll() {
    return Supplement.find().sort({
      createdAt: 1,
    });
  }

  async findById(id: string) {
    return Supplement.findById(id);
  }

  async findByName(name: string) {
    return Supplement.findOne({
      name: name.trim(),
    });
  }

  async update(
    id: string,
    data: any
  ) {
    return Supplement.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id: string) {
    return Supplement.findByIdAndDelete(id);
  }
}

export default new SupplementRepository();