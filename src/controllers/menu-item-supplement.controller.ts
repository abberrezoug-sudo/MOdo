import { Request, Response } from "express";
import menuItemSupplementService from "../services/menu-item-supplement.service.js";

export const createMenuItemSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItemSupplement =
      await menuItemSupplementService.create(req.body);

    return res.status(201).json({
      success: true,
      data: menuItemSupplement,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenuItemSupplements = async (
  req: Request,
  res: Response
) => {
  const menuItemSupplements =
    await menuItemSupplementService.getAll();

  return res.json({
    success: true,
    data: menuItemSupplements,
  });
};

export const getMenuItemSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItemSupplement =
      await menuItemSupplementService.getById(
        req.params.id as string
      );

    return res.json({
      success: true,
      data: menuItemSupplement,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupplementsByMenuItem = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItemSupplements =
      await menuItemSupplementService.getByMenuItem(
        req.params.menuItemId as string
      );

    return res.json({
      success: true,
      data: menuItemSupplements,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMenuItemSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItemSupplement =
      await menuItemSupplementService.update(
        req.params.id as string,
        req.body
      );

    return res.json({
      success: true,
      data: menuItemSupplement,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMenuItemSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    await menuItemSupplementService.delete(
      req.params.id as string
    );

    return res.json({
      success: true,
      message:
        "Menu item supplement deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};