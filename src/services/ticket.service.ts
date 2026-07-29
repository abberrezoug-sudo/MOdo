import ticketRepository from "../repositories/ticket.repository.js";
import restaurantRepository from "../repositories/restaurant.repository.js";
import menuItemRepository from "../repositories/menu-item.repository.js";
import menuItemSupplementRepository from "../repositories/menu-item-supplement.repository.js";
import supplementRepository from "../repositories/supplement.repository.js";

import { AppError } from "../utils/app-error.js";
import { validateObjectId } from "../utils/validate-object-id.js";

import { CreateTicketDto } from "../validators/create-ticket.validator.js";

class TicketService {
  async create(data: CreateTicketDto) {
    const restaurant =
      await restaurantRepository.findRestaurant();

    if (!restaurant) {
      throw new AppError(
        "Restaurant not found.",
        404
      );
    }

    if (
      data.tableNumber < 1 ||
      data.tableNumber > restaurant.tableCount
    ) {
      throw new AppError(
        "Invalid table number.",
        400
      );
    }

  

    const ticketItems: any[] = [];

    let ticketTotal = 0;

    for (const item of data.items) {
      const menuItem =
        await menuItemRepository.findById(
          item.menuItemId
        );

      if (!menuItem) {
        throw new AppError(
          "Menu item not found.",
          404
        );
      }

      const ticketSupplements: any[] = [];

      let supplementsTotal = 0;

      for (const supplement of item.supplements) {
        // vérifier que ce supplément est autorisé
        const relation =
          await menuItemSupplementRepository.findByMenuItemAndSupplement(
            item.menuItemId,
            supplement.supplementId
          );

        if (!relation) {
          throw new AppError(
            "Supplement not allowed for this menu item.",
            400
          );
        }

        // récupérer le supplément
        const supplementData =
          await supplementRepository.findById(
            supplement.supplementId
          );

        if (!supplementData) {
          throw new AppError(
            "Supplement not found.",
            404
          );
        }

        const supplementPrice =
          relation.extraPrice ??
          supplementData.price;

     ticketSupplements.push({
  supplementId: supplementData._id,
  name: supplementData.name,
  quantity: supplement.quantity,
  price: supplementPrice,
});

       supplementsTotal +=
  supplementPrice * supplement.quantity;
      }

      const lineTotal =
        (
          menuItem.price +
          supplementsTotal
        ) * item.quantity;

      ticketItems.push({
        menuItemId: menuItem._id,

        name: menuItem.name,

        quantity: item.quantity,

        unitPrice: menuItem.price,

        supplements: ticketSupplements,

        totalPrice: lineTotal,
      });

      ticketTotal += lineTotal;
    }

    return ticketRepository.create({
      tableNumber: data.tableNumber,

      items: ticketItems,

      total: ticketTotal,
    });
  }
    async getAll() {
    return ticketRepository.findAll();
  }

  async getById(id: string) {
    validateObjectId(id);

    const ticket =
      await ticketRepository.findById(id);

    if (!ticket) {
      throw new AppError(
        "Ticket not found.",
        404
      );
    }

    return ticket;
  }

  async delete(id: string) {
    validateObjectId(id);

    const ticket =
      await ticketRepository.delete(id);

    if (!ticket) {
      throw new AppError(
        "Ticket not found.",
        404
      );
    }

    return ticket;
  }
  async getStatistics() {
  const statistics =
    await ticketRepository.getStatistics();

  return {
    totalTickets:
      statistics.totals[0]?.totalTickets ?? 0,

    totalRevenue:
      statistics.totals[0]?.totalRevenue ?? 0,

    averageTicket:
      statistics.totals[0]?.averageTicket ?? 0,

    activeTables:
      statistics.activeTables[0]?.count ?? 0,

    topSellingItems:
      statistics.topSellingItems.map((item: any) => ({
        name: item._id,
        quantity: item.quantity,
      })),
  };
}
}

export default new TicketService();