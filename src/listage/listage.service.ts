import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"
// import {DatabaseServiceModule} from "../database-service/database-service.module"

@Injectable()
export class ListageService {
    constructor(@Inject("database") private readonly db: PrismaClient){}

    async getVanancies(){
        const data = await this.db.vagas.findMany({
            select: {
                titulo: true,
                area: true,
                link: true,
                salario: true,
                empresa: true,
                plataforma: true,
                dt_publicacao: true,
                acesso: true,
                paridade: true,
                disponibilidade: true
            },
            orderBy: {
                paridade: {sort: 'desc'}
            }
        })
        const treatedData = data.map(x =>{
            let newData = x as any
            if(!x.paridade){
                newData = {...newData, paridade: 0}
            }
            if(!x.salario){
                newData = {...newData, salario: "nao expecificado"}
            }
            const date = new Date(newData.dt_publicacao as Date)
            const dateFormated = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            newData = {...newData, dt_publicacao: dateFormated}
            return newData
        })
        return treatedData
    }
}
