import { User } from "../models/user.model.js";

class UserRepository {
  async create(data: any) {
    return User.create(data);
  }

  async findByUsername(username: string) {
    return User.findOne({
      username: username.trim(),
    });
  }

  async findById(id: string) {
    return User.findById(id);
  }
}

export default new UserRepository();