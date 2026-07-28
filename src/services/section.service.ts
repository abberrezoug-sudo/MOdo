import sectionRepository from "../repositories/section.repository.js";


class SectionService {


    async createSection(data:any){

        const existingSection =
            await sectionRepository.findByName(
                data.name
            );


        if(existingSection){

            throw new Error(
                "Section already exists"
            );

        }


        return sectionRepository.create(data);

    }



    async getSections(){

        return sectionRepository.findAll();

    }



    async getSection(id:string){

        return sectionRepository.findById(id);

    }



    async updateSection(
        id:string,
        data:any
    ){

        return sectionRepository.update(
            id,
            data
        );

    }



    async deleteSection(id:string){

        return sectionRepository.delete(id);

    }

}


export default new SectionService();