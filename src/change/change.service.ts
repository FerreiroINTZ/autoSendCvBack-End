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

    // busca o registro, depois altera ele
    async changeFavorited(id: string){
        const userFavorited: any = await this.db.vagas.findFirst({
            where:{
                jobid: id
            },
            select: {
                id: true,
                favoritado: true
            }
        })

        const data = await this.db.vagas.update({
            where: {
                id: userFavorited.id
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

    // busca o registro, depois altera ele
    async changeDisponibilidade(id: string){
        const userDisponibilidade: any = await this.db.vagas.findFirst({
            where:{
                jobid: id
            },
            select: {
                id: true,
                disponibilidade: true
            }
        })

        const data = await this.db.vagas.update({
            where: {
                id: userDisponibilidade.id
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

    // busca o registro, depois altera ele
    async deleteVacancy(id: string){
        console.log(id)
        const vacancyId: any = await this.db.vagas.findFirst({
            where:{
                jobid: id
            },
            select: {
                id: true,
            }
        })

        const data = await this.db.vagas.update({
            where: {
                id: vacancyId.id
            },
            data: {
                desconsiderar: true
            },
            select: {
                desconsiderar: true
            }
        })

        return data
    }
}
