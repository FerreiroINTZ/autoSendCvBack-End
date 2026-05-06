import { 
    Controller, 
    Get, 
    Query, 
    Res, 
    BadRequestException,
    Param 
} from '@nestjs/common';
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

    @Get("/favorited/:id")
    async changeFavorited(@Param() params: any){
        const data = await this.db.changeFavorited(Number(params.id))
        console.log(data)
        return true
    }

    @Get("/disponibilidade/:id")
    async changeDisponibilidade(@Param() params: any){
        const data = await this.db.changeDisponibilidade(Number(params.id))
        console.log(data)
        return true
    }
}
