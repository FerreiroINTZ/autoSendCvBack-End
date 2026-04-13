import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfosController } from './infos/infos.controller';
import { DatabaseServiceService } from './database-service/database-service.service';
import { DatabaseServiceModule } from './database-service/database-service.module';

@Module({
  imports: [DatabaseServiceModule],
  controllers: [AppController, InfosController],
  providers: [AppService],
})
export class AppModule {}
