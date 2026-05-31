import {
    IsArray,
    IsString,
    IsOptional,
    IsBoolean,
    IsEnum,
    IsNumber,
} from "class-validator"

import {
    Transform
} from "class-transformer"

enum Paridades
{
    pessimo = "pessimo", 
    ruim = "ruim", 
    bom = "bom", 
    perfeito = "perfeito"
}

enum Sites {
    linkedin = "linkedin",
    indeed = "indeed",
    infojobs = "infojobs",
    catho = "catho"
}

enum Acesso {
    salvo = "salvo",
    acessado = "acessado",
    aplicado = "aplicado"
}

enum OrdemParidade{
    desc = "desc",
    asc = "asc"
}

export class FilterDTO{

    @IsOptional()
    // transforma os valores num array com os numeros das paridades
    @Transform(({value}) => {
        const array = value.split(",")
        const newValues = array.map((x: Paridades) =>{
            // console.log("slw")
            switch(x){
                case "perfeito":
                    return 4
                    case "bom":
                        return 3
                        case "ruim":
                    return 2
                    case "pessimo":
                        return 1
                    }
                })
                // console.log(newValues)
                return newValues
            })
    @IsArray()
    @IsNumber({}, {each: true})
    paridades?: number[]

    @IsArray()
    @IsEnum(Sites, {each: true})
    @IsString({each: true})
    @IsOptional()
    @Transform(({value}) => value.split(","))
    sites?: Sites[]

    @Transform(({value}) => Boolean(value))
    @IsBoolean()
    @IsOptional()
    disponibilidade?: boolean

    @Transform(({value}) => value.split(","))
    @IsEnum(Acesso, {each: true})
    @IsArray()
    @IsString({each: true})
    @IsOptional()
    acesso?: Acesso[]

    @Transform(({value}) => value == "true" ? "desc" : "asc")
    @IsEnum(OrdemParidade)
    @IsOptional()
    ordemParidade?: OrdemParidade = OrdemParidade.desc

    @Transform(({value}) => Number(value))
    @IsNumber()
    page: number = 1
}