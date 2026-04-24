import { Controller, Get } from '@nestjs/common';
import {ListageService} from "./listage.service"

@Controller('listage')
export class ListageController {

    constructor(private readonly listageService: ListageService){}

    @Get()
    async getVacanciesRoute(){
        const data: any = await this.listageService.getVanancies()
        // console.log(data)
	    console.log(data.length)
        return data
    }
}
