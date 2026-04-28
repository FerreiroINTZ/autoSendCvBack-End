import { Controller, Get, Query, Res, BadRequestException } from '@nestjs/common';
import {ChangeService} from "./change.service"
import {QueryDTO} from "./query.dto" 
import {type Response} from "express"

@Controller('change')
export class ChangeController {

    constructor(private readonly db: ChangeService){}

    @Get()
    async changeState(
        @Query() query: QueryDTO, 
    ){
        const slw = await this.db.changeAcessState(query.id, query.state)
        console.log(slw)
        if(!slw){
            throw new BadRequestException("Erro ao mudar os dados no Banco!")
        }
        console.log(query)
        return "Dados alterados!"
    }
}
