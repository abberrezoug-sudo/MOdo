import { Request, Response } from "express";
import menuItemService from "../services/menu-item.service.js";
import cloudinaryService from "../services/cloudinary.service.js";

export const createMenuItem = async (
  req: Request,
  res: Response
) => {
  try {
    let image = {
      url: "",
      publicId: "",
    };

    if (req.file) {
      const uploadedImage = await cloudinaryService.uploadImage(
        req.file,
        "menu-items"
      );

      image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    const menuItem = await menuItemService.createMenuItem({
      ...req.body,
      image,
    });

    return res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenuItems = async (
  req: Request,
  res: Response
) => {
  const menuItems = await menuItemService.getMenuItems();

  return res.json({
    success: true,
    data: menuItems,
  });
};

export const getMenuItem = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItem = await menuItemService.getMenuItem(
      req.params.id as string
    );

    return res.json({
      success: true,
      data: menuItem,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenuItemsBySection = async (
  req: Request,
  res: Response
) => {
  const menuItems =
    await menuItemService.getMenuItemsBySection(
      req.params.sectionId as string
    );

  return res.json({
    success: true,
    data: menuItems,
  });
};

export const updateMenuItem = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItem = await menuItemService.getMenuItem(
      req.params.id as string
    );

    let image = menuItem.image;

    if (req.file) {
      if (menuItem.image?.publicId) {
        await cloudinaryService.deleteImage(
          menuItem.image.publicId
        );
      }

      const uploadedImage =
        await cloudinaryService.uploadImage(
          req.file,
          "menu-items"
        );

      image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    const updatedMenuItem =
      await menuItemService.updateMenuItem(
        req.params.id as string,
        {
          ...req.body,
          image,
        }
      );

    return res.json({
      success: true,
      data: updatedMenuItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response
) => {
  try {
    const menuItem = await menuItemService.getMenuItem(
      req.params.id as string
    );

    if (menuItem.image?.publicId) {
      await cloudinaryService.deleteImage(
        menuItem.image.publicId
      );
    }

    await menuItemService.deleteMenuItem(req.params.id as string);

    return res.json({
      success: true,
      message: "Menu item deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};