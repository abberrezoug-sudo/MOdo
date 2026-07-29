import supplementRepository from "../repositories/supplement.repository.js";
import { AppError } from "../utils/app-error.js";
import { validateObjectId } from "../utils/validate-object-id.js";
import { CreateSupplementDto } from "../validators/create-supplement.validator.js";
import { UpdateSupplementDto } from "../validators/update-supplement.validator.js";

class SupplementService {
  async create(data: CreateSupplementDto) {
    const existing =
      await supplementRepository.findByName(
        data.name
      );

    if (existing) {
      throw new AppError(
        "Supplement already exists.",
        409
      );
    }

    return supplementRepository.create(data);
  }

  async getAll() {
    return supplementRepository.findAll();
  }

  async getById(id: string) {
    validateObjectId(id);

    const supplement =
      await supplementRepository.findById(id);

    if (!supplement) {
      throw new AppError(
        "Supplement not found.",
        404
      );
    }

    return supplement;
  }

  async update(
    id: string,
    data: UpdateSupplementDto
  ) {
    validateObjectId(id);

    const supplement =
      await supplementRepository.update(
        id,
        data
      );

    if (!supplement) {
      throw new AppError(
        "Supplement not found.",
        404
      );
    }

    return supplement;
  }

  async delete(id: string) {
    validateObjectId(id);

    const supplement =
      await supplementRepository.delete(id);

    if (!supplement) {
      throw new AppError(
        "Supplement not found.",
        404
      );
    }

    return supplement;
  }
}

export default new SupplementService();