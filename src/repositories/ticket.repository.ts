import { Ticket } from "../models/ticket.model.js";

class TicketRepository {
  async create(data: any) {
    return Ticket.create(data);
  }

  async findAll() {
    return Ticket.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return Ticket.findById(id);
  }

  async delete(id: string) {
    return Ticket.findByIdAndDelete(id);
  }

  async findByTableNumber(tableNumber: number) {
    return Ticket.findOne({ tableNumber });
  }
  async getStatistics() {
  const [statistics] = await Ticket.aggregate([
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              totalTickets: { $sum: 1 },
              totalRevenue: { $sum: "$total" },
              averageTicket: { $avg: "$total" }
            }
          }
        ],

        activeTables: [
          {
            $count: "count"
          }
        ],

        topSellingItems: [
          {
            $unwind: "$items"
          },
          {
            $group: {
              _id: "$items.name",
              quantity: {
                $sum: "$items.quantity"
              }
            }
          },
          {
            $sort: {
              quantity: -1
            }
          },
          {
            $limit: 5
          }
        ]
      }
    }
  ]);

  return statistics;
}
}

export default new TicketRepository();