import { Controller, Get, Query, Res } from '@nestjs/common';
import {ChangeService} from "./change.service"
import {QueryDTO} from "./query.dto" 
import {type Response} from "express"

@Controller('change')
export class ChangeController {

    constructor(private readonly db: ChangeService){}

    @Get()
    async changeState(@Query() query: QueryDTO, @Res() resp: Response){
        const slw = await this.db.changeAcessState(query.id, query.state)
        if(!slw){
            return resp.status(401).send("Erro ao mudar os dados no Banco!")
        }
        return "dados alterados!"
    }
}
