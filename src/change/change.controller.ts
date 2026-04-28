import { Controller, Get, Query } from '@nestjs/common';
import {ChangeService} from "./change.service"
import {QueryDTO} from "./query.dto" 

@Controller('change')
export class ChangeController {

    constructor(private readonly db: ChangeService){}

    @Get()
    changeState(@Query() query: QueryDTO){
        console.log(query)
        // console.log(this.db.changeAcessState(1, "as"))
        return "nada"
    }
}
