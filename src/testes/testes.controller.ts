import { Controller, Get } from '@nestjs/common';
import {TestesService} from "./testes.service"

@Controller('testes')
export class TestesController {

    constructor(private readonly db:TestesService){}

    @Get()
    async slw(){
        const data = await this.db.rpz()
        console.log(data)
        return data
    }
}
