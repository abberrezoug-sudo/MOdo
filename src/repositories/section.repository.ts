import { Section } from "../models/section.model.js";


class SectionRepository {


    async create(data:any){

        return Section.create(data);

    }



    async findAll(){

        return Section.find()
        .sort({
            order:1
        });

    }



    async findById(id:string){

        return Section.findById(id);

    }



    async findByName(name:string){

        return Section.findOne({
            name:name.trim()
        });

    }



    async update(
        id:string,
        data:any
    ){

        return Section.findByIdAndUpdate(
            id,
            data,
            {
                new:true,
                runValidators:true
            }
        );

    }



    async delete(id:string){

        return Section.findByIdAndDelete(id);

    }

}


export default new SectionRepository();