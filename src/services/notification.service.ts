import notificationRepository from "../repositories/notification.repository.js";
import { AppError } from "../utils/app-error.js";

class NotificationService {
  async create(data: {
    title: string;
    message: string;
    type?: "NEW_TICKET";
    ticketId: string;
  }) {
    return notificationRepository.create({
      title: data.title,
      message: data.message,
      type: data.type ?? "NEW_TICKET",
      ticketId: data.ticketId,
    });
  }

  async getAll() {
    return notificationRepository.findAll();
  }

  async getById(id: string) {
    const notification =
      await notificationRepository.findById(id);

    if (!notification) {
      throw new AppError(
        "Notification not found.",
        404
      );
    }

    return notification;
  }

  async markAsRead(id: string) {
    const notification =
      await notificationRepository.markAsRead(id);

    if (!notification) {
      throw new AppError(
        "Notification not found.",
        404
      );
    }

    return notification;
  }

  async delete(id: string) {
    const notification =
      await notificationRepository.delete(id);

    if (!notification) {
      throw new AppError(
        "Notification not found.",
        404
      );
    }

    return notification;
  }
}

export default new NotificationService();