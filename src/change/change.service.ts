import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"
import {States} from "./query.dto"

@Injectable()
export class ChangeService {
    
    constructor(@Inject("database") private readonly db: PrismaClient){}

    async changeAcessState(id: number, state: States){
        try{
            console.log(typeof id)
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
            console.log(e)
            return false
        }
    }

    async changeFavorited(id: number){
        const userFavorited: any = await this.db.vagas.findUnique({
            where:{
                id: id
            },
            select: {
                favoritado: true
            }
        })

        const data = await this.db.vagas.update({
            where: {
                id
            },
            data: {
                favoritado: !userFavorited.favoritado
            },
            select: {
                favoritado: true
            }
        })

        return data
    }

    async changeDisponibilidade(id: number){
        const userDisponibilidade: any = await this.db.vagas.findUnique({
            where:{
                id: id
            },
            select: {
                disponibilidade: true
            }
        })

        const data = await this.db.vagas.update({
            where: {
                id
            },
            data: {
                disponibilidade: !userDisponibilidade.disponibilidade
            },
            select: {
                disponibilidade: true
            }
        })

        return data
    }
}