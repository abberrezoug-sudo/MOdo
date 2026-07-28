import { Section } from "../models/section.model.js";
class SectionRepository {
    async create(data) {
        return Section.create(data);
    }
    async findAll() {
        return Section.find().sort({ displayOrder: 1, createdAt: 1 });
    }
    async findById(id) {
        return Section.findById(id);
    }
    async findByName(name) {
        return Section.findOne({
            name: {
                $regex: new RegExp(`^${name}$`, "i"),
            },
        });
    }
    async update(id, data) {
        return Section.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    async delete(id) {
        return Section.findByIdAndDelete(id);
    }
}
export default new SectionRepository();
//# sourceMappingURL=section.repository.js.map