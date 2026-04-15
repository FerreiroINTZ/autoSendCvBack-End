import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"

@Injectable()
export class InfosService {

    constructor(@Inject("database") private readonly db: PrismaClient){}

    async sumParidades(){
        const data = await this.db.vagas.groupBy({
            by: ["paridade"],
            _count:{
                paridade: true
            }
        })
        const paridades = ["pessimos", "ruins", "bons", "perfeitos"]
        let formatedData = data.map((x, index) =>{
            let newData = {
                vall: x._count.paridade,
                index: x.paridade && paridades[x.paridade - 1],
                i: x.paridade
            }
            return newData
        }).filter(x => x.index)
        for(let i in paridades){
            let qtd = 0
            formatedData.forEach(x =>{
                // verifica se ja existe
                // se ja tiver pelo menos uma ocorrencia ele soma
                if(x.index == paridades[i]){
                    console.log("igual")
                    qtd++
                }
            })
            // caso nao tenha tido nenhuma ocorrencia ele para.
            if(qtd == 0){
                console.log("i:", i)
                formatedData.push({vall: 0, index: paridades[i], i: Number(i) + 1})
            }
        }
        const total = formatedData.reduce((prev,currVall) =>{
            return currVall.vall + prev
        }, 0)
        formatedData.push({vall: total, index: "total", i: 5})
        // ordena em orde descrescente
        formatedData = formatedData.sort((x, b) =>{
            return x.i! - b.i!!
        })
        return formatedData
    }
}
