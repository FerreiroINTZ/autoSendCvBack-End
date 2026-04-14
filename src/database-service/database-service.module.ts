import "dotenv/config"
import { Module, Global } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"
import {PrismaPg} from "@prisma/adapter-pg"

@Global()
@Module({
    providers: [
        {
            provide: "database",
            useFactory: () =>{
                const adapter = new PrismaPg({
                    connectionString: process.env["DATABASE_URL"]
                })
                const prisma = new PrismaClient({adapter})
                const db = prisma
                return db
            }
        }
    ],
    exports: ["database"]
})
export class DatabaseServiceModule {
}
