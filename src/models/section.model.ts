import { Schema, model } from "mongoose";


const sectionSchema = new Schema(
{
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },


    description:{
        type:String,
        default:"",
        trim:true
    },


    image:{
        url:{
            type:String,
            default:""
        },

        publicId:{
            type:String,
            default:""
        }
    },


    order:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
});


export const Section = model(
    "Section",
    sectionSchema
);