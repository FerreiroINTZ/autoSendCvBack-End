import "dotenv/config";
import { Injectable, OnModuleInit } from '@nestjs/common';
import {PrismaPg} from "@prisma/adapter-pg"
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class DatabaseServiceService 
implements OnModuleInit
{
    db!: PrismaClient

    onModuleInit(){
        const adapter = new PrismaPg({
            connectionString: process.env["DATABASE_URL"]
        })
        const prisma = new PrismaClient({adapter})
        this.db = prisma
    }

    slw(){
        console.log("slw")
    }

    async getData(){
        const data = await this.db.vagas.findMany({})
        return data
    }
}
