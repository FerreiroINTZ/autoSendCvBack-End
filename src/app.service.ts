import { Injectable, Inject } from '@nestjs/common';
import {PrismaClient} from "@PrismaClient"

@Injectable()
export class AppService {
  
  constructor(@Inject("database") private readonly db: PrismaClient){}

  getHello(): string {
    return 'Hello World!';
  }

  async slw(){
      const data = await this.db.vagas.findMany({})
      return data
  }
}
