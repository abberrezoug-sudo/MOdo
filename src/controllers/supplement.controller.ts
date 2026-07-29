import { Request, Response } from "express";
import supplementService from "../services/supplement.service.js";
import cloudinaryService from "../services/cloudinary.service.js";

export const createSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    let image = {
      url: "",
      publicId: "",
    };

    if (req.file) {
      const uploadedImage =
        await cloudinaryService.uploadImage(
          req.file,
          "supplements"
        );

      image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    const supplement = await supplementService.create({
      ...req.body,
      image,
    });

    return res.status(201).json({
      success: true,
      data: supplement,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupplements = async (
  req: Request,
  res: Response
) => {
  const supplements =
    await supplementService.getAll();

  return res.json({
    success: true,
    data: supplements,
  });
};

export const getSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    const supplement =
      await supplementService.getById(
        req.params.id as string
      );

    return res.json({
      success: true,
      data: supplement,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    const supplement =
      await supplementService.getById(
        req.params.id as string
      );

    let image = supplement.image ?? {
      url: "",
      publicId: "",
    };

    if (req.file) {
      if (supplement.image?.publicId) {
        await cloudinaryService.deleteImage(
          supplement.image.publicId
        );
      }

      const uploadedImage =
        await cloudinaryService.uploadImage(
          req.file,
          "supplements"
        );

      image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      };
    }

    const updated =
      await supplementService.update(
        req.params.id as string,
        {
          ...req.body,
          image,
        }
      );

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSupplement = async (
  req: Request,
  res: Response
) => {
  try {
    const supplement =
      await supplementService.getById(
        req.params.id as string
      );

    if (supplement.image?.publicId) {
      await cloudinaryService.deleteImage(
        supplement.image.publicId
      );
    }

    await supplementService.delete(req.params.id as string);

    return res.json({
      success: true,
      message:
        "Supplement deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};