import sectionRepository from "../repositories/section.repository.js";
import { CreateSectionDto } from "../validators/section.validator.js";

class SectionService {
  async create(data: CreateSectionDto) {
    const exists = await sectionRepository.findByName(data.name);

    if (exists) {
      throw new Error("Section already exists.");
    }

    return sectionRepository.create(data);
  }

  async findAll() {
    return sectionRepository.findAll();
  }

  async findById(id: string) {
    const section = await sectionRepository.findById(id);

    if (!section) {
      throw new Error("Section not found.");
    }

    return section;
  }

  async update(id: string, data: Partial<CreateSectionDto>) {
    if (data.name) {
      const exists = await sectionRepository.findByName(data.name);

      if (exists && exists.id !== id) {
        throw new Error("Section already exists.");
      }
    }

    const section = await sectionRepository.update(id, data);

    if (!section) {
      throw new Error("Section not found.");
    }

    return section;
  }

  async delete(id: string) {
    const section = await sectionRepository.delete(id);

    if (!section) {
      throw new Error("Section not found.");
    }

    return section;
  }
}

export default new SectionService();