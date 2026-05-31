import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosController } from './infos/infos.controller';
import { DatabaseServiceModule } from './database-service/database-service.module';
import { InfosModule } from './infos/infos.module';
import { ListageController } from './listage/listage.controller';
import { ListageService } from './listage/listage.service';
import { ListageModule } from './listage/listage.module';
import { ChangeController } from './change/change.controller';
import { ChangeService } from './change/change.service';
import { TestesController } from './testes/testes.controller';
import { TestesService } from './testes/testes.service';

@Module({
  imports: [DatabaseServiceModule, InfosModule, ListageModule],
  controllers: [AppController, ChangeController, TestesController],
  providers: [AppService, ChangeService, TestesService],
})
export class AppModule {}
