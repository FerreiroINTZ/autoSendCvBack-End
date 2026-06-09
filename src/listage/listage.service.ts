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
            orderBy: [
                {paridade: "desc"},
                {id: "desc"},
            ],
            where: {
                paridade: {
                    in: filters.paridades
                },
                plataforma: {
                    in: filters.sites
                },
                disponibilidade: true, // ou so nao existe aqui
                acesso: {
                    in: filters.acesso
                },
                // desco
                
            },
            skip: (filters.page - 1) * 100,
            take: filters.page * 100,
        })
        console.log("paridadde")
        console.log(dados[0].paridade)

        const separatedData: any[] = dados.map((x: any) =>{
            const newObj = {
                ...x,
                expanded: {
                    matches: x.matches,
                    summary: x.summary,
                    weaknesses: x.weaknesses,
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
        return separatedData
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

        console.log(data)
        console.log("data")
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
