import { Module } from '@nestjs/common';
import {ListageController} from "./listage.controller"
import {ListageService} from './listage.service'

@Module({
    providers: [ListageService],
    controllers: [ListageController]
})
export class ListageModule {}
