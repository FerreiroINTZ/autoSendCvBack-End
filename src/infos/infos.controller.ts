import { Controller, Get } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"
import {InfosService} from "./infos.service"

@Controller('infos')
export class InfosController {

    constructor(private readonly infosService: InfosService){}

    @Get()
    async slw(){
        console.log("slw")
        const data = await this.infosService.sumParidades()
        // console.log(data)
        return data
    }
}
