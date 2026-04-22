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
                ai_analysis: {
                    select:{
                        paridade: true
                    }
                },
                plataforma: true,
                dt_publicacao: true,
                acesso: true,
                disponibilidade: true
            }
        })
        const treatedData = data.map(x =>{
            let newData = x as any
            // se nao tiver paridade ele seta para zero
            if(!x.ai_analysis?.paridade){
                newData = {...newData, paridade: 0}
            }
            // se nao tiver salario seta um valor
            if(!x.salario){
                newData = {...newData, salario: "nao expecificado"}
            }
            
            // formata a hora
            const date = new Date(newData.dt_publicacao as Date)
            const dateFormated = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            
            newData = {...newData, dt_publicacao: dateFormated}
            delete newData.ai_analysis
            return newData
        })
        console.log(treatedData[0])
        return "treatedData"
    }
}
