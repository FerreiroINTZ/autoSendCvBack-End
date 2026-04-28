import {
    IsInt,
    IsString,
    IsEnum
} from "class-validator"

import {Type} from "class-transformer"

export enum States {
    salvo = "salvo",
    acessado = "acessado",
    aplicado = "aplicado"
}

type QueryValues = {
    id: number,
    state: States
}

export class QueryDTO implements QueryValues{

    @IsInt({message: "ID precisa ser passado!"})
    @Type(() => Number)
    id!: number

    @IsEnum(States, {message: "STATE precisa estar correto!"})
    state!: States
}