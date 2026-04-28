import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"

@Injectable()
export class ChangeService {
    
    constructor(@Inject("database") private readonly db: PrismaClient){}

    async changeAcessState(id: number, state: string){
        return "valor"
    }
}