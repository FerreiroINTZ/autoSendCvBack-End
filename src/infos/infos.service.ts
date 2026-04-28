import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"

@Injectable()
export class InfosService {

    constructor(@Inject("database") private readonly db: PrismaClient){}

    async sumParidades(){
        const data = await this.db.ai_analysis.groupBy({
            by: ["paridade"],
            _count: {
                _all: true
            }
        })
        
        // console.log(data)

        const paridades = ["pessimos", "ruins", "bons", "perfeitos", "outros"]
        let formatedData = data.map((x, index) =>{
            let newData = {
                // quantidade
                vall: x._count._all,
                // nome da paridade
                index: x.paridade ? paridades[x.paridade - 1] : paridades[4],
                // indice, efetivamente
                i: x.paridade ? x.paridade : 0
            }
            return newData
        }).filter(x => x.index)
        // console.log(formatedData)
        
        for(let i in paridades){
            let qtd = 0
            formatedData.forEach(x =>{
                // verifica se ja existe
                // se ja tiver pelo menos uma ocorrencia ele soma
                if(x.index == paridades[i]){
                    // console.log("igual")
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
        console.log(formatedData)
        return formatedData
    }
}
