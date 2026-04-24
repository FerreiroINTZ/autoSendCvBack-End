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
                        id: true,
                        paridade: true,
                        
                        matches: true,
                        summary: true,
                        weaknesses: true,
                    }
                },
                plataforma: true,
                dt_publicacao: true,
                acesso: true,
                disponibilidade: true,
                
                keywords: true,
                searchwords: true
            },
            // orderBy: {ai_analysis:{
            //     paridade: {
            //         sort: "desc"
            //     }
            // }}
        })

        const treatedData = data.map(x =>{
            let newData = x as any

            // se nao tiver paridade ele seta para zero
            if(x.ai_analysis?.paridade){
	    	    newData = {...newData, paridade: x.ai_analysis.paridade}
            }else{
                newData = {...newData, paridade: 0}
	        }
            // se nao tiver salario seta um valor
            if(x.salario){
                newData = {...newData, salario: "nao expecificado"}
            }
            
            // formata a hora
            const date = new Date(newData.dt_publicacao as Date)
            const dateFormated = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            
            newData = {...newData, dt_publicacao: dateFormated}
            return newData
        })
        
        const slw: any[] = treatedData.map((x: any) =>{
            const newObj = {
                ...x,
                expanded: {
                    matches: x.ai_analysis?.matches,
                    summary: x.ai_analysis?.summary,
                    weaknesses: x.ai_analysis?.weaknesses,
                    keywords: x.keywords,
                    searchwords: x.searchwords
                }
            }
            if(newObj.keywords){
                delete newObj.keywords
            }
            if(newObj.searchwords){
                delete newObj.searchwords
            }
            delete newObj.ai_analysis
            return newObj
        })
        
        console.log(slw)
        const orderedData = slw.sort((a, b) => b.paridade - a.paridade)
        // console.log(orderedData[0])
        return orderedData 
    }
}
