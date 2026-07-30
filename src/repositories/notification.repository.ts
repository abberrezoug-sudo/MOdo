import { Notification } from "../models/notification.model.js";

class NotificationRepository {
  async create(data: any) {
    return Notification.create(data);
  }

  async findAll() {
    return Notification.find()
      .populate("ticketId")
      .sort({
        createdAt: -1,
      });
  }

  async findById(id: string) {
    return Notification.findById(id)
      .populate("ticketId");
  }

  async markAsRead(id: string) {
    return Notification.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    return Notification.findByIdAndDelete(id);
  }
}

export default new NotificationRepository();