import { Request, Response, NextFunction } from "express";
import ticketService from "../services/ticket.service.js";
import { createTicketSchema } from "../validators/create-ticket.validator.js";

export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createTicketSchema.parse(req.body);

    const ticket = await ticketService.create(data);

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await ticketService.getAll();

    res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await ticketService.getById(
      req.params.id as string
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ticketService.delete(req.params.id as string);

    res.json({
      success: true,
      message: "Ticket deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
  
};
export const getStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statistics =
      await ticketService.getStatistics();

    res.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
};