import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    console.log("nada")
    console.log(await this.appService.slw())
    return this.appService.getHello();
  }
}
