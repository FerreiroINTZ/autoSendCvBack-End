import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"
import {States} from "./query.dto"

@Injectable()
export class ChangeService {
    
    constructor(@Inject("database") private readonly db: PrismaClient){}

    async changeAcessState(id: number, state: States){
        try{

            const data = await this.db.vagas.update({
                data:{
                    acesso: state
                },
                where: {
                    id
                }
            })
            return true
        }catch(e){
            return false
        }
    }
}