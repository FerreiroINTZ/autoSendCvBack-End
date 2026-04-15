import { Module } from '@nestjs/common';
import {DatabaseServiceModule} from "../database-service/database-service.module"
import { InfosService } from './infos.service';
import {InfosController} from "./infos.controller"
import {AppModule} from "../app.module"

@Module({
    providers: [InfosService],
    controllers: [InfosController]
})
export class InfosModule {}
