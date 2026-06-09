import { Controller, Get, Query } from '@nestjs/common';
import {ListageService} from "./listage.service"
import {FilterDTO} from "./listageFilter.dto"

@Controller('listage')
export class ListageController {

    constructor(private readonly listageService: ListageService){}

    @Get()
    async getVacanciesRoute(@Query() query: FilterDTO){
        const data: any = await this.listageService.getVanancies(query)
        // console.log(data[0])
        // console.log("data")
        // console.log(query)
        return data
    }

    @Get("getVancanyCardInfo")
    // se id for invalido, falha
    // se nao retornar nenhuma vaga, "falha"
    // se retornar uma vaga, retorna um objeto
    async getVancanyCardInfo(@Query() query: {id: number}){

        if(Number.isNaN(Number(query.id)) || query.id === undefined){
            console.log("Parametro invalido!!")
            return "id nao e um valor valido"
        }

        const vanacnyData = await this.listageService.getVancanyCardInfo(Number(query.id))

        if(vanacnyData == null){
            console.log("nulo!")
            return "vaga nao existe!"
        }
        console.log(vanacnyData)
        // console.log(Object.keys(vanacnyData))

        return vanacnyData
    }

    @Get("getFilterInfos")
    async getVacanciesFilterInfos(){
        // console.log('slw')
        const data = await this.listageService.getVacanciesFilterInfos()
        console.log(data.countSites)
        return data
    }
}
