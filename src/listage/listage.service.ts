import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"
// import {DatabaseServiceModule} from "../database-service/database-service.module"
import {FilterDTO} from "./listageFilter.dto"

@Injectable()
export class ListageService {
    constructor(@Inject("database") private readonly db: PrismaClient){}

    transformFiltersValuesInPrismaFilters(filters: FilterDTO){
        
    }

    async getVanancies(filters: FilterDTO){
        console.log(filters)
        const dados = await this.db.get_vacancies_vw.findMany({
            orderBy: {
                paridade: filters.ordemParidade
            },
            skip: (filters.page - 1) * 100,
            take: filters.page * -10,
        })
        const data = await this.db.vagas.findMany({
            skip: (filters.page - 1) * 100,
            take: filters.page * -10,
            select: {
                id: true,
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
                last_disp_analysis: true,
                
                keywords: true,
                searchwords: true
            },
            where: {
                ai_analysis: {
                    paridade: {
                        in: filters.paridades
                    }
                },
                plataforma: {
                    in: filters.sites
                },
                disponibilidade: true, // ou so nao existe aqui
                acesso: {
                    in: filters.acesso
                }
                
            },
            
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
        
        // formata o objeto para o client
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
        
        // console.log(slw)
        const orderedData = slw.sort((a, b) => {
            // console.log(filters.ordemParidade)
            if(filters.ordemParidade){
                return b.paridade - a.paridade
            }else{
                return a.paridade - b.paridade
            }
        })
        // console.log(orderedData[0])
        return orderedData 
    }

    async getVancanyCardInfo(id: number){

        const data = await this.db.vagas.findFirst({
            where: {
                id: id
            },
            include: {
                ai_analysis: true,
                descricoes: {
                    select: {
                        descricao: true
                    }
                }
            }
        })

        let {ai_analysis, descricoes, ...rest}: any = data
        const flatteninedData = {...ai_analysis, ...descricoes, ...rest}

        return flatteninedData
    }

    async getVacanciesFilterInfos(){
        const countParidade = await this.db.ai_analysis.groupBy({
            by: ["paridade"],
            _count: {
                _all: true
            }
        })
        const counDisponibilidades = await this.db.vagas.groupBy({
            by: ["disponibilidade"],
            _count: {
                _all: true
            }
        })
        const countSites = await this.db.vagas.groupBy({
            by: ["plataforma"],
            _count: {
                _all: true
            }
        })
        return {countParidade, countSites, counDisponibilidades}
    }
}
