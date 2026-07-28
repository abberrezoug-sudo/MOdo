import { Request, Response } from "express";
import sectionService from "../services/section.service.js";
import cloudinaryService from "../services/cloudinary.service.js";


export const createSection = async (
    req: Request,
    res: Response
) => {

    try {

       if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "Section image is required."
    });
}

const uploadedImage = await cloudinaryService.uploadImage(
    req.file,
    "sections"
);

const section = await sectionService.createSection({
    ...req.body,
    image: {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
    },
});


        res.status(201).json({
            success:true,
            data:section
        });


    } catch(error:any){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};





export const getSections = async (
    req: Request,
    res: Response
) => {

    try {

        const sections =
            await sectionService.getSections();


        res.json({
            success:true,
            data:sections
        });


    } catch(error:any){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};





export const getSection = async (
    req: Request,
    res: Response
) => {

    try {

        const section =
            await sectionService.getSection(
                req.params.id as string
            );


        if(!section){

            return res.status(404).json({
                success:false,
                message:"Section not found"
            });

        }


        res.json({
            success:true,
            data:section
        });


    } catch(error:any){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};





export const updateSection = async (
    req: Request,
    res: Response
) => {

    try {

        const section =
            await sectionService.updateSection(
                req.params.id as string,
                req.body
            );


        res.json({
            success:true,
            data:section
        });


    } catch(error:any){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};





export const deleteSection = async (
    req: Request,
    res: Response
) => {

    try {

        await sectionService.deleteSection(
            req.params.id as string
        );


        res.json({
            success:true,
            message:"Section deleted successfully"
        });


    } catch(error:any){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};