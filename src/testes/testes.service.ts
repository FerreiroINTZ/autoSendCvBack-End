import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"

@Injectable()
export class TestesService {

    constructor(@Inject("database") private readonly db: PrismaClient){}

    async rpz(){
        // const view = await this.db.get_vacancies_vw.findMany()
        const view: any = await this.db.get_vacancies_vw.findMany({
            orderBy: {
                paridade: "desc"
            },
            take: 100
        })
        return view
    }
}
