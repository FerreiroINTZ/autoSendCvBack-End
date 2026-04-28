import {
    IsInt,
    IsString,
    IsEnum
} from "class-validator"

import {Type, Transform} from "class-transformer"

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

    @IsInt({message: "ID precisa ser valido!"})
    @Type(() => Number)
    id!: number
    
    @IsEnum(States)
    state!: States
}
