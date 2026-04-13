import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {DatabaseServiceService} from "./database-service/database-service.service"

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly slw: DatabaseServiceService
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const data = await this.slw.getData()
    console.log(data)
    return this.appService.getHello();
  }
}
